import { Box, Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Flex, Heading, IconButton, Menu, MenuButton, MenuItem, MenuList, Tag, TagLabel, Text } from "@chakra-ui/react"
import { ExpensesRestService } from "../services/expenses-rest-service"
import { useState } from "react"
import { useAppContext } from "../context/AppContext"
import { DeleteIcon, EditIcon, HamburgerIcon } from "@chakra-ui/icons"
import { ExpenseModel } from "expense-tracker-common"
import { ExpenseColorCode } from "../enums"
import { capitalizeFirstLetter } from "../utils"
import { ExpenseUpdateModal } from "./ExpenseUpdateModal"

interface IExpenseCardProps {
  expense: ExpenseModel,
}

export const ExpenseCard = (props: IExpenseCardProps) => {
  const todoService = new ExpensesRestService();
  const context = useAppContext()
  const [updateModalOpened, setUpdateModalOpened] = useState<boolean>(false);

  const onDelete = () => {
    todoService.deleteExpense(props.expense._id)
      .then(() => {
        context.fetchExpenses()
      })
      .catch(() => {
        context.setErrorOpened(true)
      })
  }

  return <>
    <Card>
      <Box
        height="5px"
        backgroundColor={ExpenseColorCode[props.expense.type]}
        roundedTop={"md"}
      />
      <CardHeader>
        <Flex justifyContent="space-between" width="100%">
          <Heading size='md'> {props.expense.name}</Heading>
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
              <MenuItem icon={<EditIcon />} onClick={() => setUpdateModalOpened(true)}>
                Edit
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        {props.expense.date && <Text fontSize='xs'>{new Date(props.expense.date).toLocaleDateString()}</Text>}
      </CardHeader>

      <CardFooter>
        <Flex justifyContent="space-between" width="100%">
          <Tag
            size='sm'
            borderRadius='full'
            variant='solid'
            backgroundColor={ExpenseColorCode[props.expense.type]}
          >
            <TagLabel m={1}>{capitalizeFirstLetter(props.expense.type)}</TagLabel>
          </Tag>
          <Text>
            LKR {props.expense.amount}
          </Text>
        </Flex>

      </CardFooter>
    </Card>
    {
      updateModalOpened && <ExpenseUpdateModal isOpen={updateModalOpened} setOpen={(v: boolean) => setUpdateModalOpened(v)} expense={props.expense} />
    }
  </>
}