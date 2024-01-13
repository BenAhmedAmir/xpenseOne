import expenseRepository from "../../repositories/expenseRepository"

export default async (expenseId: string, rev: string) => {
    await expenseRepository.deleteExpense(expenseId, rev);
}