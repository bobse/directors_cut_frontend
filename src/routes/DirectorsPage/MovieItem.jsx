import { React, useState } from 'react';
import {
  Badge,
  Box,
  HStack,
  IconButton,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { StarIcon, CheckCircleIcon, ViewOffIcon } from '@chakra-ui/icons';
import auth from '../../services/auth';

export const MovieItem = props => {
  const movieBg = useColorModeValue(
    'linear(to-b, gray.100, transparent)',
    'linear(to-b, gray.700, transparent)'
  );
  return (
    <Box
      minH={'80px'}
      overflow="hidden"
      bgGradient={movieBg}
      p={2}
      ml={2}
      mt={2}
      pb={4}
    >
      {props.children}
    </Box>
  );
};

export const MovieTags = props => {
  const userPreviousLogin = auth.getProfile()?.user?.previous_login;

  function composeTags() {
    let tags = [props.movieInfo.type];
    props.movieInfo.release_date && tags.unshift(props.movieInfo.release_date);
    props.movieInfo.is_available_now && tags.unshift('available');
    return tags;
  }
  const tagsArray = composeTags();

  const variantNewAvailableItem = () => {
    // Checks if the item is newer than user previous login
    let value = 'available';
    if (
      userPreviousLogin &&
      props.movieInfo.is_available_now > userPreviousLogin
    ) {
      value = 'new';
    }
    return value;
  };
  return (
    <HStack spacing={1} mt={0} mb={1}>
      {tagsArray.map((item, idx) => {
        return (
          <Badge
            key={idx}
            variant={item === 'available' ? variantNewAvailableItem() : 'solid'}
          >
            {item}
          </Badge>
        );
      })}
    </HStack>
  );
};

export const MovieIcons = props => {
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

export default MovieItem;
