import { React, useState } from 'react';
import { Badge, Box, HStack } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { ButtonStd } from '../../ButtonStd/ButtonStd';

export const DirectorResultItem = props => {
  const [isAdding, setIsAdding] = useState(false);
  const [clickedOnce, setClickedOnce] = useState(false);

  async function add(director) {
    setIsAdding(true);
    try {
      await props.addDirector(director);
      setClickedOnce(true);
      setIsAdding(false);
    } catch (error) {
      setIsAdding(false);
      console.log(props);
    }
  }

  return (
    <HStack borderBottom={'1px'} borderBottomStyle={'dotted'} w={'full'} p={2}>
      <ButtonStd
        isLoading={isAdding}
        isDisabled={props.director?.in_user_list || clickedOnce}
        label={<AddIcon />}
        size={'30px'}
        p={3}
        onClick={() => {
          if (!props.director?.in_user_list && !clickedOnce) {
            add(props.director);
          }
        }}
      />
      <Box>{props.director.name}</Box>
      {(props.director?.in_user_list || clickedOnce) && (
        <Badge size={'xs'}>In your list</Badge>
      )}
    </HStack>
  );
};
