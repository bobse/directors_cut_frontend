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
import { ButtonStd } from '../../ButtonStd/ButtonStd';

export const DirectorFilter = props => {
  return (
    <Drawer
      isOpen={props.filterDrawerisOpen}
      placement="right"
      onClose={() => props.setfilterDrawer(false)}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Filter your directors</DrawerHeader>
        <DrawerBody>
          <VStack align={'left'}>
            <ButtonStd label="Only directors with projects" />
            <ButtonStd label="Movies already available" variant={'off'} />
            <ButtonStd label="Only my wishlist" variant={'off'} />
            <ButtonStd label="Hide watched movies" variant={'off'} />
            <ButtonStd label="Hide ignored movies" variant={'off'} />
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <Button>Clear all filters</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
