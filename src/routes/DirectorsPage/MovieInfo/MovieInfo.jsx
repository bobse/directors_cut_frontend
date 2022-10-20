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
  Center,
  useBreakpointValue,
} from '@chakra-ui/react';

export const MovieInfo = props => {
  return (
    <Drawer
      isOpen={props.movieDetail}
      placement={useBreakpointValue(['bottom', 'right'])}
      onClose={() => props.setMovieDetail()}
      size={'md'}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader px={8}>
          {props.movieDetail?.name}
          <Box fontSize={'xs'}>{props.movieDetail?.genre}</Box>
        </DrawerHeader>
        <DrawerBody>
          {props.movieDetail?.poster_url && (
            <Center py={8}>
              <Image
                maxW={['60%', '50%']}
                src={
                  'https://image.tmdb.org/t/p/w300_and_h450_bestv2' +
                  props.movieDetail?.poster_url
                }
              />
            </Center>
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
        </DrawerBody>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
