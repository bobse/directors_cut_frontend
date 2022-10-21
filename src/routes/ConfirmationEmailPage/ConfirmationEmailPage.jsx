import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { VStack, Center, Text, Image, Heading } from '@chakra-ui/react';
import SmallLogo from '../../assets/small_logo.png';
import { ButtonStd } from '../../components/ButtonStd/ButtonStd';
import auth from '../../services/auth';

export const ConfirmationEmailPage = props => {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    const uidb64 = queryParams.get('uidb64');
    const isTokenValid = auth.verifyEmail([token, uidb64]);
    isTokenValid
      .then(() => {
        navigate('/login', {
          state: {
            message: 'Email confirmed. You can login now.',
          },
        });
      })
      .catch(error => {
        console.log(error);
        setError(true);
      });
  }, [location, navigate]);

  if (error) {
    return (
      <Center h={'full'} w={'full'}>
        <VStack>
          <Image
            maxH={'100px'}
            objectFit="contain"
            src={SmallLogo}
            alt="Directors Cut Logo"
            mb={4}
          />

          <Heading>Oops! Invalid email token!</Heading>
          <Text>
            A new email confirmation will be sent to you once you try to login
            again.
          </Text>
          <ButtonStd as={RouterLink} to="/" label="Take me to the homepage" />
        </VStack>
      </Center>
    );
  }
};
