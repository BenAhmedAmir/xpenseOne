import {
  Body, Delete,
  HttpCode,
  JsonController,
  NotFoundError, OnUndefined,
  Param,
  Post, UploadedFile,
  UseBefore,
} from "routing-controllers";
import { SheetDTO } from "../DTO/sheetDTO";
import sheetService from "../services/sheets";
import orgService from "../services/orgs";
import { Mapper } from "@nartc/automapper";
import fileUploadOptions from "../services/utils/fileUploadOptions";
import attachmentService from "../services/attachment";
import {authenticate} from "../middlewares/authenticate.middleware";

@JsonController()
@UseBefore(authenticate)
class SheetController {
  @Post("/org/:orgId/sheets")
  @HttpCode(201)
  async create(
    @Param("orgId") orgId: string,
    @Body() createSheetDTO: SheetDTO
  ) {
    if (!(await orgService.getOrgById(orgId))) {
      throw new NotFoundError("Org not found!");
    }
    const sheet = await sheetService.createSheet({ orgId, ...createSheetDTO });
    return Mapper.map(sheet, SheetDTO);
  }

  @Post("/sheets/:sheetId/attachment")
  insertAttachment(@Param("sheetId") sheetId: string, @UploadedFile("file", { options: fileUploadOptions}) file: any) {
    return sheetService.getSheetById(sheetId).then((sheet) => {
      if (!sheet) {
        throw new NotFoundError("sheet not found");
      }
      return sheet;
    }).then((sheet) => {
      return attachmentService.attachFile(sheet, file);
    })
  }

  @Delete("/sheets/:sheetId/attachment/:originalName")
  @OnUndefined(200)
  async deleteAttachment(
      @Param("sheetId") sheetId: string,
      @Param("originalName") originalName: string
  ) {
    const sheet = await sheetService.getSheetById(sheetId);
    if (!sheet) {
      throw new NotFoundError("sheet not found");
    }
    await attachmentService.deleteAttachedFile(sheet, originalName);
  }
}
export default SheetController;
