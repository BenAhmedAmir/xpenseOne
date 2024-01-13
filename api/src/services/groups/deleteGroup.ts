import groupRepository from '../../repositories/groupRepository';

export default async (groupId: string, rev: string) => {
    await groupRepository.delete(groupId, rev);
}