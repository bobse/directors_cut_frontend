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
        props.setDeleteModal();
      }}
      isOpen={props.deleteModal !== undefined}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>Delete {props.director?.name}?</AlertDialogHeader>
        <AlertDialogBody>
          Are you sure you want to delete {props.director?.name} ?
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button
            borderRadius={4}
            variant={'outline'}
            ref={cancelRef}
            isDisabled={isLoading}
            onClick={() => {
              props.setDeleteModal();
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
              await props.deleteDirectorMethod();
              props.setDeleteModal();
            }}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
