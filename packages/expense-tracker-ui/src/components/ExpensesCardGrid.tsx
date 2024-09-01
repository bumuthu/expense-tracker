import { Box, Flex, SimpleGrid, Spinner } from "@chakra-ui/react"
import { ExpenseCard } from "./ExpenseCard"
import { useAppContext } from "../context/AppContext"


export const ExpensesCardGrid = () => {
    const context = useAppContext()

    return <>
        {
            context.loading ?
                <Flex justifyContent="center" alignItems="center" h="100%">
                    <Spinner size="lg" />
                </Flex> :
                <SimpleGrid mx={"20px"} spacing={4} templateColumns='repeat(auto-fill, minmax(250px, 1fr))'>
                    {
                        context.expenses && context.expenses.map((expenses) => <ExpenseCard key={expenses._id} expense={expenses} />)
                    }
                </SimpleGrid>
        }
    </>
}