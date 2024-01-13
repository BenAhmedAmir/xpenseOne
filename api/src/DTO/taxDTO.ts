import { AutoMap } from "@nartc/automapper";

export class TaxDTO {
    @AutoMap()
    id?: string;
    @AutoMap()
    code?: string;
    @AutoMap()
    defaultRate?: number;
    @AutoMap()
    i18n?: any;
}
