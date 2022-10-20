import { React, useEffect, useState } from 'react';
import { DirectorCard } from './DirectorCard';
import {
  Box,
  VStack,
  SimpleGrid,
  Spinner,
  Center,
  useToast,
} from '@chakra-ui/react';
import { Header } from '../../components/Header/Header';
import { DeleteModal } from './DeleteModal';
import { MovieInfo } from './MovieInfo/MovieInfo';
import api from '../../services/api';
import auth from '../../services/auth';
import * as constants from '../../constants';
import { useNavigate } from 'react-router-dom';

export const DirectorsPage = props => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [myDirectors, setMyDirectors] = useState();
  const toast = useToast();
  useEffect(() => {
    async function getDirectors() {
      try {
        const response = await api.get(constants.APIDIRECTOR);
        setMyDirectors(response.data);
        setIsLoading(false);
      } catch (error) {
        if (error.response) {
          setIsLoading(false);
          if (error.response.status === 401) {
            auth.removeToken();
            navigate('/login');
          }
        }
      }
    }
    getDirectors();
  }, [navigate]);

  // DeleteDirector
  const [deleteDirectorId, setDeleteDirectorId] = useState({
    id: undefined,
    name: undefined,
  });

  async function deleteDirectorMethod(id) {
    let myNewDirectors = JSON.parse(JSON.stringify(myDirectors));
    const directorIndex = myNewDirectors.findIndex(object => {
      return object.id === id;
    });
    await api
      .delete(constants.APIDIRECTOR + id + '/')
      .then(response => {
        toast({
          title: 'Deleted!',
          description:
            myDirectors[directorIndex].name + ' removed from your list!',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        myNewDirectors.splice(directorIndex, 1);
        setMyDirectors(myNewDirectors);
      })
      .catch(error => {
        toast({
          title: 'Sorry!',
          description: 'Could not delete the director. Please try again!',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      });
  }

  const closeModal = () => {
    setDeleteDirectorId({ id: undefined, name: undefined });
  };
  // EndDeleteDirector

  // MovieInfoDrawer
  const [movieDetail, setMovieDetail] = useState();
  // EndMovieInfoDrawer

  return (
    <Box flexGrow={1} w={'full'}>
      <DeleteModal
        deleteDirectorId={deleteDirectorId}
        closeModal={closeModal}
        deleteDirectorMethod={deleteDirectorMethod}
      />
      <MovieInfo movieDetail={movieDetail} setMovieDetail={setMovieDetail} />
      <VStack spacing={4}>
        <Header />
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
          <SimpleGrid columns={[1, 2, 3, 4]} spacing="40px">
            {myDirectors?.map(director => {
              return (
                <DirectorCard
                  key={director.id}
                  setDeleteDirectorId={setDeleteDirectorId}
                  setMovieDetail={setMovieDetail}
                  directorInfo={director}
                />
              );
            })}
          </SimpleGrid>
        </Box>
      </VStack>
    </Box>
  );
};
