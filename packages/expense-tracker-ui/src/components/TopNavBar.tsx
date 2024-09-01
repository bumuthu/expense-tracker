import { Box, Button, Flex, Spacer, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { ExpenseCreateModal } from './ExpenseCreateModal';

export const TopNavBar = () => {
    const [createModalOpened, setCreateModalOpened] = useState<boolean>(false);

    return (
        <Box boxShadow={"lg"} px="20%" py="4">
            <Flex align="center">
                <Text fontSize="xl" fontWeight="bold">
                    Expense Tracker
                </Text>
                <Spacer />
                <Button colorScheme="teal" size={"sm"} px="10" onClick={() => setCreateModalOpened(true)}>
                    New Expense
                </Button>
            </Flex>
            <ExpenseCreateModal isOpen={createModalOpened} setOpen={(v: boolean) => setCreateModalOpened(v)}/>
        </Box>
    );
}