import { ExpenseType } from "../enums";
import { EntityModel } from "./entity.model";

export interface ExpenseModel extends EntityModel{
    name: string;
    type: ExpenseType,
    amount: number;
    createdAt: string;
}