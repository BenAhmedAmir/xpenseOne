import {
  JsonController,
  Get,
  UseBefore,
  Patch,
  Param,
  BodyParam,
  OnUndefined,
  Post,
  Body,
} from "routing-controllers";
import checkPermissions from "../middlewares/permissions.middleware";
import { AdminPermissions } from "../enums/permissions";
import userService from "../services/users";
import { FirebaseUserDTO, RegisterUserDTO } from "../DTO/userDTO";
import { Mapper } from "@nartc/automapper";
import RoleDTO from "../DTO/roleDTO";

@JsonController()
class UserController {
  //@UseBefore(checkPermissions([AdminPermissions.showUsers], true))
  @Get("/org/:orgId/users")
  async getUsersByOrg(@Param("orgId") orgId: string) {
    const users = await userService.getUsersByOrg(orgId);
    return Mapper.mapArray(users, FirebaseUserDTO);
  }

  @Patch("/users/:userId")
  @OnUndefined(204)
  async updateRole(
    @Param("userId") userId: string,
    @BodyParam("roleId") roleId: string
  ) {
    await userService.changeRole(userId, roleId);
  }

  @Get("/roles")
  async getAllRoles() {
    const roles = await userService.getAllRoles();
    return Mapper.mapArray(roles, RoleDTO);
  }
  @UseBefore(checkPermissions([AdminPermissions.removeUsers], true))
  @Patch("/users/:userId/org/:orgId")
  @OnUndefined(204)
  async removeUserFromCorporation(
    @Param("userId") userId: string,
    @Param("orgId") orgId: string
  ) {
    await userService.removeUserFromCorporation(userId, orgId);
  }
  @Post("/users")
  @OnUndefined(201)
  async createUser(@Body() user: RegisterUserDTO) {
    return await userService.createUser(user);
  }
}

export default UserController;
