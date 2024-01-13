import { AutoMap } from "@nartc/automapper";
import { Expose } from "class-transformer";

class ExpenseType {
    @AutoMap()
    @Expose({ name: '_id' })
    id?: string;
    @AutoMap()
    @Expose()
    code?: string;
    @AutoMap()
    @Expose()
    type?: 'money' | 'km';
    @AutoMap()
    @Expose()
    multiplicator?: number;
    @Expose()
    i18n?: any;
    @Expose()
    status?: 'active' | 'archived';
    @Expose()
    orgId?: string;
}

export default ExpenseType;