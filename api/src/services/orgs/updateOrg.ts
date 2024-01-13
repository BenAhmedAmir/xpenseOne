import {Organization} from '../../models/org';
import orgRepository from '../../repositories/orgRepository';
import {NotFoundError} from "routing-controllers";

const updateOrg = async(orgId: string, organization : Organization) => {
    const updateOrg = await orgRepository.edit(orgId, organization)
    if(updateOrg === 404)
        throw new NotFoundError(`Org not found.`)
}

export default updateOrg;