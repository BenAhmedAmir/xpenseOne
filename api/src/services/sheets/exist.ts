import sheetRepository from "../../repositories/sheetRepository";

export default async (sheetId: string) : Promise<boolean> => {
    const sheet = await sheetRepository.getById(sheetId);
    return sheet != null;
}