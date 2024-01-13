import sheetRepository from '../../repositories/sheetRepository';

export default async (orgId: string, userId: string) => {
    return await sheetRepository.find(orgId, userId)
}