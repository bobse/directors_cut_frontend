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
  HStack,
  Badge,
} from '@chakra-ui/react';

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
          {props.movieDetail?.name}
          <Box fontSize={'xs'}>{props.movieDetail?.genre}</Box>
        </DrawerHeader>
        <DrawerBody>
          <HStack alignItems={'flex-start'}>
            {props.movieDetail?.poster_url && (
              <Image
                maxW={'150px'}
                src={
                  'https://image.tmdb.org/t/p/w300_and_h450_bestv2' +
                  props.movieDetail?.poster_url
                }
              />
            )}
            <VStack alignItems={'flex-start'} spacing={0}>
              <Box>
                {props.movieDetail?.is_available_now && (
                  <Badge
                    fontSize={{ base: '0.6rem' }}
                    fontWeight={'normal'}
                    mt={-4}
                    ml={-1}
                    mr={2}
                    px="1.5"
                    textTransform={'uppercase'}
                  >
                    Available
                  </Badge>
                )}
              </Box>
              <Box>{props.movieDetail?.sinopsis}</Box>
            </VStack>
          </HStack>
        </DrawerBody>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
