import { React, useState } from 'react';
import { Flex, Center, IconButton, VStack, Box } from '@chakra-ui/react';
import { ImFilter } from 'react-icons/im';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import { AddIcon } from '@chakra-ui/icons';
import { DirectorFilter } from './Filters/DirectorFilter';
import { AddDirector } from './AddDirector/AddDirector';
import { ButtonStd } from '../ButtonStd/ButtonStd';
import { UserMenu } from './UserMenu';

export const Header = props => {
  const [filterDrawerisOpen, setfilterDrawer] = useState(false);
  const [addDirectorDrawerisOpen, setAddDirectorDrawer] = useState(false);

  return (
    <Flex w="100%" p={0}>
      <DirectorFilter
        filterDrawerisOpen={filterDrawerisOpen}
        setfilterDrawer={setfilterDrawer}
      />
      <AddDirector
        addDirectorDrawerisOpen={addDirectorDrawerisOpen}
        setAddDirectorDrawer={setAddDirectorDrawer}
      />

      <Center flex={1} justifyContent={'left'}>
        <Logo />
      </Center>
      <VStack alignItems={'flex-end'}>
        <Box>
          <UserMenu />
          <IconButton
            aria-label="Filters"
            fontSize="1.2rem"
            icon={<ImFilter />}
            color="current"
            variant="transparent"
            _hover={{ transform: 'scale(1.2)', color: 'yellow.600' }}
            onClick={() => setfilterDrawer(true)}
          />
          <ColorModeSwitcher
            fontSize="md"
            _hover={{ transform: 'scale(1.2)', color: 'yellow.600' }}
          />
        </Box>
        <Box>
          <ButtonStd
            rightIcon={<AddIcon />}
            onClick={() => setAddDirectorDrawer(true)}
            label="Add director"
          />
        </Box>
        <Box fontSize={'sm'}>Showing 75 of 100 directors</Box>
      </VStack>
    </Flex>
  );
};
