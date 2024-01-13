import { classToPlain } from "class-transformer"
import Sheet from "../../models/sheet"
import sheetRepository from "../../repositories/sheetRepository"

export default async (id: string, sheet: Sheet): Promise<void> => {
    await sheetRepository.updateTotalSheet(id, classToPlain(sheet.total))
}
