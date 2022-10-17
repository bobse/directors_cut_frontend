import { React } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  Center,
  VStack,
  Box,
  Button,
  Input,
  HStack,
  Divider,
  Square,
  Flex,
  Link,
} from '@chakra-ui/react';
import { Search2Icon, AddIcon } from '@chakra-ui/icons';
import { DirectorResultItem } from './DirectorResultItem';

export const AddDirector = props => {
  return (
    <Drawer
      isOpen={props.addDirectorDrawerisOpen}
      placement="right"
      onClose={() => props.setAddDirectorDrawer(false)}
      size={'lg'}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Box
            w={'85%'}
            mt={4}
            textStyle="h2"
            fontWeight={'normal'}
            fontSize={'2rem'}
          >
            Add new directors to your list
          </Box>
        </DrawerHeader>
        <DrawerBody>
          <VStack w={'full'} alignItems={'flex-start'}>
            <Input
              w={['100%']}
              placeholder={'Who are you looking for?'}
            ></Input>
            <HStack>
              <Button leftIcon={<Search2Icon />}>Search</Button>
              <Button>View all directors</Button>
            </HStack>
            <DirectorResultItem
              director={{ name: 'Bob', id: 1, on_my_list: false }}
            />
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <Box p={5} fontSize={'sm'}>
            Can't find your director in our DB? You can use
            <Link fontWeight={'bold'}> this tool</Link> to add him/her by their
            IMDB id.
          </Box>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
