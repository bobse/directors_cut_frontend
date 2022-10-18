import React from 'react';
import { Box, Center, HStack, Link, Spacer, Divider } from '@chakra-ui/react';

export const Footer = props => {
  return (
    <Box alignSelf={'flex-end'} color={'gray.500'} w="full" mt={16}>
      <Divider />
      <Center h={8} fontSize={'0.7rem'}>
        <HStack w={'full'} p={4} spacing={4}>
          <Link>About</Link>
          <Link>Contact me</Link>
          <Spacer />
          <Box maxW={'30%'}>Created and maintained by Roberto Seba</Box>
        </HStack>
      </Center>
    </Box>
  );
};
