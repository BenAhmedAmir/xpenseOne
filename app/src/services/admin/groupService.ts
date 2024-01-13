import httpClient from '../../utils/httpClient';
import Group from '../../models/group';

const getGroups = (accessToken: string, orgId: string, serverConfig: {BACKEND_API_BASE_URL: string})  => {
    try {
        return httpClient.get<Group[]>({
            url: `${serverConfig.BACKEND_API_BASE_URL}/org/${orgId}/groups`,
            accessToken
        });
    }catch (e) {
        console.error(e);
        throw e;
    }
}

export {
    getGroups
}

