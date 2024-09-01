import { CloseIcon } from "@chakra-ui/icons";
import { Alert, AlertIcon, AlertTitle, AlertDescription, Box, Button, useDisclosure, CloseButton } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { ApplicationErrorType } from "../enums";
import { useAppContext } from "../context/AppContext";

interface ErrorAlertProps {
  isOpen: boolean,
  setIsOpen: (v: boolean) => void,
  title?: string,
  message?: string,
}

const errorObjects = {
  [ApplicationErrorType.EXPENSE_LIMIT_EXCEEDED]: {
    title: "Expense limit exceeded!",
    description: "You are not able to exceed your expense limit LKR " + (Number(process.env.MAX_MONTHLY_EXPENSES ?? 10000))
  },
  [ApplicationErrorType.INTERNAL_SERVER_ERROR]: {
    title: "Server error!",
    description: "Something went wrong in the server"
  }, 
  [ApplicationErrorType.NONE]: {
    title: "Unexpected error!",
    description: "Unexpected error occured"
  }
}

const ErrorAlert = (props: ErrorAlertProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const context = useAppContext();

  useEffect(() => {
    if (props.isOpen) onOpen()
  }, [props.isOpen])

  const onAlertClose = () => {
    props.setIsOpen(false);
    context.setError(ApplicationErrorType.NONE);
    onClose()
  }

  return (
    <>
      {isOpen && (
        <Alert status='error' zIndex={20} position="fixed" top={0} left={0} width="100%">
          <AlertIcon />
          <AlertTitle>{errorObjects[context.error].title}</AlertTitle>
          <AlertDescription>{errorObjects[context.error].description}</AlertDescription>
          <Button size="xs" onClick={onAlertClose} ml="auto" variant="ghost">
              <CloseIcon/>
            </Button>
        </Alert>
      )}
    </>

  );
};

export default ErrorAlert;