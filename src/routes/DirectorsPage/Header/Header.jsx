import React from 'react';
import { Flex, Center, VStack } from '@chakra-ui/react';
import { Logo } from './Logo';
export const Header = props => {
  return (
    <Flex w="100%" p={0}>
      <Center flex={1} justifyContent={'left'}>
        <Logo />
      </Center>
      <VStack alignItems={'flex-end'}>{props.children}</VStack>
    </Flex>
  );
};
