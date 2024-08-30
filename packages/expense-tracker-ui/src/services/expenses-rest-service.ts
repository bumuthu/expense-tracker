import { ExpenseModel } from "expense-tracker-common";
import { RestClient } from "./rest-client";
import { expenses } from "../../data/data";

export class ExpensesRestService {
    private restClient: RestClient;

    constructor() {
        this.restClient = new RestClient();
    }

    async getExpenses(params?: Record<string, any>): Promise<ExpenseModel[]> {
        // return this.restClient.get<ExpenseModel[]>("expenses", params);
        return expenses;
    }

    async createExpense(data: ExpenseModel): Promise<ExpenseModel> {
        return this.restClient.post<ExpenseModel>("expenses", data);
    }

    async updateExpense(data: ExpenseModel): Promise<ExpenseModel> {
        return this.restClient.put<ExpenseModel>(`expenses/${data.id}`, data);
    }

    async deleteExpense(expenseId: number): Promise<ExpenseModel> {
        return this.restClient.delete<ExpenseModel>(`expenses/${expenseId}`);
    }
}