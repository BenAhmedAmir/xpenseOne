import groupRepository, {CreateGroupProps} from '../../repositories/groupRepository';

export default async (id: string, group: CreateGroupProps) : Promise<void> => {
    await groupRepository.edit(id, group);
}
