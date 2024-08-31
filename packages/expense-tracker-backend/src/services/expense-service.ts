import { ExpenseModel } from "expense-tracker-common";
import { EntityService } from "./entity.service";
import ExpenseDBModel, { ExpenseDocument } from "../models/expense.model";

export class ExpenseService extends EntityService<ExpenseModel, ExpenseDocument> {
    constructor() {
        super(ExpenseDBModel);
    }
}