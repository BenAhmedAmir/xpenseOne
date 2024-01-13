import groupRepository from '../../repositories/groupRepository';

export default async (groupId: string) : Promise<boolean> => {
    const group=  await groupRepository.getById(groupId);
    return group != null;
}