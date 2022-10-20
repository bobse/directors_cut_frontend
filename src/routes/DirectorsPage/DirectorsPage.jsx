import { React, useEffect, useState } from 'react';
import { DirectorCard } from './DirectorCard';
import {
  Box,
  VStack,
  SimpleGrid,
  Spinner,
  Center,
  useToast,
  Link,
} from '@chakra-ui/react';
import { Header } from '../../components/Header/Header';
import api from '../../services/api';
import auth from '../../services/auth';
import * as constants from '../../constants';
import { useNavigate } from 'react-router-dom';
import filterMyDirectors, {
  generateFilterStates,
} from '../../components/Header/Filters/filterHelper';

export const DirectorsPage = props => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [myDirectors, setMyDirectors] = useState([]);
  const [filters, setFilters] = useState(generateFilterStates());
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
  }, [navigate]);

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

  const filteredDirectors = filterMyDirectors(filters, myDirectors);

  return (
    <Box flexGrow={1} w={'full'}>
      <VStack spacing={4}>
        <Header
          myDirectors={myDirectors}
          addDirector={addDirector}
          clearFilters={clearFilters}
          setFilters={setFilters}
          filters={filters}
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
          {myDirectors.length > 0 && (
            <Box fontSize={'sm'} mb={4} textAlign={'right'}>
              Showing {filteredDirectors.length} of {myDirectors?.length}{' '}
              directors
              {filteredDirectors.length !== myDirectors.length && (
                <Link px={2} onClick={clearFilters}>
                  ( Clear filters )
                </Link>
              )}
            </Box>
          )}
          <SimpleGrid columns={[1, 2, 3, 4]} spacing="40px">
            {myDirectors.length > 0 &&
              filteredDirectors.map(director => {
                return (
                  <DirectorCard
                    key={director.id}
                    deleteDirectorMethod={deleteDirectorMethod}
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
