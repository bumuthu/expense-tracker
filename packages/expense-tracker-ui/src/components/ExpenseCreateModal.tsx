import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { ExpensesRestService } from "../services/expenses-rest-service";
import { useAppContext } from "../context/AppContext";
import { ExpenseModel, ExpenseType } from "expense-tracker-common";
import DatePicker from "react-datepicker";
import { limitExceeded } from "../utils";
import { ApplicationErrorType } from "../enums";

interface ExpenseCreateModalProps {
    isOpen: boolean;
    setOpen: (open: boolean) => void;
}

export const ExpenseCreateModal = (props: ExpenseCreateModalProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [name, setName] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [expenseType, setExpenseType] = useState<ExpenseType>(ExpenseType.OTHER);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
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
        setName("")
        setAmount(0)
        setExpenseType(ExpenseType.OTHER)
        setSelectedDate(null)

        props.setOpen(false)
        onClose()
    }

    const createExpense = () => {
        setSubmitLoading(true)
        setIsSubmitted(true);
        if (name.trim() === "" || amount == 0 || selectedDate == null) {
            setSubmitLoading(false)
            return;
        }
        if (limitExceeded(context.totalExpenses + amount)) {
            context.setErrorOpened(true)
            context.setError(ApplicationErrorType.EXPENSE_LIMIT_EXCEEDED)
            setSubmitLoading(false)
            onCloseModal();
            return;
        }
        todoService.createExpense({ name, amount, type: expenseType, date: selectedDate?.getTime() } as ExpenseModel)
            .then(res => {
                context.fetchExpenses().then(() => {
                    console.log("Expense created:", res);
                    setSubmitLoading(false)
                    onCloseModal();
                })
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
                    <ModalHeader >Add New Expense</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody p={10}>
                        <FormControl isInvalid={isSubmitted && name.trim() === ""}>
                            <FormLabel>Title <span style={{ color: "red" }}>*</span></FormLabel>
                            <Input ref={initialRef} placeholder='Title'
                                value={name} onChange={(e) => setName(e.target.value)} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Expense Type <span style={{ color: "red" }}>*</span></FormLabel>
                            <Select size='md' value={expenseType}
                                onChange={(e) => setExpenseType(e.target.value as ExpenseType)} >
                                <option value={ExpenseType.FOOD}>Food</option>
                                <option value={ExpenseType.TRANSPORT}>Transport</option>
                                <option value={ExpenseType.SHOPPING}>Shopping</option>
                                <option value={ExpenseType.HEALTH}>Health</option>
                                <option value={ExpenseType.ENTERTAINMENT}>Entertainment</option>
                                <option value={ExpenseType.OTHER}>Other</option>
                            </Select>
                        </FormControl>

                        <FormControl mt={4} isInvalid={isSubmitted && amount == 0}>
                            <FormLabel>Amount (LKR) <span style={{ color: "red" }}>*</span></FormLabel>
                            <Input placeholder='Amount' value={amount}
                                onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : 0)} />
                        </FormControl>

                        <FormControl mt={4} isInvalid={isSubmitted && selectedDate == null}>
                            <FormLabel>Date <span style={{ color: "red" }}>*</span></FormLabel>
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                customInput={<Input />}
                                dateFormat="MM/dd/yyyy"
                                placeholderText="Select Date"
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter p={5}>
                        <Button onClick={onCloseModal} mr={3}>Cancel</Button>
                        <Button colorScheme='teal' px={10} onClick={createExpense} isLoading={submitLoading}>
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}