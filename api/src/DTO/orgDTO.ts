import {AutoMap} from '@nartc/automapper';
import {Type} from 'class-transformer';

export class ContactDTO {
  @AutoMap()
  name?: string;
  @AutoMap()
  phone?: string;
  @AutoMap()
  email?: string;
}
export class OrgDTO {
  @AutoMap()
  id?: string;
  @AutoMap()
  userId?: string;
  @AutoMap()
  name?: string;
  @AutoMap()
  status?: string;
  @AutoMap()
  @Type(() => ContactDTO)
  contact?: ContactDTO
}

export class UpdateOrgDTO {
  @AutoMap()
  userId?: string;
  @AutoMap()
  name?: string;
  @AutoMap()
  status?: string;
  @AutoMap()
  @Type(() => ContactDTO)
  contact?: {
    name?: string;
    phone?: string;
    email?: string;
  }
}
