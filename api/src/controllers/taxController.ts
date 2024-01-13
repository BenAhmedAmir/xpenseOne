import { Mapper } from '@nartc/automapper';
import {JsonController, Get, UseBefore, Param} from 'routing-controllers';
import { TaxDTO } from '../DTO/taxDTO';
import { all } from '../services/tax';
import {authenticate} from "../middlewares/authenticate.middleware";

@JsonController()
@UseBefore(authenticate)
class TaxController {

    @Get('/org/:orgId/taxes')
    async getTaxes(@Param('orgId') orgId: string) {
        const result = await all(orgId);
        return Mapper.mapArray(result, TaxDTO)
    }
}

export default TaxController;