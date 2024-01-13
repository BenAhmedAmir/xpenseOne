import groupRepository from '../../repositories/groupRepository';

export default async (groupId: string, expenseTypes : string[]) => {
   await groupRepository.edit(groupId, {expenseTypes})
}