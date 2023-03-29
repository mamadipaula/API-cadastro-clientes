import { AppError } from "../../errors"
import { userWithoutPassword } from "../../schemas/user.schema"
import { User } from "../../entities/user.entity"
import AppDataSource from "../../data-source"

const listUserService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User)

  const user = await userRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      contacts: true,
    },
  })

  if (!user) {
    throw new AppError("User not found", 404)
  }

  const userResponse = await userWithoutPassword.validate(user, {
    stripUnknown: true,
  })

  return userResponse
}

export default listUserService