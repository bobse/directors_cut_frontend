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
            <Button _hover={{ bg: 'black', color: 'yellow.400' }}>
              Only directors with projects
            </Button>
            <Button variant={'outline'}>From my wishlist</Button>
            <Button variant={'outline'}>Already available</Button>
            <Button variant={'outline'}>Hide Ignored</Button>
            <Button>Hide ignored</Button>
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <Button>Clear all filters</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
