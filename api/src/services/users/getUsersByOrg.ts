import { FirebaseUser } from "../../models/user";
import userRepository from "../../repositories/userRepository";

export default async (orgId: string): Promise<FirebaseUser[]> => {
  return await userRepository.getUsersByOrg(orgId);
};
