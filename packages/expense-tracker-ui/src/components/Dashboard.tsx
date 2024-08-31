import React, { useContext } from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { useAppContext } from '../context/AppContext';
import ExpensesPieChart from './ExpensesPieChart';
import { ExpensesCardGrid } from './ExpensesCardGrid';

const Dashboard = () => {
  const context = useAppContext();

  return (
    <SimpleGrid templateColumns="1fr 40%" spacing={10} mt={"10px"}>
      <Box mx={"10%"} mt={"100px"}>
        <ExpensesCardGrid />
      </Box>
      <Box bg="gray.50" rounded={'lg'} h="100vh">
        <ExpensesPieChart />
      </Box>
    </SimpleGrid>
  );
}

export default Dashboard;
