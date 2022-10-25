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
  HStack,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
} from '@chakra-ui/react';
import { ButtonStd } from '../../../components/ButtonStd/ButtonStd';
import * as constants from '../../../constants';
import api from '../../../services/api';
import auth from '../../../services/auth';
import { Alerts } from '../../../components/Alerts/Alerts';

export const UserProfile = props => {
  const profile = auth.getProfile()?.user;
  let [fields, setFields] = useState({
    name: profile.name,
    country: profile.country,
  });
  let [isSaving, setIsSaving] = useState(false);
  let [alertErrors, setAlertErrors] = useState();

  async function submit(e) {
    e.preventDefault();
    if (fields.name.length < 3) {
      setAlertErrors([
        { msg: 'Name must be at least 3 characters long', status: 'error' },
      ]);
    } else {
      setIsSaving(true);
      try {
        const response = await api.patch(constants.APIUPDATEUSER, fields);
        auth.saveProfile(response.data);
        props.setUserProfileDrawer(false);
      } catch (error) {
        setAlertErrors([
          { msg: 'Could not update your data', status: 'error' },
        ]);
      } finally {
        setIsSaving(false);
      }
    }
  }

  function handleInputChange(field) {
    let newValues = JSON.parse(JSON.stringify(fields));
    newValues[field.target.name] = field.target.value;
    setFields(newValues);
  }

  function handleRadioChange(value) {
    let newValues = JSON.parse(JSON.stringify(fields));
    newValues.country = value;
    setFields(newValues);
  }

  return (
    <Drawer
      isOpen={props.userProfileDrawer}
      placement="right"
      onClose={() => {
        props.setUserProfileDrawer(false);
        setAlertErrors();
      }}
      size={['xs', 'md']}
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
            User profile
          </Box>
        </DrawerHeader>
        <DrawerBody>
          <Alerts alertErrors={alertErrors} />
          <form id="userForm" onSubmit={submit} style={{ width: '100%' }}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                w={['100%']}
                name="name"
                onChange={handleInputChange}
                value={fields.name}
              ></Input>
            </FormControl>
            <RadioGroup
              value={fields.country}
              name="country"
              onChange={handleRadioChange}
              mt={4}
            >
              <HStack spacing={5} direction="row">
                <Radio value="BR">Brazil</Radio>
                <Radio value="US">United Stated</Radio>
              </HStack>
            </RadioGroup>
          </form>
        </DrawerBody>
        <DrawerFooter>
          <ButtonStd
            label="Update my info"
            type="submit"
            form="userForm"
            isLoading={isSaving}
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
