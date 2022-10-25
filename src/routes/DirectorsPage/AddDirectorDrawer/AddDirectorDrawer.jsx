import { React, useState } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  VStack,
  Box,
  Input,
  HStack,
  Link,
  Text,
  InputGroup,
  InputRightElement,
  CloseButton,
} from '@chakra-ui/react';
import { Search2Icon, InfoIcon } from '@chakra-ui/icons';
import { DirectorResultItem } from './DirectorResultItem';
import { ButtonStd } from '../../../components/ButtonStd/ButtonStd';
import * as constants from '../../../constants';
import api from '../../../services/api';

export const AddDirectorDrawer = props => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchField, setSearchField] = useState();
  const [isSearching, setIsSearching] = useState(false);

  async function searchDirector(e) {
    e.preventDefault();
    if (searchField && searchField.trim().length > 0) {
      setIsSearching(true);
      try {
        const response = await api.get(
          constants.APISEARCH + '?search=' + searchField
        );
        setSearchResults(response.data);
        setIsSearching(false);
      } catch (error) {
        setIsSearching(false);
        console.log(error);
      }
    }
  }

  async function searchAllDirectors(e) {
    try {
      const response = await api.get(constants.APISEARCH);
      setSearchResults(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function loadMore() {
    let newResults = JSON.parse(JSON.stringify(searchResults));
    const response = await api.get(searchResults.next);
    newResults.results.push(...response.data.results);
    newResults.next = response.data.next;
    setSearchResults(newResults);
  }

  return (
    <Drawer
      isOpen={props.addDirectorDrawerisOpen}
      placement="right"
      onClose={() => {
        setSearchResults([]);
        props.setAddDirectorDrawer(false);
      }}
      size={'md'}
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
            <form onSubmit={searchDirector} style={{ width: '100%' }}>
              <InputGroup>
                <Input
                  w={['100%']}
                  placeholder={'Who are you looking for?'}
                  onChange={e => {
                    setSearchField(e.target.value);
                  }}
                  value={searchField}
                ></Input>
                <InputRightElement width="4.5rem">
                  <CloseButton
                    onClick={() => {
                      if (searchField) {
                        setSearchField('');
                      }
                      setSearchResults([]);
                      setIsSearching(false);
                    }}
                  />
                </InputRightElement>
              </InputGroup>
              <HStack mt={4}>
                <ButtonStd
                  leftIcon={<Search2Icon />}
                  label="Search"
                  type="submit"
                  isLoading={isSearching}
                />
                <ButtonStd
                  onClick={searchAllDirectors}
                  label="View all directors"
                />
              </HStack>
            </form>
            {searchResults?.count > 0 && (
              <Text>
                Showing {searchResults.results.length} directors
                {searchResults.next && 'of ' + searchResults.count}
              </Text>
            )}
            {searchResults?.results &&
              searchResults.results.map((result, idx) => {
                return (
                  <DirectorResultItem
                    key={idx}
                    director={result}
                    addDirector={props.addDirector}
                  />
                );
              })}
            {searchResults.next && (
              <ButtonStd label="Load more" onClick={loadMore} />
            )}
            {'count' in searchResults && searchResults.count === 0 && (
              <Text>No results!</Text>
            )}
          </VStack>
        </DrawerBody>
        <DrawerFooter>
          <Box pw={5} fontSize={'sm'}>
            <InfoIcon size={4} mr={2} />
            Can't find your director in our DB? You can use
            <Link
              as={'button'}
              onClick={() => {
                props.setAddDirectorDrawer(false);
                props.setAddImdbDirectorDrawer(true);
              }}
              fontWeight={'bold'}
              bg={'yellow.400'}
              px={1}
              mx={2}
              color={'black'}
            >
              this tool
            </Link>
            to add him/her by their IMDB id.
          </Box>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
