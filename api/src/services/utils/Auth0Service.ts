import {AuthenticationClient, ManagementClient} from 'auth0';

interface UserMetaData {
    supervisor?: string,
    preferredLang?: string,
    defaultCurrencyId?: string
    phoneNumber?: string;
    organizations?: string[];
}
export interface Auth0Profile{
    blocked?: boolean,
    email?: string,
    phone_number?: string,
    user_metadata?: UserMetaData,
    app_metadata?: {},
    given_name?: string,
    family_name?: string,
    name?: string,
    picture?: string, //picture public url
    password?: string,
    username?: string
}

export interface searchQueryProps {
    search_engine: string,
    q: string,
    per_page: number,
    page: number
}
class Auth0Service {

    public async getAccessToken(){
        const { AUTH_MANAGEMENT_CLIENT_DOMAIN, AUTH_MANAGEMENT_CLIENT_ID, AUTH_MANAGEMENT_CLIENT_SECRET} = process.env;
        const authClient =  new AuthenticationClient({
            domain: AUTH_MANAGEMENT_CLIENT_DOMAIN!,
            clientId: AUTH_MANAGEMENT_CLIENT_ID,
            clientSecret: AUTH_MANAGEMENT_CLIENT_SECRET
        });
        return await authClient.clientCredentialsGrant({
            audience: `https://${AUTH_MANAGEMENT_CLIENT_DOMAIN}/api/v2/`
        })
    }

    public async getManagementClient(){
        const { AUTH_MANAGEMENT_CLIENT_DOMAIN } = process.env;
        const { access_token: accessToken } = await this.getAccessToken();
        return new ManagementClient({
            domain: `${AUTH_MANAGEMENT_CLIENT_DOMAIN}`,
            token: accessToken,
            audience: `https://${AUTH_MANAGEMENT_CLIENT_DOMAIN}/api/v2/`
        });
    }

    public async getUsers(props : searchQueryProps){
        const managementClient = await this.getManagementClient();
        try {
            return await managementClient.getUsers(props);
        }
        catch(error) {
            console.error(error);
            throw error;
        }
    }
    public async updateUser(userId: string, profile: Auth0Profile){
        const managementClient = await this.getManagementClient();
        try {
            return await managementClient.updateUser({ id: userId}, profile);
        }
        catch(error) {
            console.error(error);
            throw error;
        }
    }
    public async getUser(userId: string){
        const managementClient = await this.getManagementClient();
        try {
            return await managementClient.getUser({ id: userId});
        }
        catch(error) {
            console.error(error);
            throw error;
        }
    }

    public async getAllRoles(filterName? : string){
        const params = {
            per_page: 100,
            page: 0,
            name_filter: filterName
        }
        const managementClient = await this.getManagementClient();
        try {
            return await managementClient.getRoles(params);
        }
        catch(error) {
            console.error(error);
            throw error;
        }
    }
    public async getRoleById(roleId: string){
        const managementClient = await this.getManagementClient();
        try {
            return await managementClient.getRole({id: roleId});
        }
        catch(error) {
            console.error(error);
            throw error;
        }
    }

    public async getUserRoles(userId: string){
        const managementClient = await this.getManagementClient();
        try {
            return await managementClient.getUserRoles({id: userId});
        }
        catch(error) {
            console.error(error);
            throw error;
        }
    }
    public async assignRolesToUser(userId: string, roleIds: string | string[]){
        const data = {
            "roles" : Array.isArray(roleIds) ? roleIds : [roleIds]
        };
        const managementClient = await this.getManagementClient();
        try {
            return await managementClient.assignRolestoUser({id: userId}, data);
        }
        catch(error) {
            console.error(error);
            throw error;
        }
    }

    public async removeRolesFromUser(userId : string, roleIds: string| string[])
    {
        const data = {
            "roles" : Array.isArray(roleIds) ? roleIds : [roleIds]
        };
        const managementClient = await this.getManagementClient();
        try {
            return await managementClient.removeRolesFromUser({id: userId}, data);
        }
        catch(error) {
            console.error(error);
            throw error;
        }
    }
}
export default new Auth0Service();
