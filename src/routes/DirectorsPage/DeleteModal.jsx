import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';

export const DeleteModal = props => {
  const cancelRef = React.useRef();
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      closeOnOverlayClick={!isLoading}
      closeOnEsc={!isLoading}
      onCloseComplete={() => {
        setIsLoading(false);
      }}
      leastDestructiveRef={cancelRef}
      onClose={() => {
        props.closeModal();
      }}
      isOpen={props.deleteDirectorId.id !== undefined}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>
          Delete {props.deleteDirectorId.name}?
        </AlertDialogHeader>
        <AlertDialogBody>
          Are you sure you want to delete {props.deleteDirectorId.name} ?
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button
            borderRadius={4}
            variant={'outline'}
            ref={cancelRef}
            isDisabled={isLoading}
            onClick={() => {
              props.closeModal();
            }}
          >
            Cancel
          </Button>
          <Button
            isLoading={isLoading}
            borderRadius={4}
            color={'white'}
            colorScheme="red"
            bg={'red'}
            ml={3}
            onClick={async e => {
              setIsLoading(true);
              await props.deleteDirectorMethod(props.deleteDirectorId.id);
              props.closeModal();
            }}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
