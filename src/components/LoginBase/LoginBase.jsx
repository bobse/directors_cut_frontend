import React from 'react';
import {
  VStack,
  Center,
  Text,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import LogoLightMode from '../../assets/logo.png';
import logoDarkMode from '../../assets/logo_dark_mode.png';
import BgLight from '../../assets/bg_light.png';
import BgDark from '../../assets/bg_dark.png';

export const LoginBase = props => {
  const logoMode = useColorModeValue(LogoLightMode, logoDarkMode);
  const bgImage = useColorModeValue(BgLight, BgDark);
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
        {props.children}
      </VStack>
    </Center>
  );
};
