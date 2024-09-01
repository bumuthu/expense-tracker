import React, { useState, useEffect } from "react";
import { Box, Flex, Text } from '@chakra-ui/react';
import { useAppContext } from "../context/AppContext";


export const TotalExpensesCard = () => {
    const [total, setTotal] = useState<number>(0);
    const context = useAppContext();

    useEffect(() => {
        calculateTotal()
    }, [context.expenses])

    const calculateTotal = () => {
        let total = 0;
        context.expenses.forEach((expense) => {
            total += expense.amount;
        })
        setTotal(total)
    }

    return (
        <Box width="100%" px="auto" bgColor="white" mb="25px">
            <Text fontSize="lg" fontWeight="bold" p="25px" pb="5px">
                Total Expenses
            </Text>
            <Flex width="100%" >
                <Box width="100%" pb="25px" mx="auto" display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                    <Text fontSize="xl" mt="30px" mr="10px">
                        LKR
                    </Text>
                    <Text fontSize="5xl" fontWeight="bold">
                        {total}.00
                    </Text>
                </Box>
            </Flex>
        </Box>
    );
}

export default TotalExpensesCard;