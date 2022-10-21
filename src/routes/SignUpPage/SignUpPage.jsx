import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  VStack,
  Center,
  Image,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  HStack,
  useColorModeValue,
  InputRightElement,
  InputGroup,
  IconButton,
  Alert,
  AlertIcon,
  AlertDescription,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import LogoLightMode from '../../assets/logo.png';
import logoDarkMode from '../../assets/logo_dark_mode.png';
import BgLight from '../../assets/bg_light.png';
import BgDark from '../../assets/bg_dark.png';
import { ButtonStd } from '../../components/ButtonStd/ButtonStd';
import * as constants from '../../constants';
import api from '../../services/api';

export const SignUpPage = props => {
  const navigate = useNavigate();
  const [fieldsValue, setFieldsValue] = React.useState({
    email: '',
    name: '',
    password: '',
    password2: '',
    country: 'BR',
  });
  const [fieldsError, setFieldsError] = React.useState({
    email: '',
    name: '',
    password: '',
  });
  const [alertErrors, setAlertErrors] = React.useState();
  const [passwordShow, setPasswordShow] = React.useState(false);
  const logoMode = useColorModeValue(LogoLightMode, logoDarkMode);
  const bgImage = useColorModeValue(BgLight, BgDark);
  const InputBg = useColorModeValue('whiteAlpha.500', 'blackAlpha.400');
  const [apiLoading, setApiLoading] = React.useState(false);

  const Alerts = props => {
    const status = props.status || 'error';
    if (props.alertErrors) {
      return props.alertErrors.map((error, idx) => {
        return (
          <Alert key={idx} status={status}>
            <AlertIcon />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        );
      });
    }
  };

  async function Submit(e) {
    e.preventDefault();
    let values = JSON.parse(JSON.stringify(fieldsValue));
    if (ValidateInputs(values)) {
      setApiLoading(true);
      try {
        await api.post(constants.APISIGNUP, values);
        setApiLoading(false);
        navigate('/login', {
          state: {
            message:
              'Please check your email before logging in for the first time',
          },
        });
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
          setAlertErrors([
            'Unable to sumit your request. Please try again later.',
          ]);
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
    if (values['password'] !== values['password2']) {
      noErrors = false;
      errors['password'] = "Passwords don't match";
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

  function handleRadioChange(value) {
    let newValues = JSON.parse(JSON.stringify(fieldsValue));
    newValues.country = value;
    setFieldsValue(newValues);
  }

  return (
    <Center
      w={'full'}
      h={'full'}
      backgroundImage={bgImage}
      backgroundRepeat={'no-repeat'}
      backgroundPosition={'center'}
      backgroundSize={'contain'}
    >
      <VStack pacing={4} maxW={'450px'} p={10} borderRadius={8}>
        <Image
          maxH={['100px', '250px']}
          objectFit="contain"
          src={logoMode}
          alt="Directors Cut Logo"
          alignSelf={'flex-start'}
          mb={8}
        />
        <Alerts alertErrors={alertErrors} />
        <form onSubmit={Submit} style={{ width: '100%' }}>
          <FormControl isInvalid={fieldsError.email !== ''}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              bg={InputBg}
              value={fieldsValue.email}
              onChange={handleInputChange}
            />
            {fieldsError.email !== '' && (
              <FormErrorMessage>{fieldsError.email}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={fieldsError.name !== ''}>
            <FormLabel>Full name</FormLabel>
            <Input
              name="name"
              bg={InputBg}
              value={fieldsValue.name}
              onChange={handleInputChange}
            />
            {fieldsError.name !== '' && (
              <FormErrorMessage>{fieldsError.name}</FormErrorMessage>
            )}
          </FormControl>
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
          <RadioGroup
            value={fieldsValue.country}
            name="country"
            onChange={handleRadioChange}
          >
            <HStack spacing={5} direction="row">
              <Radio value="BR">Brazil</Radio>
              <Radio value="US">United Stated</Radio>
            </HStack>
          </RadioGroup>
          <HStack py={4}>
            <ButtonStd
              size={'md'}
              type="submit"
              label="Signup"
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
      </VStack>
    </Center>
  );
};
