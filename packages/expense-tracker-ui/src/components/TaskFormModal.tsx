import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { ExpensesRestService } from "../services/expenses-rest-service";
import { TaskModel } from "expense-tracker-common";
import { useAppContext } from "../context/AppContext";

interface TaskFormModalProps {
    isOpen: boolean;
    setOpen: (open: boolean) => void;
}

export const TaskFormModal = (props: TaskFormModalProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);

    const context = useAppContext()
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const todoService = new ExpensesRestService();

    useEffect(() => {
        if (props.isOpen) onOpen()
    }, [props.isOpen])

    const onCloseModal = () => {
        props.setOpen(false)
        onClose()
    }

    const createTask = () => {
        setSubmitLoading(true)
        setIsSubmitted(true);
        if (title.trim() === "") {
            setSubmitLoading(false)
            return;
        }
        todoService.createExpense({ title, description } as TaskModel)
            .then(res => {
                console.log("Task created:", res);
                context.setTasks(tasks => [...tasks, res])
                setSubmitLoading(false)
                onCloseModal();
                setTitle("")
                setDescription("")
            }).catch(err => {
                context.setErrorOpened(true)
            })
    }

    return (
        <>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onCloseModal}
                size={"xl"}
            >
                <ModalOverlay />
                <ModalContent p={10}>
                    <ModalHeader >Create new task</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody p={10}>
                        <FormControl isInvalid={isSubmitted && title.trim() === ""}>
                            <FormLabel>Title <span style={{ color: "red" }}>*</span></FormLabel> 
                            <Input ref={initialRef} placeholder='Title'
                                value={title} onChange={(e) => setTitle(e.target.value)} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Input placeholder='Description' value={description}
                                onChange={(e) => setDescription(e.target.value)} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter p={5}>
                        <Button onClick={onCloseModal} mr={3}>Cancel</Button>
                        <Button colorScheme='green' px={10} onClick={createTask} isLoading={submitLoading}>
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}