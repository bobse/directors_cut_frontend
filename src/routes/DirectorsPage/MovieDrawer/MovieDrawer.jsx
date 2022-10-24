import { React } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  VStack,
  Box,
  Image,
  Badge,
  Center,
  HStack,
} from '@chakra-ui/react';

export const MovieDrawer = props => {
  const RenderBadgeIfExists = (value, variant, text) => {
    if (value !== undefined && value !== null) {
      return <Badge variant={variant}>{text ? text : value}</Badge>;
    }
  };
  return (
    <Drawer
      isOpen={props.movieDetailDrawer}
      placement={'right'}
      onClose={() => {
        props.setMovieDetailDrawer();
      }}
      size={'md'}
      id="movieDrawer"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton _focusVisible={false} />
        <DrawerHeader px={8}>
          {props.movieDetailDrawer?.name}
          <Box fontSize={'xs'}>{props.movieDetailDrawer?.genre}</Box>
          <HStack alignItems={'flex-start'} spacing={1} py={1}>
            {RenderBadgeIfExists(
              props.movieDetailDrawer?.is_available_now,
              'available',
              'Available'
            )}
            {RenderBadgeIfExists(props.movieDetailDrawer?.release_date)}
            {RenderBadgeIfExists(props.movieDetailDrawer?.type)}
            {RenderBadgeIfExists(props.movieDetailDrawer?.user_choice, 'gray')}
          </HStack>
        </DrawerHeader>
        <DrawerBody>
          {props.movieDetailDrawer?.poster_url && (
            <Center py={8}>
              <Image
                maxW={['60%', '50%']}
                src={
                  'https://image.tmdb.org/t/p/w300_and_h450_bestv2' +
                  props.movieDetailDrawer?.poster_url
                }
              />
            </Center>
          )}
          <VStack alignItems={'flex-start'} spacing={0}>
            <Box>{props.movieDetailDrawer?.sinopsis}</Box>
          </VStack>
        </DrawerBody>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
