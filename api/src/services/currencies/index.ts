import Currency from '../../models/currency';
import currencyRepository from '../../repositories/currencyRepository';

const all = async (currencyCode?: string) : Promise<Currency[]> => {
    return await currencyRepository.list(currencyCode);
}

export {
    all
};