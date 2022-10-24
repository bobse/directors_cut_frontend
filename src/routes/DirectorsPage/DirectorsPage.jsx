import { React, useEffect, useState } from 'react';
import { DirectorCard, DirectorName } from './DirectorCard';
import { MovieItem, MovieIcons, MovieTags } from './MovieItem';
import { MovieDrawer } from './MovieDrawer/MovieDrawer';
import {
  Box,
  VStack,
  SimpleGrid,
  Spinner,
  Center,
  useToast,
  Link,
  Flex,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { Header } from './Header/Header';
import api from '../../services/api';
import auth from '../../services/auth';
import * as constants from '../../constants';
import { useNavigate } from 'react-router-dom';
import { directorFilter } from './Filters/filterFunctions';
import DirectorFilterCount from './DirectorFilterCount';
import { DeleteModal } from './DeleteModal';

export const DirectorsPage = props => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [myDirectors, setMyDirectors] = useState([]);
  const [filters, setFilters] = useState(
    directorFilter.generateFilterInitialStates()
  );
  const [movieDetailDrawer, setMovieDetailDrawer] = useState();
  const [deleteModal, setDeleteModal] = useState();
  const [forceRefresh, setForceRefresh] = useState(false);

  const toast = useToast();

  useEffect(() => {
    async function getDirectors() {
      try {
        const response = await api.get(constants.APIDIRECTOR);
        setMyDirectors(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        auth.removeToken();
        navigate('/login');
      }
    }
    getDirectors();
  }, [navigate, forceRefresh]);

  async function deleteDirectorMethod() {
    const id = myDirectors[deleteModal].id;
    const directorIndex = deleteModal;
    // const directorIndex = myNewDirectors.findIndex(object => {
    //   return object.id === id;
    // });
    await api
      .delete(constants.APIDIRECTOR + id + '/')
      .then(response => {
        let myNewDirectors = JSON.parse(JSON.stringify(myDirectors));
        toast({
          title: 'Deleted!',
          description:
            myDirectors[directorIndex].name + ' removed from your list!',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
        myNewDirectors.splice(directorIndex, 1);
        setMyDirectors(myNewDirectors);
      })
      .catch(error => {
        toast({
          title: 'Sorry!',
          description: 'Could not delete the director. Please try again!',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
      });
  }

  function reorderDirectors(directorList) {
    directorList.sort((a, b) => {
      if (a.name.toUpperCase() < b.name.toUpperCase()) return -1;
      if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
      return 0;
    });
    return directorList;
  }

  async function addDirector(director) {
    try {
      const response = await api.post(
        constants.APIDIRECTOR + director.id + '/'
      );
      let currDirector = response.data;
      currDirector['in_user_list'] = true;
      let newDirectors = JSON.parse(JSON.stringify(myDirectors));
      newDirectors.push(currDirector);
      setMyDirectors(reorderDirectors(newDirectors));
      toast({
        title: 'Director added!',
        description: response.data.name + ' added from your list!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      toast({
        title: 'Sorry!',
        description:
          'Could not add ' + director.name + ' to your list. Please try again!',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      throw error;
    }
  }

  function clearFilters() {
    let filtersCopy = JSON.parse(JSON.stringify(filters));
    for (let key in filtersCopy) {
      filtersCopy[key] = false;
    }
    setFilters(filtersCopy);
  }

  async function updateMyDirectorsUserChoice(movieId, choice) {
    let newDirectors = JSON.parse(JSON.stringify(myDirectors));
    newDirectors.forEach(director => {
      const movieIdx = director.movies.findIndex(item => {
        return item.id === movieId;
      });
      if (movieIdx >= 0) {
        if (director.movies[movieIdx].user_choice === choice) {
          director.movies[movieIdx].user_choice = null;
        } else {
          director.movies[movieIdx].user_choice = choice;
        }
      }
    });
    await api.post(
      constants.APIMOVIE_WISH_WATCH + movieId + '/' + choice + '/'
    );
    setMyDirectors(newDirectors);
  }

  const filteredDirectors = directorFilter.filter(filters, myDirectors);
  return (
    <Box flexGrow={1} w={'full'}>
      <DeleteModal
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        deleteDirectorMethod={deleteDirectorMethod}
        director={deleteModal !== undefined ? myDirectors[deleteModal] : null}
      />
      <MovieDrawer
        movieDetailDrawer={movieDetailDrawer}
        setMovieDetailDrawer={setMovieDetailDrawer}
      />
      <VStack spacing={4}>
        <Header
          myDirectors={myDirectors}
          addDirector={addDirector}
          clearFilters={clearFilters}
          setFilters={setFilters}
          filters={filters}
          setForceRefresh={setForceRefresh}
          forceRefresh={forceRefresh}
        />
        <Box flexGrow="1" w="full">
          {isLoading && (
            <Center>
              <Spinner
                thickness="5px"
                speed="0.85s"
                emptyColor="gray.200"
                color="yellow.400"
                size="xl"
              />
            </Center>
          )}

          {!isLoading && (
            <DirectorFilterCount
              directorCount={myDirectors ? myDirectors.length : 0}
              filteredCount={
                myDirectors.filter(director => {
                  return director.hide !== undefined && !director.hide;
                }).length
              }
              clearFilters={clearFilters}
            />
          )}
          <SimpleGrid columns={[1, 2, 5]} spacing="40px" minChildWidth="300px">
            {filteredDirectors.map((director, directorIdx) => {
              if (director.hide) return null;
              return (
                <DirectorCard key={director.id}>
                  <DirectorName
                    directorInfo={director}
                    directorIdx={directorIdx}
                    setDeleteModal={setDeleteModal}
                    movieCount={director.movies.length}
                  >
                    {director.name}
                  </DirectorName>
                  {director.movies.map((movie, movieIdx) => {
                    if (movie.hide) return null;
                    return (
                      <MovieItem key={movie.id}>
                        <MovieTags movieInfo={movie} />
                        <Flex>
                          <Link
                            onClick={() => {
                              setMovieDetailDrawer(movie);
                            }}
                          >
                            <Text noOfLines={2}>{movie.name}</Text>
                          </Link>
                          <Spacer />
                          <MovieIcons
                            updateMyDirectorsUserChoice={
                              updateMyDirectorsUserChoice
                            }
                            movieInfo={movie}
                          />
                        </Flex>
                      </MovieItem>
                    );
                  })}
                  {director.movies.length === 0 && (
                    <MovieItem>No current projects</MovieItem>
                  )}
                  {director.movies.length !== 0 &&
                    director.movies.length ===
                      director.movies.filter(movie => movie.hide).length && (
                      <MovieItem>Clear filters to view the projects</MovieItem>
                    )}
                </DirectorCard>
              );
            })}
          </SimpleGrid>
        </Box>
      </VStack>
    </Box>
  );
};
