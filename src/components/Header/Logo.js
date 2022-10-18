import React from 'react';
import LogoLightMode from '../../assets/logo.png';
import logoDarkMode from '../../assets/logo_dark_mode.png';
import smallLogo from '../../assets/small_logo.png';
import {
  Box,
  useColorModeValue,
  Image,
  useBreakpointValue,
} from '@chakra-ui/react';

export const Logo = props => {
  const logoMode = useColorModeValue(LogoLightMode, logoDarkMode);
  const logoSize = useBreakpointValue(
    {
      base: smallLogo,
      md: logoMode,
    },
    {
      // Breakpoint to use when mediaqueries cannot be used, such as in server-side rendering
      // (Defaults to 'base')
      fallback: logoMode,
    }
  );
  return (
    <Box>
      <Image
        maxH={['100px', '150px']}
        objectFit="contain"
        src={logoSize}
        alt="Directors Cut Logo"
      />
    </Box>
  );
};
