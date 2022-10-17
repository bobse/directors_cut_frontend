import { DirectorCard } from './DirectorCard';
import React from 'react';
import { Box, VStack, SimpleGrid } from '@chakra-ui/react';
import { Header } from '../Header/Header';

export const DirectorsList = props => {
  return (
    <VStack spacing={4}>
      <Header />
      <Box flexGrow="1" w="full">
        <SimpleGrid columns={[1, 2, 3, 4]} spacing="40px">
          <DirectorCard />
          <DirectorCard />
          <DirectorCard />
          <DirectorCard />
          <DirectorCard />
          <DirectorCard />
          <DirectorCard />
          <DirectorCard />
          <DirectorCard />
          <DirectorCard />
        </SimpleGrid>
      </Box>
    </VStack>
  );
};
