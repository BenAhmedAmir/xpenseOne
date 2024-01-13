import auth0Service from '../utils/Auth0Service';
import {plainToClass} from 'class-transformer';
import Role from '../../models/role';

const getRole = async (roleId: string) => {
    const role = await auth0Service.getRoleById(roleId);
    return plainToClass(Role, role)
}
export default getRole;