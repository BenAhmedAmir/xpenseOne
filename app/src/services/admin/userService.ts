import httpClient from '../../utils/httpClient';
import User from '../../models/user';

const getUsers = (accessToken: string, orgId: string, serverConfig: {BACKEND_API_BASE_URL: string}) : Promise<User[]>=> {
    try {
        return httpClient.get<User[]>({
            url: `${serverConfig.BACKEND_API_BASE_URL}/users?orgId=${orgId}`,
            accessToken
        });
    }catch (e) {
        console.error(e);
        throw e;
    }
}

export {
    getUsers
}