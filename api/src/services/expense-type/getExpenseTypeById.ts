import expenseTypeRepository from '../../repositories/expenseTypeRepository';
import ExpenseType from '../../models/expenseType';

export default async (expenseTypeId: string): Promise<ExpenseType | null | undefined> => {
    return await expenseTypeRepository.getById(expenseTypeId);
}