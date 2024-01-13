import Sheet from "../../models/sheet";
import sheetRepository, { CreateSheetProps } from "../../repositories/sheetRepository";
   
 //todo to be completed
export default async (sheet: CreateSheetProps): Promise<Sheet> => {
    return await sheetRepository.create(sheet);
}