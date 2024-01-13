import userRepository, {CreateUserProps} from "../../repositories/userRepository";

export default async (id: string, user: CreateUserProps) : Promise<void> => {
    await userRepository.updateUser(id, user);
}
