import {Expose, Transform} from 'class-transformer';
import {AutoMap} from '@nartc/automapper';

export class Group {
    @Expose({name: '_id'})
    @AutoMap()
    id?: string;
    @Expose()
    @AutoMap()
    name?: string;
    @Expose()
    @Transform(value => value??[], { toClassOnly: true })
    @AutoMap()
    members?: string[] = [];
    @Expose()
    @Transform(value => value?? [], { toClassOnly: true })
    @AutoMap()
    expenseTypes?: string[] = [];
    @Expose()
    @AutoMap()
    orgId?: string;
    @Expose({name: '_rev'})
    rev?: string;
}

export default Group;