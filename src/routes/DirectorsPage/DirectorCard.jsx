import { React, useState } from 'react';
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
  Text,
} from '@chakra-ui/react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { MovieItem } from './MovieItem';
import { DeleteModal } from './DeleteModal';

export const DirectorCard = props => {
  const [deleteDirectorId, setDeleteDirectorId] = useState({
    id: undefined,
    name: undefined,
  });
  const closeModal = () => {
    setDeleteDirectorId({ id: undefined, name: undefined });
  };
  return (
    <>
      <DeleteModal
        deleteDirectorId={deleteDirectorId}
        closeModal={closeModal}
        deleteDirectorMethod={props.deleteDirectorMethod}
      />
      <Box borderLeft="4px" borderColor={'yellow.400'} minH={'250px'} pb={8}>
        <DirectorName
          setDeleteDirectorId={setDeleteDirectorId}
          directorInfo={props.directorInfo}
        />
        {props.directorInfo.movies.length > 0 ? (
          props.directorInfo.movies.map((movie, idx) => {
            return <MovieItem key={movie.id} movieInfo={movie} />;
          })
        ) : (
          <Text p={4}>No current new projects</Text>
        )}
      </Box>
    </>
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
