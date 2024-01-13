import groupRepository from '../../repositories/groupRepository';

export default async(groupId: string, userId: string) => {
    const group = await groupRepository.getById(groupId);
    if(group && group.members?.some(m => m === userId)){
        const {members} = group;
        const index = members?.indexOf(userId);
        members?.splice(index, 1);
        await groupRepository.edit(groupId, {members});
    }
}