import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic'
import { Box } from '@chakra-ui/react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export const PieChart = () => {
    const [chartOptions, setChartOptions] = useState({});
    const [chartData, setChartData] = useState<any[]>();


    useEffect(() => {
        setChartData([44, 55, 13, 43, 22]);
        setChartOptions({
            chart: {
                width: 720,
                type: 'pie',
            },
            labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E']
        })
    }, [])

    return (
        <Box width="100%" p={"10%"}>
            <Chart
                options={chartOptions}
                series={chartData}
                type='pie'
            />
        </Box>
    );
}

export default PieChart;