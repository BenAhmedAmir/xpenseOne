import * as admin from "firebase-admin";
class firebaseService {
    public async createUser(user: any) {
        return await admin.auth().createUser(user);
    }
}
export default new firebaseService();
