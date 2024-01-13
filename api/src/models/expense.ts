import { AutoMap } from "@nartc/automapper";
import { Expose } from "class-transformer";
import { Attachment } from "./attachment";

export class ExpenseBase {
    @AutoMap()
    @Expose()
    sheetId?: string;
    @AutoMap()
    @Expose()
    type?: string;
    @AutoMap()
    @Expose()
    source?: string;
    @AutoMap()
    @Expose()
    date?: Date;
}

export default class Expense extends ExpenseBase {
    @AutoMap()
    @Expose({ name: '_id' })
    id?: string;
    @AutoMap()
    orgId?: string;
    @AutoMap()
    @Expose()
    amount?: any;
    @AutoMap()
    @Expose()
    attachments?: Attachment[];
    @AutoMap()
    @Expose()
    comments?: any;
    @Expose({name: '_rev'})
    rev?: string;
}

export class UpsertExpense extends ExpenseBase {
    @AutoMap()
    @Expose()
    amount?: number;
    @AutoMap()
    @Expose()
    currency?: string;
    @AutoMap()
    @Expose()
    tax?: string;
    @AutoMap()
    @Expose()
    taxAmount?: number;
}
