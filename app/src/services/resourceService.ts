import httpClient from '../utils/httpClient';
import Currency from "../models/currency";

const getCurrencies = (accessToken: string, serverConfig: {BACKEND_API_BASE_URL: string}) : Promise<Currency[]>=> {
    try {
        return httpClient.get({
            url: `${serverConfig.BACKEND_API_BASE_URL}/currencies`,
            accessToken
        });
    }catch (e) {
        console.error(e);
        throw e;
    }
}
export {
    getCurrencies
};