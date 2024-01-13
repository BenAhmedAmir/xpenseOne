import {IsNotEmpty, IsString} from 'class-validator';
import {AutoMap} from '@nartc/automapper';

export class GroupDTO {
    @AutoMap()
    id?: string;
    @AutoMap()
    name?: string;
    @AutoMap()
    members?: string[] = [];
    @AutoMap()
    expenseTypes?: string[] = [];
    @AutoMap()
    orgId?: string;
}

export class UpsertGroupDTO {
    @IsNotEmpty()
    @IsString()
    name: string = '';
}
