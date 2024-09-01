import { Box, Button, Flex, Spacer, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { ExpenseCreateModal } from './ExpenseCreateModal';
import CustomMonthPicker from './CustomMonthPicker';

export const TopNavBar = () => {
    const [createModalOpened, setCreateModalOpened] = useState<boolean>(false);

    return (
        <Box boxShadow={"lg"} px="20%" py="4">
            <Flex align="center">
                <Text fontSize="xl" fontWeight="bold" mr="5px">
                    Expense
                </Text>
                <Text fontSize="xl" fontWeight="bold" mr="50px" color="teal.500">
                    Tracker
                </Text>
                <Box display={{ base: "none", lg: "block" }}>
                    <CustomMonthPicker />
                </Box>
                <Spacer />
                <Button colorScheme="teal" size={"sm"} px="10" onClick={() => setCreateModalOpened(true)}>
                    New Expense
                </Button>
            </Flex>
            <ExpenseCreateModal isOpen={createModalOpened} setOpen={(v: boolean) => setCreateModalOpened(v)} />
        </Box>
    );
}