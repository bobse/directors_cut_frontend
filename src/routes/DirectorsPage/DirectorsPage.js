import { React, useEffect, useState } from 'react';
import { DirectorCard } from './DirectorCard';
import { Box, VStack, SimpleGrid } from '@chakra-ui/react';
import { Header } from '../../components/Header/Header';
import { DeleteModal } from './DeleteModal';
import { MovieInfo } from './MovieInfo/MovieInfo';
import { Footer } from '../../components/Footer/Footer';

export const DirectorsPage = props => {
  useEffect(() => {
    console.log('Loading directors here');
  }, []);

  // DeleteDirector
  const [deleteDirectorId, setDeleteDirectorId] = useState({
    id: undefined,
    name: undefined,
  });
  const deleteDirectorMethod = async id => {
    console.log('Deleting director: ' + id);
    return await new Promise(resolve => setTimeout(resolve, 3000));
  };
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
          <SimpleGrid columns={[1, 2, 3, 4]} spacing="40px">
            <DirectorCard
              key={1}
              setDeleteDirectorId={setDeleteDirectorId}
              setMovieDetail={setMovieDetail}
              directorInfo={{
                id: 1,
                name: 'Spike',
                movies: [
                  { id: 1, name: 'Movie1' },
                  { id: 2, name: 'Movie2', synopsis: 'testing texto' },
                ],
              }}
            />
          </SimpleGrid>
        </Box>
      </VStack>
    </Box>
  );
};
