import React from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import ExpensesPieChart from './ExpensesPieChart';
import { ExpensesCardGrid } from './ExpensesCardGrid';
import TotalExpensesCard from './TotalExpensesCard';

const Dashboard = () => {

  return (
    <SimpleGrid templateColumns={{ base: "1fr", lg: "1fr 40%" }} spacing={10} h="100vh" pt="50px">
      <Box mx={"10%"} mt="100px">
        <ExpensesCardGrid />
      </Box>
      <Box bg="gray.50" px="25px" pt="50px" display={{ base: "none", lg: "block" }} >
        <TotalExpensesCard />
        <ExpensesPieChart />
      </Box>
    </SimpleGrid>
  );
}

export default Dashboard;
