import { React } from 'react';
import {
  Box,
  HStack,
  Spacer,
  useColorModeValue,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Button,
} from '@chakra-ui/react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { MovieItem } from './MovieItem';

const DirectorDots = props => {
  return (
    <Menu {...props}>
      <MenuButton
        as={Button}
        aria-label="Options for Director"
        fontSize="1rem"
        bg={'none'}
        color="gray.800"
        borderRadius={4}
        _active={{ bg: 'blackAlpha.100' }}
      >
        <HiOutlineDotsVertical />
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={() =>
            props.setDeleteDirectorId({
              id: props.directorInfo.id,
              name: props.directorInfo.name,
            })
          }
        >
          Remove from my list
        </MenuItem>
        <MenuItem>View on imdb</MenuItem>
      </MenuList>
    </Menu>
  );
};

const DirectorName = props => {
  const textColor = useColorModeValue('gray.800', 'gray.800');
  return (
    <Box bg={'yellow.400'} p={1}>
      <HStack>
        <Box textStyle="h2" p={0} color={textColor}>
          {props.directorInfo.name}
        </Box>
        <Spacer />
        <DirectorDots
          directorInfo={props.directorInfo}
          setDeleteDirectorId={props.setDeleteDirectorId}
        />
      </HStack>
    </Box>
  );
};

export const DirectorCard = props => {
  return (
    <Box borderLeft="4px" borderColor={'yellow.400'} minH={'250px'} pb={8}>
      <DirectorName
        setDeleteDirectorId={props.setDeleteDirectorId}
        directorInfo={props.directorInfo}
      />
      {props.directorInfo.movies.map((movie, idx) => {
        return (
          <MovieItem
            setMovieDetail={props.setMovieDetail}
            key={movie.id}
            movieInfo={movie}
          />
        );
      })}
    </Box>
  );
};
