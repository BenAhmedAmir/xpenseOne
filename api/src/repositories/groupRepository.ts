import {CouchDbRepository} from './couchDbRepository';
import {classToPlain, plainToClass} from 'class-transformer';
import Group from '../models/group';
import getUUID from '../services/utils/getUUID';

export interface CreateGroupProps {
    name?: string;
    orgId?: string;
    members?: string[];
    expenseTypes?: string[];
}
class GroupRepository extends CouchDbRepository {
    private designName: string = 'grp'
    constructor() {
        super()
    }
    public async create(group : CreateGroupProps) : Promise<Group>{
        const uuid = await getUUID();
        const id =  `grp:${uuid[0]}`;
        const newGroup : Group = {...group, id, expenseTypes: [], members: []};
        await this.db.atomic(this.designName, 'upsert', id, classToPlain(newGroup))
        return plainToClass(Group, newGroup);
    }

    public async getGroups(orgId: string) : Promise<Group[]> {
        const result = await this.db.view<Group>(this.designName, 'all', {
            key: orgId
        });
        return plainToClass(Group, result.rows.map(({value}) => value));
    }

    public async getById(groupId: string): Promise<Group|null|undefined>{
        try {
            const result = await this.db.get(groupId);
            return plainToClass(Group, result);
        }catch (e) {
            if(e.statusCode === 404){
                return null
            }
            console.error(`Couch DB error ${e}`)
        }

    }

    public async delete(groupId: string, rev: string){
        try {
            await this.db.destroy(groupId, rev);
        } catch (e) {
            if(e.statusCode === 404){
                return null
            }
            console.error(`Couch DB error ${e}`)
        }
    }

    public async edit(id: string, group: CreateGroupProps){
        return await this.db.atomic(this.designName, 'upsert', id, group)
    }
}
export default new GroupRepository();
