import {
  JsonController,
  Get,
  UseBefore,
  Req,
  Param,
  Put,
  Body,
  OnUndefined,
  NotFoundError,
  Post,
  HttpCode,
} from "routing-controllers";
import orgService from "../services/orgs";
import userService from "../services/users";
import sheetService from "../services/sheets";
import { OrgDTO, UpdateOrgDTO } from "../DTO/orgDTO";
import updateOrg from "../services/orgs/updateOrg";
import { Mapper } from "@nartc/automapper";
import { SheetDTO } from "../DTO/sheetDTO";
import { authenticate } from "../middlewares/authenticate.middleware";
import {Request} from "express";

@JsonController()
@UseBefore(authenticate)
class OrgController {

  @Get('/org')
    async getUserOrganization(@Req() request: Request) {
        const userId = request.userId;
        const user = await userService.getUserById(`user:${userId}`);
        const organization = await orgService.getOrgById(user?.orgId!)
        if (organization === null) throw new NotFoundError("Organization not found");
        return Mapper.map(organization, OrgDTO);
    }


  @Get("/org/:orgId")
  async getOrg(@Param("orgId") orgId: string) {
    const org = await orgService.getOrgById(orgId);
    if (org === null) throw new NotFoundError("Organization not found");
    return Mapper.map(org, OrgDTO);
  }

  @Get("/org/:id/sheets")
  async getSheets(
    @Param("id") orgId: string,
    @Req() req: Request) {
    const userId = `user:${req.userId}`;
    const result = await sheetService.getSheets(orgId, userId);
    return Mapper.mapArray(result, SheetDTO);
  }

    @Put('/org/:orgId')
    @OnUndefined(204)
    async updateOrg(@Param('orgId') orgId: string, @Body() organization: UpdateOrgDTO) {
        await updateOrg(orgId, organization)
    }
    @Post('/org')
    @HttpCode(201)
    async create(@Body() createOrgDTO : OrgDTO,@Req() req: Request) {
        const userId = `user:${req.userId}`;
        const organization = await orgService.createOrg({userId,...createOrgDTO});
        return Mapper.map(organization, OrgDTO);
    }

}

export default OrgController;
