import React from 'react';
import { Box, Center, HStack, Link, Spacer, Divider } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../components/ColorModeSwitcher/ColorModeSwitcher';
import { Link as RouterLink } from 'react-router-dom';
export const Footer = props => {
  return (
    <Box alignSelf={'flex-end'} color={'gray.500'} w="full" mt={16}>
      <Divider />

      <Center h={[24, 8]} fontSize={'0.7rem'} pt={4}>
        <HStack w={'full'} p={4} spacing={4}>
          <ColorModeSwitcher
            fontSize="md"
            _hover={{ transform: 'scale(1.2)', color: 'yellow.600' }}
            alignSelf={'flex-end'}
          />
          <RouterLink to="/about">About</RouterLink>
          <Link href="mailto:roberto@robertoseba.com">Contact me</Link>
          <Spacer />
          <Box maxW={'30%'}>Created and maintained by Roberto Seba</Box>
        </HStack>
      </Center>
    </Box>
  );
};
