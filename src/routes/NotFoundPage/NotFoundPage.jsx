import React from 'react';
import { Center, Heading, Text, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { ButtonStd } from '../../components/ButtonStd/ButtonStd';

export const NotFoundPage = props => {
  return (
    <Center h={'full'} w={'full'}>
      <VStack>
        <Heading>Oops!</Heading>
        <Text>Sorry, could not find this page!</Text>
        <ButtonStd as={RouterLink} to="/" label="Take me to the homepage" />
      </VStack>
    </Center>
  );
};
