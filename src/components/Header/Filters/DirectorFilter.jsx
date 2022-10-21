import { React, useEffect } from 'react';
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
  useEffect(() => {
    localStorage.setItem('filters', JSON.stringify(props.filters));
  }, [props.filters]);

  return (
    <Drawer
      isOpen={props.filterDrawerisOpen}
      placement="right"
      onClose={() => props.setfilterDrawer(false)}
      size={'md'}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Filter your directors</DrawerHeader>
        <DrawerBody>
          <VStack align={'left'}>
            {props.filters &&
              Object.keys(filtersConstant).map((filterkey, idx) => {
                return (
                  <ButtonStd
                    key={idx}
                    label={filtersConstant[filterkey].label}
                    variant={props.filters[filterkey] ? 'solid' : 'off'}
                    onClick={() => {
                      let newFilters = JSON.parse(
                        JSON.stringify(props.filters)
                      );
                      newFilters[filterkey] = !newFilters[filterkey];
                      props.setFilters(newFilters);
                      props.setfilterDrawer(false);
                    }}
                  />
                );
              })}
          </VStack>
        </DrawerBody>
        <DrawerFooter>
          <Button
            onClick={() => {
              props.clearFilters();
              props.setfilterDrawer(false);
            }}
          >
            Clear all filters
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
