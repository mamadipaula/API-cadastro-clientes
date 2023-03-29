import { AppError } from "../../errors"
import { userWithoutPassword } from "./../../schemas/user.schema"
import { User } from "./../../entities/user.entity"
import AppDataSource from "../../data-source"
import { IUser, IUserUpdate } from "./../../interfaces/user.interfaces"

const updateUserService = async (
  userData: IUserUpdate,
  id: string
): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User)

  const user = await userRepository.findOneBy({
    id: id,
  })

  if (!user) {
    throw new AppError("User not found.", 404)
  }

  if (userData.id !== undefined) {
    throw new AppError("The field 'id' can't be updated.", 401)
  }

  const updatedUser = userRepository.create({
    ...user,
    ...userData,
  })

  await userRepository.save(updatedUser)

  const updatedUserResponse = await userWithoutPassword.validate(updatedUser, {
    stripUnknown: true,
  })

  return updatedUserResponse
}

export default updateUserService