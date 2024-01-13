import { Mapper } from '@nartc/automapper';
import {JsonController, Get, UseBefore, Param} from 'routing-controllers';
import { ExpenseTypeDTO } from '../DTO/expenseTypeDTO';
import expenseService from '../services/expense-type';
import {authenticate} from "../middlewares/authenticate.middleware";

@JsonController()
@UseBefore(authenticate)
class ExpTypeController {

    @Get('/org/:orgId/exp-types')
    async getExpenseTypes(@Param('orgId') orgId: string) {
        const result = await expenseService.getExpenseTypes(orgId);
        return Mapper.mapArray(result, ExpenseTypeDTO)
    }

    @Get('/org/:orgId/exp-types/:expenseTypeId')
    async getExpenseType(@Param('orgId') orgId: string, @Param('expenseTypeId') expenseTypeId: string) {
        const expenseType = await expenseService.getExpenseTypeById(expenseTypeId);
        return Mapper.map(expenseType, ExpenseTypeDTO);

    }
}

export default ExpTypeController;