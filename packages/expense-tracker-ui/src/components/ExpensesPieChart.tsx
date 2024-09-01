import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic'
import { Box, Flex, Text } from '@chakra-ui/react';
import { ExpenseType } from "expense-tracker-common";
import { ExpenseColorCode } from "../enums";
import { capitalizeFirstLetter } from "../utils";
import { useAppContext } from "../context/AppContext";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export const ExpensesPieChart = () => {
    const [chartOptions, setChartOptions] = useState({});
    const [chartData, setChartData] = useState<any[]>();

    const context = useAppContext();

    useEffect(() => {
        setChartData(calculateChartData());
        setChartOptions({
            chart: {
                type: 'pie',
            },
            labels: [
                capitalizeFirstLetter(ExpenseType.ENTERTAINMENT),
                capitalizeFirstLetter(ExpenseType.TRANSPORT),
                capitalizeFirstLetter(ExpenseType.FOOD),
                capitalizeFirstLetter(ExpenseType.HEALTH),
                capitalizeFirstLetter(ExpenseType.SHOPPING),
                capitalizeFirstLetter(ExpenseType.OTHER)
            ],
            colors: [
                ExpenseColorCode[ExpenseType.ENTERTAINMENT],
                ExpenseColorCode[ExpenseType.TRANSPORT],
                ExpenseColorCode[ExpenseType.FOOD],
                ExpenseColorCode[ExpenseType.HEALTH],
                ExpenseColorCode[ExpenseType.SHOPPING],
                ExpenseColorCode[ExpenseType.OTHER]
            ]
        })
    }, [context.expenses])

    const calculateChartData = () => {
        const data = [0, 0, 0, 0, 0, 0];
        context.expenses.forEach((expense) => {
            switch (expense.type) {
                case ExpenseType.ENTERTAINMENT:
                    data[0] += expense.amount;
                    break;
                case ExpenseType.TRANSPORT:
                    data[1] += expense.amount;
                    break;
                case ExpenseType.FOOD:
                    data[2] += expense.amount;
                    break;
                case ExpenseType.HEALTH:
                    data[3] += expense.amount;
                    break;
                case ExpenseType.SHOPPING:
                    data[4] += expense.amount;
                    break;
                case ExpenseType.OTHER:
                    data[5] += expense.amount;
                    break;
            }
        })
        return data;
    }

    return (
        <Box width="100%" px="auto" bgColor="white">
            <Text fontSize="lg" fontWeight="bold" p={"25px"}>
                Expenses by Type
            </Text>
            <Flex width="100%" >
                <Box  width="100%" maxWidth="480px" pb="25px" mx="auto">
                    <Chart
                        options={chartOptions}
                        series={chartData}
                        type='pie'
                    />
                </Box>
            </Flex>
        </Box>
    );
}

export default ExpensesPieChart;