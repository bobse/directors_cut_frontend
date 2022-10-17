import { React, useState } from 'react';
import {
  Flex,
  Center,
  IconButton,
  Tooltip,
  VStack,
  Box,
  Button,
} from '@chakra-ui/react';
import { ImFilter } from 'react-icons/im';
import { BiUserCircle } from 'react-icons/bi';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo.js';
import { AddIcon } from '@chakra-ui/icons';
import { DirectorFilter } from '../Filters/DirectorFilter';
import { AddDirector } from '../AddDirector/AddDirector';

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
          <Tooltip hasArrow label="User settings">
            <IconButton
              aria-label="User"
              fontSize="1.8rem"
              icon={<BiUserCircle />}
              color="current"
              variant="transparent"
              _hover={{ transform: 'scale(1.2)', color: 'yellow.600' }}
            />
          </Tooltip>
          <Tooltip hasArrow label="Filter my directors">
            <IconButton
              aria-label="Filters"
              fontSize="1.2rem"
              icon={<ImFilter />}
              color="current"
              variant="transparent"
              _hover={{ transform: 'scale(1.2)', color: 'yellow.600' }}
              onClick={() => setfilterDrawer(true)}
            />
          </Tooltip>
          <ColorModeSwitcher
            fontSize="md"
            _hover={{ transform: 'scale(1.2)', color: 'yellow.600' }}
          />
        </Box>
        <Box>
          <Button
            rounded={'false'}
            rightIcon={<AddIcon />}
            colorScheme={'yellow'}
            size={'sm'}
            _hover={{
              color: 'white',
              background: 'black',
            }}
            onClick={() => setAddDirectorDrawer(true)}
          >
            Add director
          </Button>
        </Box>
        <Box fontSize={'sm'}>Showing 75 of 100 directors</Box>
      </VStack>
    </Flex>
  );
};
