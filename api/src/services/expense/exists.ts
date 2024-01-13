import expenseRepository from '../../repositories/expenseRepository';

export default async (expenseId: string): Promise<boolean> => {
    const expense = await expenseRepository.getById(expenseId);
    return expense != null;
}