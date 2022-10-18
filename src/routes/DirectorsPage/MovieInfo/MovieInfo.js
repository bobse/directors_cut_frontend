import { React } from 'react';
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  VStack,
} from '@chakra-ui/react';
import { getKeyIfExists } from '../../../helperFunctions/getKeyIfExists';

export const MovieInfo = props => {
  return (
    <Drawer
      isOpen={props.movieDetail !== undefined}
      placement="right"
      onClose={() => props.setMovieDetail()}
      size={'md'}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          {props.movieDetail !== undefined ? props.movieDetail.name : ''}
        </DrawerHeader>
        <DrawerBody>{getKeyIfExists(props.movieDetail, 'synopsis')}</DrawerBody>

        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
