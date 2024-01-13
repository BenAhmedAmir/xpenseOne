import { CouchDbRepository } from './couchDbRepository';
import { Tax } from "../models/tax";
import { plainToClass } from 'class-transformer';

class taxRepository extends CouchDbRepository {
    constructor() {
        super()
    }

    public async list(orgId: string): Promise<Tax[]> {
        let result = await this.db.view<any>('tax', 'list', {
            key: orgId
        })
        return plainToClass(
            Tax,
            result.rows.map(({ value }) => value));
    }
}
export default new taxRepository();