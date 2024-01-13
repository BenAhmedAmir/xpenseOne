import httpClient from '../../utils/httpClient';
import Role from '../../models/role';

const getRoles = (accessToken: string, serverConfig: {BACKEND_API_BASE_URL: string}) => {
    try {
        return httpClient.get<Role[]>({
            url: `${serverConfig.BACKEND_API_BASE_URL}/roles`,
            accessToken
        });
    }catch (e) {
        console.error(e);
        throw e;
    }
}

export {
    getRoles
}