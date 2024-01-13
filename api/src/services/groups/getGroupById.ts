import groupRepository from '../../repositories/groupRepository';
import Group from '../../models/group';

export default async (groupId: string) : Promise<Group|null|undefined> => {
    return await groupRepository.getById(groupId);
}