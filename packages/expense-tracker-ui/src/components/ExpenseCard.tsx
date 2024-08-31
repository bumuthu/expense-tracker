import { Box, Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Flex, Heading, IconButton, Menu, MenuButton, MenuItem, MenuList, Tag, TagLabel, Text } from "@chakra-ui/react"
import { ExpensesRestService } from "../services/expenses-rest-service"
import { useState } from "react"
import { useAppContext } from "../context/AppContext"
import { DeleteIcon, EditIcon, HamburgerIcon } from "@chakra-ui/icons"
import { ExpenseModel } from "expense-tracker-common"
import { ExpenseColorCode } from "../enums"
import { capitalizeFirstLetter } from "../utils"

interface IExpenseCardProps {
  expenses: ExpenseModel,
}

export const ExpenseCard = (props: IExpenseCardProps) => {
  const todoService = new ExpensesRestService();
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const context = useAppContext()

  const onUpdateExpense = () => {
    setUpdateLoading(true)
    todoService.updateExpense({ _id: props.expenses._id } as ExpenseModel)
      .then((res) => {
        updateTask(res)
        setUpdateLoading(false)
      })
      .catch(() => {
        context.setErrorOpened(true)
        setUpdateLoading(false)
      })
  }

  const updateTask = (task: ExpenseModel) => {
    const record = context.expenses.find(r => r._id == task._id)
    if (!record) {
      throw new Error("Record not found");
    }
    const index = context.expenses.indexOf(record);
  }

  const onDelete = () => {
    todoService.deleteExpense(props.expenses._id)
      .then(() => {
        context.setExpenses(expenses => expenses.filter(expense => expense._id != props.expenses._id))
      })
      .catch(() => {
        context.setErrorOpened(true)
      })
  }

  return <Card>
    <Box
      height="5px"
      backgroundColor={ExpenseColorCode[props.expenses.type]}
      roundedTop={"md"}
    />
    <CardHeader>
      <Flex justifyContent="space-between" width="100%">
        <Heading size='md'> {props.expenses.name}</Heading>
        <Menu>
          <MenuButton
            as={IconButton}
            size={'sm'}
            aria-label='Options'
            icon={<HamburgerIcon />}
            variant='outline'
          />
          <MenuList>
            <MenuItem icon={<DeleteIcon />} onClick={onDelete}>
              Delete
            </MenuItem>
            <MenuItem icon={<EditIcon />}>
              Edit
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Text fontSize='xs'>{props.expenses.createdAt}</Text>
    </CardHeader>

    <CardFooter>
      <Flex justifyContent="space-between" width="100%">
        <Tag
          size='sm'
          borderRadius='full'
          variant='solid'
          backgroundColor={ExpenseColorCode[props.expenses.type]}
        >
          <TagLabel m={1}>{capitalizeFirstLetter(props.expenses.type)}</TagLabel>
        </Tag>
        <Text>
          LKR {props.expenses.amount}
        </Text>
      </Flex>

    </CardFooter>
  </Card>
}