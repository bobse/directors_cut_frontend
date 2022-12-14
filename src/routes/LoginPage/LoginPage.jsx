import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Center,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Link,
  HStack,
  useColorModeValue,
  InputRightElement,
  Alert,
  AlertDescription,
  AlertIcon,
  InputGroup,
  IconButton,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { ButtonStd } from '../../components/ButtonStd/ButtonStd';
import auth from '../../services/auth';
import { LoginBase } from '../../components/LoginBase/LoginBase';

export const LoginPage = props => {
  const navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || '/';
  let searchParam = location.state?.from?.search || '';

  React.useEffect(() => {
    if (auth.isAuthenticated()) {
      navigate(from + searchParam);
    }
  }, [navigate, from, searchParam]);

  const [fieldsValue, setFieldsValue] = React.useState({
    email: '',
    password: '',
  });
  const [fieldsError, setFieldsError] = React.useState({
    email: '',
    password: '',
  });
  const [alertErrors, setAlertErrors] = React.useState();
  const [apiLoading, setApiLoading] = React.useState(false);
  const [passwordShow, setPasswordShow] = React.useState(false);
  const Alerts = props => {
    if (props.alertErrors) {
      return props.alertErrors.map((error, idx) => {
        return (
          <Alert key={idx} status="error">
            <AlertIcon />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        );
      });
    } else {
      return (
        props.message && (
          <Alert status="warning">
            <AlertIcon />
            <AlertDescription>{props.message}</AlertDescription>
          </Alert>
        )
      );
    }
  };

  async function Submit(e) {
    e.preventDefault();
    setAlertErrors();
    let values = JSON.parse(JSON.stringify(fieldsValue));
    if (ValidateInputs(values)) {
      try {
        setApiLoading(true);
        const response = await auth.login(values);
        auth.saveToken(response.data);
        navigate(from + searchParam, { replace: true });
      } catch (error) {
        let errorList = [];
        const responseError =
          typeof error.response?.data === 'object' && error.response?.data;
        if (responseError) {
          for (let item in responseError) {
            errorList = errorList.concat(responseError[item]);
          }
          setAlertErrors(errorList);
        } else {
          setAlertErrors(['Unable to log in with provided credentials.']);
        }
        setApiLoading(false);
      }
    }
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
    });
    if (!values['email'].includes('@') || !values['email'].includes('.')) {
      noErrors = false;
      errors['email'] = 'Invalid email';
    }
    if (values['password'].length < 6) {
      noErrors = false;
      errors['password'] = 'Passwords must have at least 6 characters';
    }
    setFieldsError(errors);
    return noErrors;
  }

  function passwordShowClick() {
    setPasswordShow(!passwordShow);
  }

  function handleInputChange(field) {
    let newValues = JSON.parse(JSON.stringify(fieldsValue));
    newValues[field.target.name] = field.target.value;
    setFieldsValue(newValues);
  }

  return (
    <LoginBase>
      <Text fontSize={['md', 'lg']}>
        This is a tool for people that want to follow their directors and find
        out what they are up to: movies currently playing, projects in
        production and more to come.
      </Text>
      <Text fontSize={['md', 'lg']}>
        You let us know what directors you're into and we'll let you know if
        something new comes up.
      </Text>
      <Alerts alertErrors={alertErrors} message={location.state?.message} />
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
        <FormControl isInvalid={fieldsError.password !== ''}>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
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
          {fieldsError.password !== '' && (
            <FormErrorMessage>{fieldsError.password}</FormErrorMessage>
          )}
        </FormControl>
        <Center>
          <HStack mt={4}>
            <ButtonStd
              size={'md'}
              isLoading={apiLoading}
              type="submit"
              label="Login"
            />
            <ButtonStd
              size={'md'}
              label="Signup"
              onClick={() => {
                navigate('/signup');
              }}
            />
          </HStack>
        </Center>
      </form>
      <Link
        onClick={() => {
          navigate('/forgotpassword');
        }}
      >
        Forgot password?
      </Link>
    </LoginBase>
  );
};
