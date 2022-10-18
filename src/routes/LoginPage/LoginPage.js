import React from 'react';
import {
  VStack,
  Center,
  Text,
  Image,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Link,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import LogoLightMode from '../../assets/logo.png';
import logoDarkMode from '../../assets/logo_dark_mode.png';
import { ButtonStd } from '../../components/ButtonStd/ButtonStd';

export const LoginPage = props => {
  const [input, setInput] = React.useState('');
  const isError = undefined;
  const handleInputChange = e => setInput(e.target.value);
  const logoMode = useColorModeValue(LogoLightMode, logoDarkMode);
  return (
    <Center w={'full'} h={'full'}>
      <VStack maxW={'450px'} p={10} borderRadius={8}>
        <Image
          maxH={['100px', '250px']}
          objectFit="contain"
          src={logoMode}
          alt="Directors Cut Logo"
          alignSelf={'flex-start'}
        />
        <Text fontSize={['md', 'lg']}>
          This is a tool for people that want to follow their directors and find
          out what they are up to: movies currently playing, projects in
          production and more to come.
        </Text>
        <Text fontSize={['md', 'lg']}>
          You let us know what directors you're into and we'll let you know if
          something new comes up.
        </Text>

        <FormControl isInvalid={isError}>
          <FormLabel>Email</FormLabel>
          <Input
            bg={'white'}
            type="email"
            value={input}
            onChange={handleInputChange}
          />
          {isError && <FormErrorMessage>Email is required.</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={isError}>
          <FormLabel>Password</FormLabel>
          <Input
            bg={'white'}
            type="password"
            value={input}
            onChange={handleInputChange}
          />
          {isError && (
            <FormErrorMessage>Password is required.</FormErrorMessage>
          )}
        </FormControl>
        <HStack>
          <ButtonStd size={'md'} label="Login" />
          <ButtonStd size={'md'} label="Signup" />
        </HStack>
        <Link>Forgot password?</Link>
      </VStack>
    </Center>
  );
};
