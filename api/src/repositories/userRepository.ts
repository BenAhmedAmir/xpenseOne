import { classToPlain, plainToClass } from "class-transformer";
import { FirebaseUser } from "../models/user";
import { CouchDbRepository } from "./couchDbRepository";
export interface CreateUserProps {
  defaultCurrency?: string;
  email?: string;
  displayName?: string;
  language?: string
  firstName?: string
  lastName?: string
  phoneNumber?: string

}
class UserRepository extends CouchDbRepository {
  private designName: string = "user";
  constructor() {
    super();
  }
  public async create(user: FirebaseUser): Promise<FirebaseUser> {
    const id = `user:${user.uid}`;
    const i = user.displayName!.indexOf(' ');
    const newUser = {
      id: id,
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      firstName: user.displayName!.slice(0, i).trim(),
      lastName: user.displayName!.slice(i + 1, user.displayName!.length).trim(),
      defaultCurrency: "CAD",
      language: "EN",
      isCompany: true,
      orgId : 'org:paid-active'
    };
    const test = classToPlain(user);

    try {
      const result = await this.db.atomic(this.designName, "upsert", id, newUser, function (error, response) {
          console.log(error, response);
        }
      );
    } catch (e) {
      console.log(e);
    }
    console.table(newUser);
    return plainToClass(FirebaseUser, test);
  }
  
  public async getUserById(userId: string): Promise<FirebaseUser|null|undefined>{
    try {
        const result = await this.db.get(userId);
        return plainToClass(FirebaseUser, result);
    }catch (e) {
        if(e.statusCode === 404){
            return null
        }
        console.error(`Couch DB error ${e}`)
    }
  }
  public async updateUser(id: string, user: CreateUserProps){
    console.table(user);
    return await this.db.atomic(this.designName, 'upsert', id, user)
  }
  public async getUsersByOrg(orgId: string): Promise<FirebaseUser[]> {
    let result = await this.db.view<FirebaseUser>(this.designName, 'list', { key: orgId })
    return plainToClass(
        FirebaseUser,
        result.rows.map(({ value }) => value));
  }
  
}
export default new UserRepository();
