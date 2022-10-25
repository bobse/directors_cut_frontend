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
  Box,
} from '@chakra-ui/react';
import { ButtonStd } from '../../../components/ButtonStd/ButtonStd';
import { directorFilter } from './filterFunctions';

export const FiltersDrawer = props => {
  useEffect(() => {
    if (props.filters) {
      localStorage.setItem('filters', JSON.stringify(props.filters));
    }
  }, [props.filters]);

  return (
    <Drawer
      isOpen={props.filterDrawerisOpen}
      placement="right"
      onClose={() => props.setfilterDrawer(false)}
      size={['xs', 'md']}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Box
            w={'85%'}
            mt={4}
            textStyle="h2"
            fontWeight={'normal'}
            fontSize={'2rem'}
          >
            Filter your directors
          </Box>
        </DrawerHeader>
        <DrawerBody>
          <VStack align={'left'}>
            {props.filters &&
              Object.keys(directorFilter.filterList).map((filterkey, idx) => {
                return (
                  <ButtonStd
                    key={idx}
                    label={directorFilter.filterList[filterkey].label}
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
