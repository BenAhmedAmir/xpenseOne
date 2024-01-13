import { UpsertExpense } from '../../models/expense';
import expenseRepository from '../../repositories/expenseRepository';

export default async (id: string, expense: UpsertExpense): Promise<void> => {
    await expenseRepository.update(id, expense);
}
