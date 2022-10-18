import { React } from 'react';
import { Button } from '@chakra-ui/react';

export const ButtonStd = props => {
  return (
    <Button
      borderRadius={2}
      _hover={{ bg: 'black', color: 'yellow.400' }}
      {...props}
    >
      {props.label}
    </Button>
  );
};
