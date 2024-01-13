import { CouchDbRepository } from './couchDbRepository';
import ExpenseType from "../models/expenseType";
import { plainToClass } from 'class-transformer';

class expenseTypeRepository extends CouchDbRepository {
    constructor() {
        super()
    }

    public async list(orgId?: string): Promise<ExpenseType[]> {
        let result = await this.db.view<any>('expt', 'list', {
            key: orgId
        })
        return plainToClass(
            ExpenseType,
            result.rows.map(({ value }) => value));
    }

    public async getById(expenseTypeId: string): Promise<ExpenseType | null | undefined> {
        try {
            const result = await this.db.get(expenseTypeId);
            return plainToClass(ExpenseType, result);
        } catch (e) {
            if (e.statusCode === 404) {
                return null
            }
            console.error(`Couch DB error ${e}`)
        }
    }

}
export default new expenseTypeRepository();