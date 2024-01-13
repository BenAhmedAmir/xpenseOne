import httpClient from '../../utils/httpClient';
import ExpenseType from '../../models/expenseType';

const getExpenseTypes = (accessToken: string, orgId: string, serverConfig: {BACKEND_API_BASE_URL: string}) => {
    try {
        return httpClient.get<ExpenseType[]>({
            url: `${serverConfig.BACKEND_API_BASE_URL}/org/${orgId}/exp-types`,
            accessToken
        });
    }catch (e) {
        console.error(e);
        throw e;
    }
}

const getExpenseType = (accessToken: string, orgId: string, expenseTypeId: string, serverConfig: { BACKEND_API_BASE_URL: string }) => {
    try {
        return httpClient.get<ExpenseType>({
            url: `${serverConfig.BACKEND_API_BASE_URL}/org/${orgId}/exp-types/${expenseTypeId}`,
            accessToken
        });
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export {
    getExpenseType,
    getExpenseTypes
}