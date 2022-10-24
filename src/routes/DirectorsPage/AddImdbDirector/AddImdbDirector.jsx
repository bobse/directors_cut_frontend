import { React, useState } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  Box,
  Input,
  FormControl,
  Text,
  Image,
  HStack,
} from '@chakra-ui/react';
import { ButtonStd } from '../../../components/ButtonStd/ButtonStd';
import * as constants from '../../../constants';
import api from '../../../services/api';
import { Alerts } from '../../../components/Alerts/Alerts';
import Step1Image from './step1.png';
import Step2Image from './step2.png';
import { DirectorResultItem } from '../../DirectorsPage/Header/AddDirector/DirectorResultItem';

export const AddImdbDirector = props => {
  let [fields, setFields] = useState({
    imdb_id: undefined,
  });
  let [isSaving, setIsSaving] = useState(false);
  let [alertErrors, setAlertErrors] = useState();
  let [director, setDirector] = useState();

  async function submit(e) {
    setIsSaving(true);
    setDirector();
    setAlertErrors();
    e.preventDefault();
    try {
      if (fields.imdb_id.length < 5) {
        throw new Error('Imdb Id must be at least 5 characters long');
      }
      if (fields.imdb_id.slice(0, 2).toUpperCase() !== 'NM') {
        throw new Error('Imdb Id must start with nm');
      }

      try {
        const response = await api.get(
          `${
            constants.APIADDIMDBDIRECTOR
          }?imdb_id=${fields.imdb_id.toLowerCase()}`
        );
        setDirector(response?.data);
      } catch (error) {
        if (
          error?.response?.status === 404 &&
          Object.keys(error.response.data).length === 0
        ) {
          throw new Error('Could not find this director. Sorry!');
        }
        if (Object.keys(error.response.data).length > 0) {
          const key = Object.keys(error.response.data)[0];
          throw new Error(error.response.data[key]);
        }
        throw new Error(
          'Could not find this director. Please try again later!'
        );
      }
    } catch (error) {
      setAlertErrors([
        {
          msg: error.message,
          status: 'error',
        },
      ]);
    } finally {
      setIsSaving(false);
    }
  }

  function handleInputChange(field) {
    let newValues = JSON.parse(JSON.stringify(fields));
    newValues[field.target.name] = field.target.value;
    setFields(newValues);
  }

  async function add(director) {
    const data = { imdb_id: director.imdb_id };
    try {
      await api.post(constants.APIADDIMDBDIRECTOR, data);
      setAlertErrors([
        {
          msg: 'Director added to your list :)',
          status: 'success',
        },
      ]);
      props.setForceRefresh(!props.forceRefresh);
    } catch {
      setAlertErrors([
        {
          msg: 'Ops! Could not add the director. Try again later!',
          status: 'error',
        },
      ]);
      throw new Error('Could not add the director');
    }
  }

  return (
    <Drawer
      isOpen={props.addImdbDirectorDrawer}
      placement="right"
      onClose={() => {
        props.setAddImdbDirectorDrawer(false);
      }}
      onCloseComplete={() => {
        setDirector();
        setAlertErrors();
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
            Add director from IMDB
          </Box>
        </DrawerHeader>
        <DrawerBody>
          <Text fontWeight={'bold'}>
            Here's how to find your director imdb id:
          </Text>
          <Text mt={4}>
            <b>Step one: </b>Use imdb search tool to find your director and
            click on it.
          </Text>
          <Image src={Step1Image} maxW={'600px'} w={'100%'} />
          <Text mt={4}>
            <b>Step two: </b>Grab the director's id from the address bar and
            paste on the search field and click on search.
          </Text>
          <Image src={Step2Image} maxW={'600px'} w={'100%'} mb={4} />
          <Alerts alertErrors={alertErrors} />

          <form id="userForm" onSubmit={submit} style={{ width: '100%' }}>
            <FormControl mt={4}>
              <Input
                w={['100%']}
                placeholder="Paste IMDB ID here"
                name="imdb_id"
                onChange={handleInputChange}
                value={fields.imdb_id}
              ></Input>
            </FormControl>
            <HStack mt={4}>
              <ButtonStd
                label="Search director"
                type="submit"
                form="userForm"
                isLoading={isSaving}
              />
              <ButtonStd
                label="Cancel"
                onClick={() => {
                  props.setAddImdbDirectorDrawer(false);
                  setAlertErrors();
                }}
              />
            </HStack>
          </form>
          {director && (
            <DirectorResultItem director={director} addDirector={add} />
          )}
        </DrawerBody>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
