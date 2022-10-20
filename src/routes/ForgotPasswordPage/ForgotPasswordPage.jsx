import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  VStack,
  Center,
  Text,
  Image,
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

export const ForgotPasswordPage = props => {
  const navigate = useNavigate();
  const [fieldsValue, setFieldsValue] = React.useState({
    email: '',
  });
  const [fieldsError, setFieldsError] = React.useState({
    email: '',
  });
  const logoMode = useColorModeValue(LogoLightMode, logoDarkMode);
  const bgImage = useColorModeValue(BgLight, BgDark);
  const InputBg = useColorModeValue('whiteAlpha.500', 'blackAlpha.400');

  function Submit() {
    let values = JSON.parse(JSON.stringify(fieldsValue));
    if (ValidateInputs(values)) {
      console.log(fieldsValue);
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

  return (
    <Center
      w={'full'}
      h={'full'}
      backgroundImage={bgImage}
      backgroundRepeat={'no-repeat'}
      backgroundPosition={'center'}
      backgroundSize={'contain'}
    >
      <VStack maxW={'450px'} p={10} borderRadius={8}>
        <Image
          maxH={['100px', '250px']}
          objectFit="contain"
          src={logoMode}
          alt="Directors Cut Logo"
          alignSelf={'flex-start'}
          mb={4}
        />
        <Text fontSize={['md', 'lg']}>
          Please enter your email to reset your password.
        </Text>
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

        <HStack>
          <ButtonStd
            size={'md'}
            label="Reset password"
            onClick={() => {
              Submit();
            }}
          />
          <ButtonStd
            size={'md'}
            label="Cancel"
            onClick={() => {
              navigate('/login');
            }}
          />
        </HStack>
      </VStack>
    </Center>
  );
};
