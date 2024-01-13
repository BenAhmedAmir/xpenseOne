import httpClient from '../utils/httpClient';
import { Sheet } from "../models/sheet";

const getSheets = (orgId: string, accessToken: string, serverConfig: {BACKEND_API_BASE_URL: string}): Promise<Sheet[]> => {
    try {
        return httpClient.get({
            url: `${serverConfig.BACKEND_API_BASE_URL}/org/${orgId}/sheets`,
            accessToken
        });
    } catch (e) {
        console.error(e);
        throw e;
    }
}
export {
    getSheets
};