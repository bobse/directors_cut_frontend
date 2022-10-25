import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Text,
  Heading,
  VStack,
} from '@chakra-ui/react';
import { ButtonStd } from '../../../components/ButtonStd/ButtonStd';

export const WelcomeModal = props => {
  return (
    <Modal
      isCentered
      closeOnOverlayClick={false}
      isOpen={props.welcomeModal}
      onClose={() => {
        props.setWelcomeModal(false);
      }}
    >
      <ModalOverlay />
      <ModalContent p={4}>
        <ModalHeader ml={-2}>
          <Heading textStyle={'h2'}>Welcome to the app</Heading>
        </ModalHeader>
        <ModalBody>
          <VStack fontSize={'lg'} alignItems={'flex-start'} spacing={4}>
            <Text>
              Hello! Since this is your first time using Director's Cut, we
              wanted to give you a little help :)
            </Text>
            <Text>
              Right now your director's list is empty. Clicking on the "ADD
              DIRECTOR +" button you can search for directors or browse our
              entire catalog.
            </Text>
            <Text>
              As you add directors you will get a glipse of all their new
              projects.
            </Text>
            <Text fontSize={'sm'}>
              *If you can't find your favorite director here, don't worry! You
              can use the tool (at the bottom of the add director tab) to add
              directors directly from IMDB.
            </Text>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <ButtonStd
            label="Let's start now"
            onClick={() => {
              props.setWelcomeModal(false);
              props.setAddDirectorDrawer(true);
            }}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
