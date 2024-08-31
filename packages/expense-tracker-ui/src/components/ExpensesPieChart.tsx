import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic'
import { Box } from '@chakra-ui/react';
import { ExpenseType } from "expense-tracker-common";
import { ExpenseColorCode } from "../enums";
import { capitalizeFirstLetter } from "../utils";

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export const ExpensesPieChart = () => {
    const [chartOptions, setChartOptions] = useState({});
    const [chartData, setChartData] = useState<any[]>();


    useEffect(() => {
        setChartData([44, 55, 13, 43, 22]);
        setChartOptions({
            chart: {
                width: 720,
                type: 'pie',
            },
            labels: [
                capitalizeFirstLetter(ExpenseType.ENTERTAINMENT),
                capitalizeFirstLetter(ExpenseType.FOOD),
                capitalizeFirstLetter(ExpenseType.HEALTH),
                capitalizeFirstLetter(ExpenseType.SHOPPING),
                capitalizeFirstLetter(ExpenseType.OTHER)
            ],
            colors: [
                ExpenseColorCode[ExpenseType.ENTERTAINMENT],
                ExpenseColorCode[ExpenseType.FOOD],
                ExpenseColorCode[ExpenseType.HEALTH],
                ExpenseColorCode[ExpenseType.SHOPPING],
                ExpenseColorCode[ExpenseType.OTHER]
            ]
        })
    }, [])

    return (
        <Box width="100%" m={"20px"} p={"5%"} bgColor="white">
            <Chart
                options={chartOptions}
                series={chartData}
                type='pie'
            />
        </Box>
    );
}

export default ExpensesPieChart;