import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { Footer } from './Footer/Footer';
import { DirectorsList } from './DirectorsList/DirectorsList';
import { customTheme } from './Theme/CustomTheme';

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <Box p={5}>
        <DirectorsList />
        <Footer />
      </Box>
    </ChakraProvider>
  );
}

export default App;
