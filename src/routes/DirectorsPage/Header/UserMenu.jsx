import React from 'react';
import {
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  IconButton,
  MenuDivider,
} from '@chakra-ui/react';
import { BiUserCircle } from 'react-icons/bi';
import auth from '../../../services/auth';

export const UserMenu = props => {
  const profile = auth.getProfile();
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
        <MenuItem>
          {profile?.user?.name} - {profile?.user?.email}
        </MenuItem>
        <MenuDivider />
        <MenuItem onClick={() => props.setUserProfileDrawer(true)}>
          Edit profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            auth.logout();
          }}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
