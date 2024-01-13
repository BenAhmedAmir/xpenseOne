import httpClient from '../utils/httpClient';
import { Expense } from "../models/expense";

const getExpense = (sheetId: string, expenseId: string, accessToken: string,
    serverConfig: { BACKEND_API_BASE_URL: string }): Promise<Expense[]> => {
    try {
        return httpClient.get({
            url: `${serverConfig.BACKEND_API_BASE_URL}/sheets/${sheetId}/expenses/${expenseId}`,
            accessToken
        });
    } catch (e) {
        console.error(e);
        throw e;
    }
}

const getExpenses = (sheetId: string, accessToken: string,
    serverConfig: { BACKEND_API_BASE_URL: string }): Promise<Expense[]> => {
    try {
        return httpClient.get({
            url: `${serverConfig.BACKEND_API_BASE_URL}/sheets/${sheetId}/expenses`,
            accessToken
        });
    } catch (e) {
        console.error(e);
        throw e;
    }
}

const updateExpense = (sheetId: string, expenseId: string, accessToken: string, payload: any,
    serverConfig: { BACKEND_API_BASE_URL: string }) => {
    return httpClient.put({
        url: `${serverConfig.BACKEND_API_BASE_URL}/sheets/${sheetId}/expenses/${expenseId}`,
        accessToken,
        payload
    });
}

export {
    getExpense,
    getExpenses,
    updateExpense
};