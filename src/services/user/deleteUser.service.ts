import { IUser } from "./../../interfaces/user.interfaces";
import { AppError } from "../../errors";
import { User } from "./../../entities/user.entity";
import AppDataSource from "../../data-source";

export const deleteUserService = async (userId: string): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);

  const foundUser = await userRepository.findOneBy({
    id: userId,
  });

  if (!foundUser) {
    throw new AppError("User not found.", 404);
  }

  await userRepository.softDelete(foundUser.id);
};
