import { Expose } from "class-transformer";

export class Attachment {
    @Expose()
    name?: string;
    @Expose()
    originalName?: string;
}
