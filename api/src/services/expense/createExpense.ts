import Expense from "../../models/expense";
import expenseRepository, { CreateExpenseProps } from "../../repositories/expenseRepository";

export default async(expense: CreateExpenseProps): Promise<Expense> => {
    return await expenseRepository.createExpense(expense);
}