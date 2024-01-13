import Expense from '../../models/expense';
import expenseRepository from '../../repositories/expenseRepository';
import sheetRepository from '../../repositories/sheetRepository';

export default async (expenseId: string): Promise<Expense | null | undefined> => {
    const expense = await expenseRepository.getById(expenseId);
    if (expense) {
        const sheet = await sheetRepository.getById(expense.sheetId!);
        expense.orgId = sheet?.orgId;
    }
    return expense;
}
