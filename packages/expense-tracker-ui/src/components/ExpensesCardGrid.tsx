import { SimpleGrid } from "@chakra-ui/react"
import { ExpenseCard } from "./ExpenseCard"
import { useEffect } from "react"
import { ExpensesRestService } from "../services/expenses-rest-service"
import { useAppContext } from "../context/AppContext"


export const ExpensesCardGrid = () => {
    const expensesService = new ExpensesRestService();
    const context = useAppContext()

    useEffect(() => {
        expensesService.getExpenses().then(expenses => {
            context.setExpenses(expenses)
        }).catch(err => {
            context.setErrorOpened(true)
        })
    }, [])

    return <SimpleGrid mx={"20px"} spacing={4} templateColumns='repeat(auto-fill, minmax(250px, 1fr))'>
        {
            context.expenses && context.expenses.map((expenses) => <ExpenseCard key={expenses._id} expenses={expenses} />)
        }
    </SimpleGrid>
}