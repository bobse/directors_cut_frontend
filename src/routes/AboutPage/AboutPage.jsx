import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Box,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { LoginBase } from '../../components/LoginBase/LoginBase';
import { Header } from '../DirectorsPage/Header/Header';

export const AboutPage = props => {
  function DrawerExample() {
    const [number, setNumber] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    return (
      <>
        <Header></Header>
        <Button
          ref={btnRef}
          colorScheme="teal"
          onClick={() =>
            onOpen(() => {
              console.log('test');
            })
          }
        >
          Open
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={() => {
            onClose();
            setNumber(number + 1);
          }}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create your account</DrawerHeader>

            <DrawerBody>{`NUmber: ${number}`}</DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue">Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
  }
  return (
    <LoginBase noLogo={false}>
      <Box>{DrawerExample()}</Box>
    </LoginBase>
  );
};
