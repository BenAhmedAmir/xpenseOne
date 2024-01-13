import { AutoMap } from "@nartc/automapper";

export class ExpenseTypeDTO {
    @AutoMap()
    id?: string;
    @AutoMap()
    code?: string;
    @AutoMap()
    type?: string;
    @AutoMap()
    multiplicator?: number;
    i18n?: any;
}
