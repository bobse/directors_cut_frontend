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
import { filtersConstant } from './filterHelper';

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
            {props.filters &&
              Object.keys(filtersConstant).map(filterkey => {
                return (
                  <ButtonStd
                    key={filterkey}
                    label={filtersConstant[filterkey].label}
                    variant={props.filters[filterkey] ? 'solid' : 'off'}
                    onClick={() => {
                      let newFilters = JSON.parse(
                        JSON.stringify(props.filters)
                      );
                      newFilters[filterkey] = !newFilters[filterkey];
                      props.setFilters(newFilters);
                    }}
                  />
                );
              })}
          </VStack>
        </DrawerBody>
        <DrawerFooter>
          <Button>Clear all filters</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
