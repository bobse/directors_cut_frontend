import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import LogoLightMode from '../../assets/logo.png';
import logoDarkMode from '../../assets/logo_dark_mode.png';
import BgLight from '../../assets/bg_light.png';
import BgDark from '../../assets/bg_dark.png';
import { ButtonStd } from '../../components/ButtonStd/ButtonStd';
import { Alerts } from '../../components/Alerts/Alerts';
import * as constants from '../../constants';
import api from '../../services/api';
import { LoginBase } from '../../components/LoginBase/LoginBase';

export const ForgotPasswordPage = props => {
  const navigate = useNavigate();
  const [fieldsValue, setFieldsValue] = React.useState({
    email: '',
  });
  const [fieldsError, setFieldsError] = React.useState({
    email: '',
  });
  const [alertErrors, setAlertErrors] = React.useState([
    { msg: undefined, status: 'error' },
  ]);
  const [apiLoading, setApiLoading] = React.useState(false);

  function ValidateInputs(values) {
    let noErrors = true;
    let errors = {};
    Object.keys(values).forEach(key => {
      errors[key] = '';
      if (values[key] === '') {
        errors[key] = 'This field is required';
        noErrors = false;
      }
      if (!values['email'].includes('@') || !values['email'].includes('.')) {
        noErrors = false;
        errors['email'] = 'Invalid email';
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
    let values = JSON.parse(JSON.stringify(fieldsValue));
    if (ValidateInputs(values)) {
      setApiLoading(true);
      try {
        await api.post(constants.APIFORGOTPASSWORD, values);
        setAlertErrors([
          {
            msg: 'Please check your email to proceed with password reset',
            status: 'success',
          },
        ]);
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
        }
        setAlertErrors(errorList);
      } finally {
        setApiLoading(false);
      }
    }
  }

  return (
    <LoginBase>
      <Text fontSize={['md', 'lg']}>
        Please enter your email to reset your password.
      </Text>
      <Alerts alertErrors={alertErrors} />
      <form onSubmit={Submit} style={{ width: '100%' }}>
        <FormControl isInvalid={fieldsError.email !== ''}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={fieldsValue.email}
            onChange={handleInputChange}
          />
          {fieldsError.email !== '' && (
            <FormErrorMessage>{fieldsError.email}</FormErrorMessage>
          )}
        </FormControl>
        <HStack mt={4}>
          <ButtonStd
            size={'md'}
            isLoading={apiLoading}
            label="Reset password"
            type="submit"
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
