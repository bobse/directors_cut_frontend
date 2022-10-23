import { React } from 'react';
import '@fontsource/oswald/400.css';
import '@fontsource/oswald/700.css';
import '@fontsource/lato/400.css';
import '@fontsource/lato/700.css';
import { ChakraProvider, VStack } from '@chakra-ui/react';
import { Footer } from './components/Footer/Footer';
import { customTheme } from './Theme/CustomTheme';
import {
  Routes,
  Route,
  BrowserRouter,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { DirectorsPage } from './routes/DirectorsPage';
import { LoginPage } from './routes/LoginPage/LoginPage';
import { NotFoundPage } from './routes/NotFoundPage/NotFoundPage';
import { SignUpPage } from './routes/SignUpPage/SignUpPage';
import { ForgotPasswordPage } from './routes/ForgotPasswordPage/ForgotPasswordPage';
import { NewPasswordPage } from './routes/NewPasswordPage/NewPasswordPage';
import { ConfirmationEmailPage } from './routes/ConfirmationEmailPage/ConfirmationEmailPage';
import { AboutPage } from './routes/AboutPage/AboutPage';
import auth from './services/auth';

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <VStack p={5} h={'99vh'} w={'100vw'}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <DirectorsPage />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route
              path="/emailconfirmation"
              element={<ConfirmationEmailPage />}
            />
            <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
            <Route path="/newpassword" element={<NewPasswordPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </VStack>
    </ChakraProvider>
  );
}

function RequireAuth({ children }) {
  let location = useLocation();
  auth.silentAuth();
  if (auth.isAuthenticated()) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
}

export default App;
