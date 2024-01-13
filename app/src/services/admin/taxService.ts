import httpClient from '../../utils/httpClient';
import Tax from '../../models/tax';

const getTaxes = (accessToken: string, orgId: string, serverConfig: {BACKEND_API_BASE_URL: string})  => {
    try {
        return httpClient.get<Tax[]>({
            url: `${serverConfig.BACKEND_API_BASE_URL}/org/${orgId}/taxes`,
            accessToken
        });
    }catch (e) {
        console.error(e);
        throw e;
    }
}

export {
    getTaxes
}

