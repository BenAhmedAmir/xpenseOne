import ExpenseType from '../../models/expenseType';
import expenseTypeRepository from '../../repositories/expenseTypeRepository';

export default async (orgId?: string): Promise<ExpenseType[]> => {
    return await expenseTypeRepository.list(orgId);
}

