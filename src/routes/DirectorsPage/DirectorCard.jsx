import { React } from 'react';
import {
  Box,
  Spacer,
  useColorModeValue,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Button,
  Flex,
  Center,
} from '@chakra-ui/react';
import { HiOutlineDotsVertical } from 'react-icons/hi';

export const DirectorCard = props => {
  return (
    <Box borderLeft="4px" borderColor={'yellow.400'} pb={4} maxW={'400px'}>
      {props.children}
    </Box>
  );
};

export const DirectorName = props => {
  const textColor = useColorModeValue('gray.800', 'gray.800');
  return (
    <Box bg={'yellow.400'} p={1}>
      <Flex alignItems={'center'}>
        <Box textStyle="h2" p={0} color={textColor}>
          {props.children}
        </Box>
        <Center
          bg={'yellow.600'}
          borderRadius={12}
          w={5}
          h={5}
          ml={3}
          fontSize={'xs'}
          fontWeight={'bold'}
          color={'white'}
        >
          {props.movieCount}
        </Center>

        <Spacer />
        <DirectorDots
          directorIdx={props.directorIdx}
          setDeleteModal={props.setDeleteModal}
        />
      </Flex>
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
          onClick={() => {
            props.setDeleteModal(props.directorIdx);
          }}
        >
          Remove from my list
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
