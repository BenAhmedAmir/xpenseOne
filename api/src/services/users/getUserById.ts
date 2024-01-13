import { FirebaseUser } from "../../models/user";
import userRepository from "../../repositories/userRepository";

export default async (userId: string): Promise<FirebaseUser | null | undefined> => {
  const user = await userRepository.getUserById(userId);
  return user;
};
