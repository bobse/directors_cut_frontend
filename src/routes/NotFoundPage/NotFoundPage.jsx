import React from 'react';
import { Center, Heading, Text, VStack, Image } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { ButtonStd } from '../../components/ButtonStd/ButtonStd';
import SmallLogo from '../../assets/small_logo.png';

export const NotFoundPage = props => {
  return (
    <Center h={'full'} w={'full'}>
      <VStack>
        <Image
          maxH={'100px'}
          objectFit="contain"
          src={SmallLogo}
          alt="Directors Cut Logo"
          mb={4}
        />
        <Heading>Oops!</Heading>
        <Text>Sorry, could not find this page!</Text>
        <ButtonStd as={RouterLink} to="/" label="Take me to the homepage" />
      </VStack>
    </Center>
  );
};
