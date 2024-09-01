import React from "react";
import { Box, Flex, Text } from '@chakra-ui/react';
import { useAppContext } from "../context/AppContext";


export const ExpenseThreasholdNotice = () => {
    const context = useAppContext();

    const threasholdExceeded = () => {
        return context.totalExpenses >= (Number(process.env.MAX_MONTHLY_EXPENSES ?? 10000)) * 0.9;
    }

    return (
        <Box width="100%" px="auto" bgColor="red.200" mb="25px" display={threasholdExceeded() ? "block" : "none"}>
            <Text fontSize="lg" fontWeight="bold" p="25px" pb="5px">
                Monthly Expenses Warning!
            </Text>
            <Flex width="100%" >
                <Box width="100%" pb="25px" mx="auto" display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                    <Text fontSize="md" mx="50px" my="10px">
                        Your monthly expenses have exceeded the 90% threashold. Please be mindfull about your future expenses.
                    </Text>
                </Box>
            </Flex>
        </Box>
    );
}

export default ExpenseThreasholdNotice;