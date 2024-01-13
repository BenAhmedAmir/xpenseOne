import Group from '../../models/group';
import groupRepository, {CreateGroupProps} from '../../repositories/groupRepository';

export default async (group: CreateGroupProps) : Promise<Group> => {
    return await groupRepository.create(group);
}
