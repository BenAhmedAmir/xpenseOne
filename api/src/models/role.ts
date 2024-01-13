import {AutoMap} from '@nartc/automapper';

class Role  {
    @AutoMap()
    id?: string;
    @AutoMap()
    name?: string;
    @AutoMap()
    description?: string;
}
export default Role;