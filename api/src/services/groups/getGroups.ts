import Group from '../../models/group';
import groupRepository from '../../repositories/groupRepository';

export default async (orgId: string): Promise<Group[]> => {
    return await groupRepository.getGroups(orgId);
}