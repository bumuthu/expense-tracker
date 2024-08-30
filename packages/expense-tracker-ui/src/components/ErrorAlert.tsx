import { CloseIcon } from "@chakra-ui/icons";
import { Alert, AlertIcon, AlertTitle, AlertDescription, Box, Button, useDisclosure, CloseButton } from "@chakra-ui/react";
import React, { useEffect } from "react";

interface ErrorAlertProps {
  isOpen: boolean,
  setIsOpen: (v: boolean) => void,
  title?: string,
  message?: string,
}

const ErrorAlert = (props: ErrorAlertProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (props.isOpen) onOpen()
  }, [props.isOpen])

  const onAlertClose = () => {
    props.setIsOpen(false);
    onClose()
  }

  return (
    <>
      {isOpen && (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>Error occured!</AlertTitle>
          <AlertDescription>Something went wrong in the server.</AlertDescription>
          <Button size="xs" onClick={onAlertClose} ml="auto" variant="ghost">
              <CloseIcon/>
            </Button>
        </Alert>
      )}
    </>

  );
};

export default ErrorAlert;