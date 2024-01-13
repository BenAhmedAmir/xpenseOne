import { AutoMap } from "@nartc/automapper";

export class SheetDTO {
    @AutoMap()
    id?: string;
    @AutoMap()
    label?: string;
    @AutoMap()
    @AutoMap()
    status?: "new" | "pending" | "approved" | "declined";
    @AutoMap()
    creationDate?: Date;
    @AutoMap()
    submittedOn?: Date;
    @AutoMap()
    exported?: boolean;
    @AutoMap()
    total?: number;
}
