import React from 'react';

import { ChakraProvider, VStack } from '@chakra-ui/react';
import { Footer } from './components/Footer/Footer';
import { customTheme } from './Theme/CustomTheme';
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  BrowserRouter,
} from 'react-router-dom';
import { DirectorsPage } from './routes/DirectorsPage';
import { LoginPage } from './routes/LoginPage/LoginPage';
import { NotFoundPage } from './routes/NotFoundPage/NotFoundPage';

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <VStack p={5} h={'99vh'} w={'100vw'} margin={'auto'}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DirectorsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </VStack>
    </ChakraProvider>
  );
}

export default App;
