import {CouchDbRepository} from './couchDbRepository';
import Organization from '../models/org';
import {classToPlain, plainToClass} from 'class-transformer';
import getUUID from "../services/utils/getUUID";

export interface CreateOrgProps {
  id?:string;
  userId?:string;
  name?: string;
  status?:string;
  contact?:any;
}
class OrgRepository extends CouchDbRepository {
  private designName: string = 'org'
  constructor() {
    super()
  }
  public async findByOrgIds(orgIds: string[]): Promise<Organization[]> {
    const result = await this.db.view<Organization>(this.designName, 'find', {
      'keys': orgIds
    })
    return plainToClass(Organization, result.rows.map(({value}) => value));
  }
  public async edit(orgId: string, organization: Organization): Promise<number>{
    return await this.db.atomic(this.designName, 'upsert', orgId, classToPlain(organization))
  }
  public async createOrganization (organization: CreateOrgProps ): Promise<Organization> {
    const uuid = await getUUID();
    const id = `org:${uuid[0]}`;
    const newOrg : Organization = { id, ...organization };
    await this.db.atomic(this.designName, 'upsert', id , classToPlain(newOrg))
    return plainToClass(Organization, newOrg);
  }

  public async getOrgById(orgId: string): Promise<Organization|null|undefined>{
    try {
        const result = await this.db.get(orgId);
        return plainToClass(Organization, result);
    }catch (e) {
        if(e.statusCode === 404){
            return null
        }
        console.error(`Couch DB error ${e}`)
    }

}
}
export default new OrgRepository();
