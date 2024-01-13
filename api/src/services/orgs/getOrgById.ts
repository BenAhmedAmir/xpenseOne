import orgRepository from '../../repositories/orgRepository';
import Organization from '../../models/org';

export default async (orgId: string) : Promise<Organization|null|undefined> => {
  return await orgRepository.getOrgById(orgId);
}