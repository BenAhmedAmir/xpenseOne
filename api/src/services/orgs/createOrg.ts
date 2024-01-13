import orgRepository, {CreateOrgProps} from "../../repositories/orgRepository";
import Organization from "../../models/org";

export  default async (organization: CreateOrgProps): Promise<Organization> => {

    return  await orgRepository.createOrganization(organization);
}