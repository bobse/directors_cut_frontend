import { React, useState } from 'react';
import { Flex, Center, IconButton, VStack, Box } from '@chakra-ui/react';
import { ImFilter } from 'react-icons/im';
import { ColorModeSwitcher } from '../../../components/ColorModeSwitcher/ColorModeSwitcher';
import { Logo } from './Logo';
import { AddIcon } from '@chakra-ui/icons';
import { FiltersDrawer } from '../Filters/FiltersDrawer';
import { AddDirector } from './AddDirector/AddDirector';
import { ButtonStd } from '../../../components/ButtonStd/ButtonStd';
import { UserMenu } from './UserMenu';
import { UserProfile } from './UserProfile/UserProfile';
import { AddImdbDirector } from '../AddImdbDirector/AddImdbDirector';

export const Header = props => {
  const [filterDrawerisOpen, setfilterDrawer] = useState(false);
  const [addDirectorDrawerisOpen, setAddDirectorDrawer] = useState(false);
  const [userProfileDrawer, setUserProfileDrawer] = useState(false);
  const [addImdbDirectorDrawer, setAddImdbDirectorDrawer] = useState(false);

  return (
    <Flex w="100%" p={0}>
      <FiltersDrawer
        filterDrawerisOpen={filterDrawerisOpen}
        setfilterDrawer={setfilterDrawer}
        clearFilters={props.clearFilters}
        setFilters={props.setFilters}
        filters={props.filters}
      />
      <AddDirector
        addDirectorDrawerisOpen={addDirectorDrawerisOpen}
        setAddDirectorDrawer={setAddDirectorDrawer}
        addDirector={props.addDirector}
        myDirectors={props.myDirectors}
        setAddImdbDirectorDrawer={setAddImdbDirectorDrawer}
      />
      <UserProfile
        setUserProfileDrawer={setUserProfileDrawer}
        userProfileDrawer={userProfileDrawer}
      />
      <AddImdbDirector
        setAddImdbDirectorDrawer={setAddImdbDirectorDrawer}
        addImdbDirectorDrawer={addImdbDirectorDrawer}
        setForceRefresh={props.setForceRefresh}
        forceRefresh={props.forceRefresh}
      />
      <Center flex={1} justifyContent={'left'}>
        <Logo />
      </Center>
      <VStack alignItems={'flex-end'}>
        <Box>
          <UserMenu setUserProfileDrawer={setUserProfileDrawer} />
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
      </VStack>
    </Flex>
  );
};
