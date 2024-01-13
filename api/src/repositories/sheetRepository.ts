import { classToPlain, plainToClass } from "class-transformer";
import Sheet from "../models/sheet";
import getUUID from "../services/utils/getUUID";
import { CouchDbRepository } from "./couchDbRepository";
export interface CreateSheetProps {
  orgId?: string;
  label?: string;
  total?: number;
  exported?: boolean;
  type?: string;
}
class SheetRepository extends CouchDbRepository {
  private designName: string = "sheet";
  constructor() {
    super();
  }
  public async find(orgId: string, userId: string): Promise<Sheet[]> {
    const result = await this.db.view<Sheet>("sheet", "list", {
      key: [orgId, userId],
    });
    return plainToClass(
      Sheet,
      result.rows.map(({ value }) => value)
    );
  }
  public async getById(sheetId: string): Promise<Sheet | null | undefined> {
    try {
      const result = await this.db.get(sheetId);
      return plainToClass(Sheet, result);
    } catch (e) {
      if (e.statusCode === 404) {
        return null;
      }
      console.error(`Couch DB error ${e}`);
    }
  }
  public async updateTotalSheet(id: string, sheet: Sheet) {
    return await this.db.atomic(this.designName, "upsert", id, sheet);
  }
  public async create(sheet: CreateSheetProps): Promise<Sheet> {
    const uuid = await getUUID();
    //const prefix = `sheet:${i++}`;
    const id = `sheet:${uuid[0]}`;
    const type = "sheet";
    const newSheet: Sheet = { ...sheet, id, type };
    const result = await this.db.atomic(
      this.designName,
      "upsert",
      id,
      classToPlain(newSheet)
    );
    console.table(result);
    return plainToClass(Sheet, newSheet);
  }
}
export default new SheetRepository();
