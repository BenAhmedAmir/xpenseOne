import auth0Service from '../utils/Auth0Service';
import {plainToClass} from "class-transformer";
import User from '../../models/user';

const removeItemFromArray = (item: any, array: any[]) => {
    const index = array.indexOf(item);
    if (index > -1) {
        array.splice(index, 1);
    }
    return array;
}
export default async (userId: string, orgId: string) => {
    const user = plainToClass(
        User,
        await auth0Service.getUser(userId),
        { strategy: "excludeAll" })
    let organizations = user.organizations();
    if(!organizations || (organizations && organizations?.length == 0))
        return;
    organizations = removeItemFromArray(orgId, organizations);
    await auth0Service.updateUser(userId, { user_metadata: { organizations }});
}