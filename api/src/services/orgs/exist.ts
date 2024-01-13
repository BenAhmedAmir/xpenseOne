import getOrgById from './getOrgById';

export default async (id: string) : Promise<boolean> => {
  const organization = await getOrgById(id);
  return organization != null;
}