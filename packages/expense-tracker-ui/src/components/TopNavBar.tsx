import { Box, Button, Input, InputGroup, InputRightElement, Flex, Spacer } from '@chakra-ui/react';
import { useState } from 'react';
import { ExpenseFormModal } from './ExpenseFormModal';
import { useAppContext } from '../context/AppContext';
import { ExpensesRestService } from '../services/expenses-rest-service';

export const TopNavBar = () => {
    const [taskModalOpened, setTaskModalOpened] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>();
    const context = useAppContext();
    const todoService = new ExpensesRestService();

    const onSearchClicked = () => {
        todoService.getExpenses({ 'title': searchText } ).then(res => {
            context.setExpenses(res)
        }).catch(() => {
            context.setErrorOpened(true)
        })
    }

    return (
        <Box boxShadow={"lg"} px="20%" py="4">
            <Flex align="center">
                <InputGroup maxW="400px" mr="4">
                    <Input placeholder="Search by title here" bg="white" onChange={(e) => setSearchText(e.target.value)} />
                    <InputRightElement width="5rem" >
                        <Button h="1.75rem" size="sm" colorScheme="teal" onClick={onSearchClicked}>
                            Search
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Spacer />
                <Button colorScheme="teal" size={"sm"} px="10" onClick={() => setTaskModalOpened(true)}>
                    Create
                </Button>
            </Flex>
            <ExpenseFormModal isOpen={taskModalOpened} setOpen={(v: boolean) => setTaskModalOpened(v)}/>
        </Box>
    );
}