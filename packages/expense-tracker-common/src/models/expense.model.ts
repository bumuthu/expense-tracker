import { EntityModel } from "./entity.model";

export interface ExpenseModel extends EntityModel{
    name: string;
    description?: string;
    amount: number;
    createdAt: string;
}