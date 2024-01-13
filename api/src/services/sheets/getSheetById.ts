import Sheet from "../../models/sheet";
import sheetRepository from "../../repositories/sheetRepository";

export default async (sheetId: string): Promise<Sheet | null | undefined> => {
    return await sheetRepository.getById(sheetId);
}