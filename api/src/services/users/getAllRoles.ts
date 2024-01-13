import auth0Service from '../utils/Auth0Service';
import {plainToClass} from 'class-transformer';
import Role from '../../models/role';

const getAllRoles = async (filterByRoleName?: string) => {
    const roles = await auth0Service.getAllRoles(filterByRoleName);
    return plainToClass(Role, roles)
}
export default getAllRoles;