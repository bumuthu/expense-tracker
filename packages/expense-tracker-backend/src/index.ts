import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { ExpenseHandler } from './handlers/expense-handler';
import cors from 'cors';
require('dotenv').config();

const app: Express = express();

app.use(bodyParser.json());
app.use(cors());

const register = new ExpenseHandler();
register.registerGetExpense(app);
register.registerCreateExpense(app);
register.registerUpdateExpense(app);
register.registerDeleteExpense(app);

app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
