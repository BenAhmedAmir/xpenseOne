import {
    BadRequestError,
    Body, BodyParam, Delete,
    Get,
    HttpCode,
    JsonController,
    NotFoundError,
    OnUndefined,
    Param, Patch,
    Post,
    Put,
    UseBefore
} from 'routing-controllers';
import groupService from '../services/groups';
import orgService from '../services/orgs';
import userService from '../services/users';
import expenseTypeService from '../services/expense-type';
import {UpsertGroupDTO, GroupDTO} from '../DTO/groupDTO';
import {Mapper} from '@nartc/automapper';
import {authenticate} from "../middlewares/authenticate.middleware";

@JsonController()
@UseBefore(authenticate)
class GroupController {
    @Post('/org/:orgId/groups')
    @HttpCode(201)
    async create(@Param('orgId') orgId: string, @Body() createGroupDTO: UpsertGroupDTO){
        if(!await orgService.exist(orgId)) {
            throw new NotFoundError('Org Not Found!');
        }
        const group = await groupService.createGroup({orgId, ...createGroupDTO});
        return Mapper.map(group, GroupDTO)
    }
    @Get('/org/:orgId/groups')
    async getGroups(@Param('orgId') orgId: string){
        const groups = await groupService.getGroups(orgId);
        return Mapper.mapArray(groups, GroupDTO);
    }

    @Get('/org/:orgId/groups/:groupId')
    async getGroup(@Param('groupId') groupId: string){
        const group = await groupService.getGroupById(groupId);
        return Mapper.map(group, GroupDTO);
    }

    @Put('/org/:orgId/groups/:groupId')
    @OnUndefined(204)
    async update(@Param('orgId') orgId: string, @Param('groupId') groupId: string, @Body() groupDTO: UpsertGroupDTO){
        if(!await groupService.exist(groupId)){
            throw new NotFoundError('Group not found');
        }
        await groupService.updateGroup(groupId, {orgId, ...groupDTO});
    }

    @Delete('/org/:orgId/groups/:groupId')
    @OnUndefined(204)
    async delete(@Param('groupId') groupId: string) {
        const group = await groupService.getGroupById(groupId)
        if(!group){
            throw new NotFoundError('Group not found');
        }
        await groupService.deleteGroup(groupId, group.rev!);
    }

    @Patch('/org/:orgId/groups/:groupId/members')
    @OnUndefined(204)
    async addUserToGroup(@Param('orgId') orgId: string, @Param('groupId') groupId: string,
                         @BodyParam('userId') userId : string) {
        if(!await groupService.exist(groupId)){
            throw new NotFoundError('Group not found');
        }
        const user = await userService.getUserById(userId);
        if(!user){
            throw new NotFoundError('User not found');
        }
        await groupService.addUserToGroup(groupId, userId);
    }

    @Delete('/org/:orgId/groups/:groupId/members/:userId')
    @OnUndefined(204)
    async removeUserFromGroup(@Param('orgId') orgId: string, @Param('groupId') groupId: string,
                              @Param('userId') userId : string) {
        if(!await groupService.exist(groupId)){
            throw new NotFoundError('Group not found');
        }
        const user = await userService.getUserById(userId);
        if(!user){
            throw new NotFoundError('User not found');
        }
        await groupService.removeUserFromGroup(groupId, userId);
    }
    @Patch('/org/:orgId/groups/:groupId/expense-types')
    @OnUndefined(204)
    async assignExpenseTypesToGroup(@Param('orgId') orgId: string, @Param('groupId') groupId: string,
                                    @BodyParam('expenseTypes') expenseTypes : string[]){

        if(!await groupService.exist(groupId)){
            throw new NotFoundError('Group not found');
        }
        const expTypesByOrg = await expenseTypeService.getExpenseTypes(orgId);
        //Check if all expense types are belongs to the organization
        expenseTypes.forEach(expt => {
            if(!expTypesByOrg.some(t => t.id === expt)){
                throw new BadRequestError(`expense type ${expt} not belongs to ${orgId}`);
            }
        })
        await groupService.assignExpenseTypesToGroup(groupId, expenseTypes);
    }
}

export default GroupController;
