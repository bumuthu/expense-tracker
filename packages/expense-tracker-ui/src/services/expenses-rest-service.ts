import { ExpenseModel } from "expense-tracker-common";
import { RestClient } from "./rest-client";

export class ExpensesRestService {
    private restClient: RestClient;

    constructor() {
        this.restClient = new RestClient();
    }

    async getExpenses(params?: Record<string, any>): Promise<ExpenseModel[]> {
        return this.restClient.get<ExpenseModel[]>("expenses", params);
    }

    async createExpense(data: ExpenseModel): Promise<ExpenseModel> {
        return this.restClient.post<ExpenseModel>("expenses", data);
    }

    async updateExpense(data: ExpenseModel): Promise<ExpenseModel> {
        return this.restClient.put<ExpenseModel>(`expenses/${data._id}`, data);
    }

    async deleteExpense(expenseId: number): Promise<ExpenseModel> {
        return this.restClient.delete<ExpenseModel>(`expenses/${expenseId}`);
    }
}