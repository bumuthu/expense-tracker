import { ExpenseModel } from 'expense-tracker-common';
import mongoose, { Document, Schema } from 'mongoose';

export interface ExpenseDocument extends Document, ExpenseModel { }

const expenseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["FOOD", "TRANSPORT", "SHOPPING", "HEALTH", "ENTERTAINMENT", "OTHER"],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Number,
        required: true
    }
});

const ExpenseDBModel = mongoose.models['Expense'] || mongoose.model<ExpenseDocument>('Expense', expenseSchema);

export default ExpenseDBModel;
