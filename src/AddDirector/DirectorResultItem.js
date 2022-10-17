import { React } from 'react';
import { Box, HStack, Square, Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

export const DirectorResultItem = props => {
  return (
    <HStack borderBottom={'1px'} borderBottomStyle={'dotted'} w={'full'} p={2}>
      <Button size={'30px'} p={3} bg={'yellow.400'}>
        <AddIcon />
      </Button>
      <Box>{props.director.name}</Box>
    </HStack>
  );
};
