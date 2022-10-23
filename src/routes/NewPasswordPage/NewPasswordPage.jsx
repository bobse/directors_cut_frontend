import React, { useState } from 'react';
import { LoginBase } from '../../components/LoginBase/LoginBase';
import { useNavigate } from 'react-router-dom';
import {
  Text,
  HStack,
  IconButton,
  FormLabel,
  FormControl,
  Input,
  InputRightElement,
  InputGroup,
  useColorModeValue,
  FormErrorMessage,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Alerts } from '../../components/Alerts/Alerts';
import { ButtonStd } from '../../components/ButtonStd/ButtonStd';
import api from '../../services/api';
import * as constants from '../../constants';

export const NewPasswordPage = props => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get('token');
  const uidb64 = queryParams.get('uidb64');
  const [passwordShow, setPasswordShow] = useState(false);
  const InputBg = useColorModeValue('whiteAlpha.500', 'blackAlpha.400');

  const [fieldsValue, setFieldsValue] = useState({
    password: '',
    password2: '',
  });
  const [fieldsError, setFieldsError] = useState({
    password: '',
    password2: '',
  });
  const [alertErrors, setAlertErrors] = useState([
    { msg: undefined, status: 'error' },
  ]);
  const [apiLoading, setApiLoading] = useState(false);

  //   FUNCTIONS
  function passwordShowClick() {
    setPasswordShow(!passwordShow);
  }
  function ValidateInputs(values) {
    let noErrors = true;
    let errors = {};
    Object.keys(values).forEach(key => {
      errors[key] = '';
      if (values[key] === '') {
        errors[key] = 'This field is required';
        noErrors = false;
      }
      if (values['password'].length < 6) {
        noErrors = false;
        errors['password'] = 'Passwords must have at least 6 characters';
      }
      if (values['password'] !== values['password2']) {
        noErrors = false;
        errors['password'] = "Passwords don't match";
      }
    });
    setFieldsError(errors);
    return noErrors;
  }

  function handleInputChange(field) {
    let newValues = JSON.parse(JSON.stringify(fieldsValue));
    newValues[field.target.name] = field.target.value;
    setFieldsValue(newValues);
  }

  async function Submit(e) {
    e.preventDefault();
    if (!token && !uidb64) {
      setAlertErrors([
        {
          msg: 'Token and Uidb64 required',
          status: 'error',
        },
      ]);
    } else {
      if (ValidateInputs(fieldsValue)) {
        setApiLoading(true);
        try {
          let data = JSON.parse(JSON.stringify(fieldsValue));
          data['token'] = token;
          data['uidb64'] = uidb64;
          await api.post(constants.APINEWPASSWORD, data);
          navigate('/login', {
            state: {
              message: 'New password saved. Please login again.',
            },
          });
        } catch (error) {
          let errorList = [];
          const responseError =
            typeof error.response?.data === 'object' && error.response?.data;
          if (responseError) {
            for (let item in responseError) {
              errorList = errorList.concat({
                msg: responseError[item],
                status: 'error',
              });
            }
            setAlertErrors(errorList);
          } else {
            setAlertErrors([
              'Unable to change password. Please try again later.',
            ]);
          }
        } finally {
          setApiLoading(false);
        }
      }
    }
  }

  //   RETURN
  return (
    <LoginBase>
      <Alerts alertErrors={alertErrors} />
      <Text fontSize={'lg'} alignSelf={'flex-start'}>
        Please register a new password:
      </Text>
      <form onSubmit={Submit} style={{ width: '100%' }}>
        <FormControl isInvalid={fieldsError.password !== ''}>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              bg={InputBg}
              name="password"
              type={passwordShow ? 'text' : 'password'}
              value={fieldsValue.password}
              onChange={handleInputChange}
            />
            <InputRightElement width="4.5rem">
              <IconButton
                icon={passwordShow ? <ViewOffIcon /> : <ViewIcon />}
                bg={'transparent'}
                color={useColorModeValue('black', 'white')}
                _hover={{ background: 'transparent' }}
                onClick={passwordShowClick}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl isInvalid={fieldsError.password !== ''}>
          <FormLabel>Password Confirmation</FormLabel>
          <InputGroup>
            <Input
              bg={InputBg}
              name="password2"
              type={passwordShow ? 'text' : 'password'}
              value={fieldsValue.password2}
              onChange={handleInputChange}
            />
            <InputRightElement width="4.5rem">
              <IconButton
                icon={passwordShow ? <ViewOffIcon /> : <ViewIcon />}
                bg={'transparent'}
                color={useColorModeValue('black', 'white')}
                _hover={{ background: 'transparent' }}
                onClick={passwordShowClick}
              />
            </InputRightElement>
          </InputGroup>
          {fieldsError.password !== '' && (
            <FormErrorMessage>{fieldsError.password}</FormErrorMessage>
          )}
        </FormControl>

        <HStack py={4}>
          <ButtonStd
            size={'md'}
            type="submit"
            label="Reset password"
            isLoading={apiLoading}
          />
          <ButtonStd
            size={'md'}
            label="Cancel"
            onClick={() => {
              navigate('/login');
            }}
          />
        </HStack>
      </form>
    </LoginBase>
  );
};
