import { AutoMapper, mapFrom, ProfileBase } from '@nartc/automapper';
import { ExpenseTypeDTO } from '../DTO/expenseTypeDTO';
import { Tax } from '../models/tax';
import { TaxDTO } from '../DTO/taxDTO';
import { FirebaseUserDTO, UserDTO } from '../DTO/userDTO';
import Expense, { UpsertExpense } from '../models/expense';
import { ExpenseDTO, UpsertExpenseDTO } from '../DTO/expenseDTO';
import ExpenseType from '../models/expenseType';
import User, { FirebaseUser } from '../models/user';
import Role from '../models/role';
import RoleDTO from '../DTO/roleDTO';
import Group from '../models/group';
import { GroupDTO } from '../DTO/groupDTO';
import Sheet from '../models/sheet';
import { SheetDTO } from '../DTO/sheetDTO';
import Organization, {Contact} from '../models/org';
import {ContactDTO, OrgDTO} from '../DTO/orgDTO';

export class AutoMapProfile extends ProfileBase {
    constructor(mapper: AutoMapper) {
        super();
        mapper.createMap(FirebaseUser, FirebaseUserDTO)
        mapper.createMap(User, UserDTO)
            .forMember(d => d.defaultCurrencyId, mapFrom(s=> s.userMetadata.defaultCurrencyId))
            .forMember(d => d.preferredLang, mapFrom(s=> s.userMetadata.preferredLang))
            .forMember(d => d.phoneNumber, mapFrom(s=> s.userMetadata.phoneNumber))
            .forMember(d => d.organizations, mapFrom(s=> s.userMetadata.organizations));
        mapper.createMap(ExpenseType, ExpenseTypeDTO).forMember(d => d.i18n, mapFrom(s => s.i18n));
        mapper.createMap(Role, RoleDTO);
        mapper.createMap(Tax, TaxDTO).forMember(d => d.i18n, mapFrom(s => s.i18n));
        mapper.createMap(Group, GroupDTO);
        mapper.createMap(Expense, ExpenseDTO)
            .forMember(d => d.amount, mapFrom(s => s.amount))
            .forMember(d => d.attachments, mapFrom(s => s.attachments))
            .forMember(d => d.comments, mapFrom(s => s.comments));
        mapper.createMap(UpsertExpenseDTO, UpsertExpense);
        mapper.createMap(Sheet, SheetDTO);
        mapper.createMap(Contact, ContactDTO);
        mapper.createMap(Organization, OrgDTO)
            .forMember(d => d.contact, mapFrom(s => s.contact));
    }
}

export default AutoMapProfile;