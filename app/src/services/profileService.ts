import httpClient from '../utils/httpClient';

const getProfile = (accessToken: string, serverConfig: {BACKEND_API_BASE_URL: string}) => {
    try {
        return httpClient.get({
            url: `${serverConfig.BACKEND_API_BASE_URL}/profile`,
            accessToken
        });
    }catch (e) {
        console.error(e);
        throw e;
    }
}

const updateProfile = (accessToken: string, payload: any, serverConfig: {BACKEND_API_BASE_URL: string}) => {
    return httpClient.patch({
        url: `${serverConfig.BACKEND_API_BASE_URL}/profile`,
        accessToken,
        payload
    });
}

export {
    getProfile,
    updateProfile
};