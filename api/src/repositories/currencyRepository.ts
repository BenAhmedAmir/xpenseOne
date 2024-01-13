import {CouchDbRepository} from './couchDbRepository';
import Currency from "../models/currency";

class currencyRepository extends CouchDbRepository {
    constructor() {
        super()
    }

    public async list(currencyCode?: string): Promise<Currency[]> {
        const result = await this.db.view<Currency>('currency', 'list', { 'key': currencyCode})
        return result.rows.map(({value}) => value)
    }
}
export default new currencyRepository();