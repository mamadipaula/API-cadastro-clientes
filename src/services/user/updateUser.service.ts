import { AppError } from "../../errors";
import { userWithoutPassword } from "./../../schemas/user.schema";
import { User } from "./../../entities/user.entity";
import AppDataSource from "../../data-source";
import { IUser, IUserUpdate } from "./../../interfaces/user.interfaces";

export const updateUserService = async (
  userData: IUserUpdate,
  userId: string
): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({
    id: userId,
  });

  if (!findUser) {
    throw new AppError("User not found.", 404);
  }

  if (userData.id !== undefined) {
    throw new AppError("The field 'id' can't be updated.", 401);
  }

  const updatedUser = userRepository.create({
    ...findUser,
    ...userData,
  });

  await userRepository.save(updatedUser);

  const updatedUserToShow = await userWithoutPassword.validate(updatedUser, {
    stripUnknown: true,
  });

  return updatedUserToShow;
};