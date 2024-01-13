import { AutoMap } from "@nartc/automapper";

export class ExpenseBaseDTO {
    @AutoMap()
    sheetId?: string;
    @AutoMap()
    type?: string;
    @AutoMap()
    source?: string;
    @AutoMap()
    date?: Date;
}

export class ExpenseDTO extends ExpenseBaseDTO {
    @AutoMap()
    id?: string;
    @AutoMap()
    orgId?: string;
    @AutoMap()
    amount?: any;
    @AutoMap()
    attachments?: any;
    @AutoMap()
    comments?: any;
}

export class UpsertExpenseDTO extends ExpenseBaseDTO {
    @AutoMap()
    amount?: number;
    @AutoMap()
    currency?: string;
    @AutoMap()
    tax?: string;
    @AutoMap()
    taxAmount?: number;
    @AutoMap()
    comments?: any;
}
