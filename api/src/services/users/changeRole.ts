import auth0Service from '../utils/Auth0Service';

const assignRolesToUser = async (userId: string, roleId: string) => {
    const userRoles = await auth0Service.getUserRoles(userId);
    const rolesIDs = userRoles.map(r => r.id!);
    //remove old roles
    if(rolesIDs.length > 0)
        await auth0Service.removeRolesFromUser(userId, rolesIDs)
    //set new role
    await auth0Service.assignRolesToUser(userId, roleId);
}
export default assignRolesToUser;