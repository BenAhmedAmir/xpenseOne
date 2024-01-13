import { Attachment } from "./attachment";

export class Expense {
    id?: string;
    orgId?: string;
    sheetId?: string;
    type?: string;
    source?: string;
    date?: Date;
    amount?: any;
    attachments?: Attachment[];
}