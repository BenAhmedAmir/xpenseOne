import httpClient from '../../utils/httpClient';
import OrgConfiguration from '../../models/org';

const getOrgConfig = (accessToken: string, orgId: string, serverConfig: {BACKEND_API_BASE_URL: string})  => {
    try {
        return httpClient.get<OrgConfiguration>({
            url: `${serverConfig.BACKEND_API_BASE_URL}/org/${orgId}`,
            accessToken
        });
    }catch (e) {
        console.error(e);
        throw e;
    }
}

export {
    getOrgConfig
}

