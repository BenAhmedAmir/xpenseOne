import {Expose, Type} from 'class-transformer';
import {AutoMap} from '@nartc/automapper';

export class Contact {
    @AutoMap()
    @Expose()
    name?: string;
    @AutoMap()
    @Expose()
    phone?: string;
    @AutoMap()
    @Expose()
    email?: string;
}

export class Organization {
    @AutoMap()
    @Expose({name: '_id'})
    id?: string;
    @AutoMap()
    @Expose()
    userId?: string;
    @AutoMap()
    @Expose()
    name?: string;
    @AutoMap()
    @Expose()
    status?: string;
    @AutoMap()
    @Expose()
    @Type(() => Contact)
    contact?: Contact
    @Expose({name: '_rev'})
    rev?: string;
}
export default Organization;
