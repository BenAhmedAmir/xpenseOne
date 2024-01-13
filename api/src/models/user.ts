import { Expose, Exclude, Transform, Type } from "class-transformer";
import { AutoMap } from "@nartc/automapper";
class UserMetaData {
  @Expose()
  defaultCurrencyId?: string;
  @Expose()
  preferredLang?: string;
  @Expose()
  phoneNumber?: string;
  @Expose()
  @Transform((value) => value ?? [])
  organizations?: string[];
}
@Exclude()
class User {
  @Expose({ name: "user_id" })
  @AutoMap()
  userId?: string;
  @AutoMap()
  @Expose()
  @AutoMap()
  email?: string;
  @AutoMap()
  @Expose()
  name?: string;
  @AutoMap()
  @Expose()
  nickname?: string;
  @AutoMap()
  @Expose({ name: "given_name" })
  lastName?: string;
  @AutoMap()
  @Expose({ name: "family_name" })
  firstName?: string;
  @AutoMap()
  @Expose()
  picture?: string;
  @Expose({ name: "user_metadata" })
  @Type(() => UserMetaData)
  userMetadata?: any;

  organizations = () => this.userMetadata?.organizations;

  public belongsToOrganization(orgId: string): boolean {
    if (
      !this.userMetadata?.organizations ||
      this.userMetadata?.organizations.length === 0
    )
      return false;
    return this.userMetadata?.organizations.some(
      (org: string) => org === orgId
    );
  }

  static getRolesKey() {
    return `${process.env.AUTH0_RULE_PREFIX_KEY}/roles`;
  }
}
@Exclude()
export class FirebaseUser {
  @AutoMap()
    @Expose()
    uid?: string;
    @AutoMap()
    @Expose()
    displayName?: string;
    @AutoMap()
    @Expose()
    password?: string;
    @AutoMap()
    @Expose()
    firstName?: string;
    @AutoMap()
    @Expose()
    lastName?: string;
    @AutoMap()
    @Expose()
    email?: string;
    @AutoMap()
    @Expose()
    emailVerified?: boolean;
    @AutoMap()
    @Expose()
    photoURL?: string;  
    @AutoMap()
    @Expose()
    phoneNumber?: string;
    @AutoMap()
    @Expose()
    defaultCurrency?: string;  
    @AutoMap()
    @Expose()
    language?: string;  
    @AutoMap()
    @Expose()
    isCompany?: boolean;
    @Expose({name: '_rev'})
    rev?: string;
    @AutoMap()
    @Expose()
    orgId?: string;

  
}

export default User;
