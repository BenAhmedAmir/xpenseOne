import { RegisterUserDTO } from "../../DTO/userDTO";
import userRepository from "../../repositories/userRepository";
import createError from "http-errors";
import FirebaseService from "../utils/FirebaseService";

export default async (user: RegisterUserDTO) => {
  try {
    const payload = {
      email: user.email,
      password: user.password,
      displayName: `${user.firstName} ${user.lastName}`,
      photoURL: user.picture,
      phoneNumber: user.phoneNumber
    };
    const result = await FirebaseService.createUser(payload);

    const userC = await userRepository.create(result);
    console.table(userC);
  } catch (error) {
    console.error(error);
    throw createError(400, error.errorInfo.message);
  }
};
