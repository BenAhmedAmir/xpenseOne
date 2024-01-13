import { AutoMap } from "@nartc/automapper";
import { Expose } from "class-transformer";

export class Tax {
    @AutoMap()
    @Expose({ name: '_id' })
    id?: string;
    @AutoMap()
    @Expose()
    code?: string;
    @AutoMap()
    @Expose()
    defaultRate?: number;
    @Expose()
    i18n?: any;
}
