import orgRepository from '../../repositories/orgRepository';
import Organization from '../../models/org';
import {plainToClass} from 'class-transformer';

export default async (orgIds: string[]) : Promise<Organization[]>=> {
    return await orgRepository.findByOrgIds(orgIds);
}