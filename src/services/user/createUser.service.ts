import { userWithoutPassword } from "./../../schemas/user.schema"
import { AppError } from "../../errors"
import { User } from "./../../entities/user.entity"
import { IUserRequest, IUser } from "./../../interfaces/user.interfaces"
import AppDataSource from "../../data-source"

const createUserService = async (
  userData: IUserRequest
): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User)

  const user = await userRepository.findOneBy({
    email: userData.email,
  })

  if (user) {
    throw new AppError("Email already registered.", 400)
  }

  const createdUser = userRepository.create(userData)
  await userRepository.save(createdUser)

  const userResponse = await userWithoutPassword.validate(createdUser, {
    stripUnknown: true,
  })

  return userResponse
}

export default createUserService