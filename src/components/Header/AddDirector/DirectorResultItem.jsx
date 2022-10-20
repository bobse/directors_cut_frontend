import { React } from 'react';
import { Box, HStack } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { ButtonStd } from '../../ButtonStd/ButtonStd';

export const DirectorResultItem = props => {
  return (
    <HStack borderBottom={'1px'} borderBottomStyle={'dotted'} w={'full'} p={2}>
      <ButtonStd label={<AddIcon />} size={'30px'} p={3} />
      <Box>{props.director.name}</Box>
    </HStack>
  );
};
