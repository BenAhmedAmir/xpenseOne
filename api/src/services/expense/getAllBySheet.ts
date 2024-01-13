import Expense from '../../models/expense';
import expenseRepository from '../../repositories/expenseRepository';
import sheetRepository from '../../repositories/sheetRepository';

export default async (sheetId: string): Promise<Expense[]> => {
    let expenses = await expenseRepository.getAllBySheet(sheetId);
    if (expenses.length > 0) {
        const sheet = await sheetRepository.getById(sheetId);
        expenses.map(expense => {
            expense.orgId = sheet?.orgId
            return expense
        });
    }
    return expenses;
}
