import userRepository from "../../repositories/userRepository";

export default async (userId: string) : Promise<boolean> => {
    const user=  await userRepository.getUserById(userId);
    return user != null;
}