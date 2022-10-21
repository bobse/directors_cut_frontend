import { React, useState } from 'react';
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
import { MovieInfo } from './MovieDrawer/MovieDrawer';
import api from '../../services/api';
import * as constants from '../../constants';

export const MovieItem = props => {
  const [movieDetail, setMovieDetail] = useState();

  const movieBg = useColorModeValue(
    'linear(to-b, gray.100, transparent)',
    'linear(to-b, gray.700, transparent)'
  );

  function composeTags() {
    let tags = [props.movieInfo.type];
    props.movieInfo.release_date && tags.unshift(props.movieInfo.release_date);
    props.movieInfo.is_available_now && tags.unshift('available');
    return tags;
  }
  const tagsArray = composeTags();

  return (
    <>
      <MovieInfo movieDetail={movieDetail} setMovieDetail={setMovieDetail} />
      <Box minH={'80px'} bgGradient={movieBg} p={2} ml={2} mt={2} pb={4}>
        <Tags tags={tagsArray} />
        <Flex spacing={1} overflow="hidden">
          <Box flex={1} fontWeight={'normal'}>
            <Link
              onClick={() => {
                setMovieDetail(props.movieInfo);
              }}
            >
              <Text noOfLines={2}>{props.movieInfo.name}</Text>
            </Link>
          </Box>
          <MovieIcons
            updateMyDirectorsUserChoice={props.updateMyDirectorsUserChoice}
            itemIdx={props.itemIdx}
            movieInfo={props.movieInfo}
          />
        </Flex>
      </Box>
    </>
  );
};

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
  const iconSize = [4, 3];
  const iconsList = {
    wishlist: <StarIcon w={iconSize} />,
    watched: <CheckCircleIcon w={iconSize} />,
    ignore: <ViewOffIcon w={iconSize} />,
  };
  const toast = useToast();
  const iconColorDisabled = useColorModeValue('gray.300', 'gray.500');
  const iconColorEnabled = useColorModeValue('black', 'white');
  const [isApiLoading, setApiLoading] = useState(false);

  function activateToast(userChoice, statusType = 'success') {
    const successText =
      props.movieInfo.user_choice !== userChoice
        ? `Added to ${userChoice.toLowerCase()}`
        : `Removed from ${userChoice.toLowerCase()}`;
    const errorText =
      'Sorry, could not process the resquest. Try again please!';
    toast({
      title: props.movieInfo.name,
      description: statusType === 'success' ? successText : errorText,
      status: statusType,
      duration: 3000,
      isClosable: true,
      position: 'top',
    });
  }

  async function setUserChoice(choice) {
    setApiLoading(true);
    try {
      await props.updateMyDirectorsUserChoice(props.movieInfo.id, choice);
      activateToast(choice);
      setTimeout(() => {
        setApiLoading(false);
      }, 2000);
    } catch (error) {
      setApiLoading(false);
      activateToast(choice, 'error');
    }
  }

  return (
    <HStack spacing={-1}>
      {Object.keys(iconsList).map((iconKey, idx) => {
        return (
          <IconButton
            isLoading={isApiLoading}
            key={`${idx}_${props.movieInfo.name}`}
            aria-label="Add to wishlist"
            bg={'none'}
            color={
              props.movieInfo?.user_choice === iconKey
                ? iconColorEnabled
                : iconColorDisabled
            }
            icon={iconsList[iconKey]}
            _hover={{ transform: 'scale(1.2)', color: 'yellow.600' }}
            onClick={() => {
              setUserChoice(iconKey, props.movieInfo);
            }}
          />
        );
      })}
    </HStack>
  );
};
