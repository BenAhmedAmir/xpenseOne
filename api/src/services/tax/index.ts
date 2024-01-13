import { Tax } from '../../models/tax';
import taxRepository from '../../repositories/taxRepository';

const all = async (orgId: string): Promise<Tax[]> => {
    return await taxRepository.list(orgId);
}

export {
    all
};