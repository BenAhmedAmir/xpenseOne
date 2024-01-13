import httpClient from '../utils/httpClient';
import Org from "../models/organization";

const getOrgs = async (accessToken: string, serverConfig: {BACKEND_API_BASE_URL: string}): Promise<Org[]> => {
    console.log(serverConfig)
    try {
        return httpClient.get({
            url: `${serverConfig.BACKEND_API_BASE_URL}/org`,
            accessToken
        });
    } catch (e) {
        console.error(e);
        throw e;
    }
}
export {
    getOrgs
};