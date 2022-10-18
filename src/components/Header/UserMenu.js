import React from 'react';
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
  IconButton,
} from '@chakra-ui/react';
import { BiUserCircle } from 'react-icons/bi';

export const UserMenu = props => {
  return (
    <Menu {...props}>
      <MenuButton
        as={IconButton}
        aria-label="User"
        fontSize="1.8rem"
        icon={<BiUserCircle />}
        color="current"
        variant="transparent"
        _active={{ color: 'yellow.600' }}
        _hover={{ transform: 'scale(1.2)', color: 'yellow.600' }}
      />
      <MenuList>
        <MenuItem>Edit profile</MenuItem>
        <MenuItem>Logout</MenuItem>
        <MenuItem>Logout All Devices</MenuItem>
      </MenuList>
    </Menu>
  );
};
