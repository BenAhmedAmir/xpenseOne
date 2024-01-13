import {IsEmail, IsNotEmpty} from 'class-validator';
import {AutoMap} from "@nartc/automapper";

export class UserDTO {
    @AutoMap()
    userId?: string;
    @AutoMap()
    email?: string;
    @AutoMap()
    name?: string;
    @AutoMap()
    nickname?: string;
    @AutoMap()
    lastName?: string;
    @AutoMap()
    firstName?: string;
    @AutoMap()
    picture? : string;
    @AutoMap()
    defaultCurrencyId?: string;
    @AutoMap()
    preferredLang?: string;
    @AutoMap()
    phoneNumber?: string;
    @AutoMap()
    organizations?: string[];
}
export class UpdateUserDTO {
    @IsNotEmpty()
    defaultCurrency?: string;
    @IsNotEmpty()
    @IsEmail()
    email?: string;
    @IsNotEmpty()
    language?: string
    @IsNotEmpty()
    firstName?: string
    @IsNotEmpty()
    lastName?: string
    @IsNotEmpty()
    phoneNumber?: string
}
export class FilterUser {
    @IsNotEmpty()
    orgId?: string;
    page: number = 0;
    //Auth0 limit
    perPage: number = 100;
}
export class RegisterUserDTO {
  email?: string;
  password?: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
  phoneNumber?: string;
  isCompany?: true;
  organizations?: string[];
}
export class FirebaseUserDTO {
    @AutoMap()
    uid?: string;
    @AutoMap()
    displayName?: string;
    @AutoMap()
    firstName?: string;
    @AutoMap()
    lastName?: string;
    @AutoMap()
    email?: string;
    @AutoMap()
    emailVerified?: boolean;
    @AutoMap()
    photoURL?: string;
    @AutoMap()
    phoneNumber?: string;
    @AutoMap()
    defaultCurrency?: string;
    @AutoMap()
    language?: string;
    @AutoMap()
    isCompany?: boolean;
    @AutoMap()
    orgId?: string;
  }
  

