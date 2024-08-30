import { Box, Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Flex, Heading, Text } from "@chakra-ui/react"
import { ExpensesRestService } from "../services/expenses-rest-service"
import { useState } from "react"
import { useAppContext } from "../context/AppContext"
import { DeleteIcon } from "@chakra-ui/icons"
import { ExpenseModel } from "expense-tracker-common"

interface IExpenseCardProps {
  expenses: ExpenseModel,
}

export const ExpenseCard = (props: IExpenseCardProps) => {
  const todoService = new ExpensesRestService();
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const context = useAppContext()

  const onClickExpense = () => {
    // setUpdateLoading(true)
    // todoService.updateExpense({ status, id: props.expenses.id } as TaskModel)
    //   .then((res) => {
    //     updateTask(res)
    //     setUpdateLoading(false)
    //   })
    //   .catch(() => {
    //     context.setErrorOpened(true)
    //     setUpdateLoading(false)
    //   })
  }

  const updateTask = (task: ExpenseModel) => {
    const record = context.expenses.find(r => r.id == task.id)
    if (!record) {
      throw new Error("Record not found");
    }
    const index = context.expenses.indexOf(record);
  }

  const onDelete = () => {
    todoService.deleteExpense(props.expenses.id)
      .then(() => {
        context.setExpenses(expenses => expenses.filter(expense => expense.id != props.expenses.id))
      })
      .catch(() => {
        context.setErrorOpened(true)
      })
  }

  return <Card>
    <Box
      height="5px"
      backgroundColor={true ? "green.500" : "purple.500"}
      roundedTop={"md"}
    />
    <CardHeader>
      <Heading size='xs'> #{props.expenses.id}</Heading>
      <Heading size='md'> {props.expenses.name}</Heading>
      <Checkbox size='md' colorScheme='green' disabled={true} isChecked={(true)}>
        {true ? "Todo" : "Done"}
      </Checkbox>
    </CardHeader>
    <CardBody>
      <Text>{props.expenses.description}</Text>
    </CardBody>
    <CardFooter>
      <Flex justifyContent="space-between" width="100%">
        <Button size="sm" onClick={onDelete}>
          <DeleteIcon />
        </Button>
        {
          true ?
            <Button size={"sm"} colorScheme='purple' onClick={() => onClickExpense()} isLoading={updateLoading}>Mark as Done</Button> :
            <Button size={"sm"} colorScheme='green' variant='outline' onClick={() => onClickExpense()} isLoading={updateLoading}>Mark as Todo</Button>
        }
      </Flex>

    </CardFooter>
  </Card>
}