import React from 'react';
import {
  Badge,
  Box,
  HStack,
  IconButton,
  useColorModeValue,
  Text,
  Flex,
  Tooltip,
  Link,
  useToast,
} from '@chakra-ui/react';
import { StarIcon, CheckCircleIcon, ViewOffIcon } from '@chakra-ui/icons';

const Tags = props => {
  const bgColor = useColorModeValue('whiteAlpha.800', 'gray.900');
  const bgColorAvailable = useColorModeValue('yellow.400', 'yellow.200');
  const textColor = useColorModeValue('blackAlpha.900', 'whiteAlpha.900');
  return props.tags.map((item, idx) => {
    return (
      <Badge
        key={idx}
        fontSize={{ base: '0.6rem' }}
        fontWeight={'normal'}
        color={item === 'available' ? 'black' : textColor}
        bg={item === 'available' ? bgColorAvailable : bgColor}
        mt={-4}
        ml={-1}
        mr={2}
        px="1.5"
        textTransform={'uppercase'}
      >
        {item}
      </Badge>
    );
  });
};
const MovieIcons = props => {
  const toast = useToast();

  const iconColorDisabled = useColorModeValue('gray.300', 'gray.500');
  const iconColorEnabled = useColorModeValue('black', 'white');
  const iconSize = [4, 3];
  return (
    <HStack spacing={[-1, -3]}>
      <Tooltip hasArrow label="Add to wishlist">
        <IconButton
          aria-label="Add to wishlist"
          bg={'none'}
          color={
            props.userChoice === 'wishlist'
              ? iconColorEnabled
              : iconColorDisabled
          }
          icon={<StarIcon w={iconSize} />}
          _hover={{ transform: 'scale(1.2)', color: 'yellow.600' }}
          onClick={() => {
            toast({
              title: 'Wishlist',
              description: 'Added to wishlist',
              status: 'success',
              duration: 2000,
              isClosable: true,
              position: 'top',
            });
          }}
        />
      </Tooltip>
      <Tooltip hasArrow label="Mark as watched">
        <IconButton
          aria-label="Mark as Watched"
          bg={'none'}
          color={
            props.userChoice === 'watched'
              ? iconColorEnabled
              : iconColorDisabled
          }
          _hover={{ transform: 'scale(1.2)', color: 'yellow.600' }}
          icon={<CheckCircleIcon w={iconSize} />}
        />
      </Tooltip>
      <Tooltip hasArrow label="Ignore this movie">
        <IconButton
          aria-label="Ignore Movie"
          bg={'none'}
          color={
            props.userChoice === 'ignore' ? iconColorEnabled : iconColorDisabled
          }
          _hover={{ transform: 'scale(1.2)', color: 'yellow.600' }}
          icon={<ViewOffIcon w={iconSize} />}
        />
      </Tooltip>
    </HStack>
  );
};

export const MovieItem = props => {
  const movieBg = useColorModeValue(
    'linear(to-b, gray.100, transparent)',
    'linear(to-b, gray.700, transparent)'
  );
  const tags = [props.movieInfo.release_date, props.movieInfo.type];
  props.movieInfo.is_available_now && tags.unshift('available');
  return (
    <Box minH={'80px'} bgGradient={movieBg} p={2} ml={2} mt={2} pb={4}>
      <Tags tags={tags} />
      <Flex spacing={1} overflow="hidden">
        <Box flex={1} fontWeight={'normal'}>
          <Link
            onClick={() => {
              props.setMovieDetail(props.movieInfo);
            }}
          >
            <Text noOfLines={2}>{props.movieInfo.name}</Text>
          </Link>
        </Box>
        <MovieIcons userChoice="wishlist" />
      </Flex>
    </Box>
  );
};
