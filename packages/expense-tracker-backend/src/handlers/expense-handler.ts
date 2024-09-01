import { Request, Response, Express } from 'express';
import { ExpenseService } from '../services/expense-service';

export class ExpenseHandler {
    private expenseService: ExpenseService;

    constructor() {
        this.expenseService = new ExpenseService();
    }

    public registerGetExpense(express: Express) {
        express.get('/api/expenses', async (req: Request, res: Response) => {
            console.log("Calling get expense");
            try {
                const { month } = req.query;
                const expenses = await this.expenseService.getAll({ month });
                res.status(200).json(expenses);
            } catch (err) {
                console.error("Failed to get expense:", err)
                res.status(500).json({ message: "Failed to get expenses" });
            }
        });
    };


    public registerCreateExpense(express: Express) {
        express.post('/api/expenses', async (req: Request, res: Response) => {
            console.log("Calling post expense");
            try {
                const { name, type, amount, date } = req.body;
                if (!name || !type || !amount) {
                    return res.status(400).json({ message: "Invalid request" });
                }
                const expenseCreated = await this.expenseService.create({ name, type, amount, date });
                res.status(201).json(expenseCreated);
            } catch (err) {
                console.error("Failed to create expense:", err)
                res.status(500).json({ message: "Failed to create expense" });
            }
        });
    };

    public registerUpdateExpense(express: Express) {
        express.put('/api/expenses/:id', async (req: Request, res: Response) => {
            console.log("Calling put expense, params", req.params);
            try {
                const { id } = req.params;
                const { name, type, amount, date } = req.body;
                if (!id) {
                    return res.status(400).json({ message: "Expense ID in path is required" });
                }
                const expenseUpdated = await this.expenseService.update(id, { name, type, amount, date });
                res.status(200).json(expenseUpdated);
            } catch (err) {
                console.error("Failed to update expense:", err)
                res.status(500).json({ message: "Failed to update expense" });
            }
        });
    };

    public registerDeleteExpense(express: Express) {
        express.delete('/api/expenses/:id', async (req: Request, res: Response) => {
            console.log("Calling delete expense, params", req.params);
            try {
                const { id } = req.params;
                if (!id) {
                    res.status(400).json({ message: "Expense ID in path is required" });
                    return;
                }
                const expenseDeleted = await this.expenseService.delete(id);
                res.status(200).json(expenseDeleted);
            } catch (err) {
                console.error("Failed to delete expense:", err)
                res.status(500).json({ message: "Failed to delete expense" });
            }
        });
    };
}