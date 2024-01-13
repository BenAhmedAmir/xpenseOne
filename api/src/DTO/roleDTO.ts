import {AutoMap} from '@nartc/automapper';

class RoleDTO{
    @AutoMap()
    id?: string;
    @AutoMap()
    name?: string;
    @AutoMap()
    description?: string;
}
export default RoleDTO;