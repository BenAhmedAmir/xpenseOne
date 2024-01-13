import { Mapper } from '@nartc/automapper';
import {
    JsonController,
    Get,
    UseBefore,
    Param,
    NotFoundError,
    Put,
    Body,
    OnUndefined,
    Delete,
    Post,
    HttpCode,
    UploadedFile
} from 'routing-controllers';
import { ExpenseDTO, UpsertExpenseDTO } from '../DTO/expenseDTO';
import { UpsertExpense } from '../models/expense';
import expenseService from '../services/expense';
import sheetService from '../services/sheets';
import fileUploadOptions from "../services/utils/fileUploadOptions";
import attachmentService from "../services/attachment";
import {authenticate} from "../middlewares/authenticate.middleware";

@JsonController()
@UseBefore(authenticate)
class ExpenseController {

    @Get('/sheets/:sheetId/expenses')
    async getExpenses(@Param("sheetId") sheetId: string) {
        const result = await expenseService.getAllBySheet(sheetId);
        return Mapper.mapArray(result, ExpenseDTO)
    }

    @Get('/sheets/:sheetId/expenses/:expenseId')
    async getExpense(@Param("expenseId") expenseId: string) {
        if (!await expenseService.exists(expenseId)) {
            throw new NotFoundError('Expense Not Found!');
        }
        const result = await expenseService.getExpenseById(expenseId);
        return Mapper.map(result, ExpenseDTO)
    }

    @Put('/sheets/:sheetId/expenses/:expenseId')
    @OnUndefined(204)
    async updateExpense(@Param("sheetId") sheetId: string, @Param("expenseId") expenseId: string, @Body() expenseDTO: UpsertExpenseDTO) {
        if (!await expenseService.exists(expenseId)) {
            throw new NotFoundError('Expense Not Found!');
        }
        expenseDTO.sheetId = sheetId;
        const expense = Mapper.map(expenseDTO, UpsertExpense)
        await expenseService.updateExpense(expenseId, expense);
    }
    @Delete('/sheets/:sheetId/expenses/:expenseId')
    @OnUndefined(204)
    async delete(@Param('expenseId') expenseId: string) {
        const expense = await expenseService.getExpenseById(expenseId)
        if (!expense){
            throw new NotFoundError('Expense not found');
        }
        await expenseService.deleteExpense(expenseId, expense.rev!);
    }
    @Post('/sheets/:sheetId/expenses')
    @HttpCode(201)
    async create(@Param('sheetId') sheetId: string, @Body() createExpenseDTO: UpsertExpenseDTO ){
        if(!await sheetService.getSheetById(sheetId)) {
            throw new NotFoundError('sheet not found');
        }
        const expense = await expenseService.createExpense({sheetId, ...createExpenseDTO});
        return Mapper.map(expense, ExpenseDTO);
    }

    @Post("/sheets/:sheetId/expenses/:expenseId/attachment")
    insertAttachment(@Param("expenseId") expenseId: string, @UploadedFile("file", { options: fileUploadOptions}) file: any) {
        return expenseService.getExpenseById(expenseId).then((expense) => {
            if (!expense) {
                throw new NotFoundError("expense not found");
            }
            return expense;
        }).then((expense) => {
            return attachmentService.attachFile(expense, file);
        })
    }

    @Delete("/sheets/:sheetId/expenses/:expenseId/attachment/:originalName")
    @OnUndefined(200)
    async deleteAttachment(
        @Param("expenseId") expenseId: string,
        @Param("originalName") originalName: string
    ) {
        const expense = await expenseService.getExpenseById(expenseId);
        if (!expense) {
            throw new NotFoundError("expense not found");
        }
        await attachmentService.deleteAttachedFile(expense, originalName);
    }
}
    


export default ExpenseController;
