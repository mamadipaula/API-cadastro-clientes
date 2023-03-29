import { AppError } from "../../errors"
import { User } from "./../../entities/user.entity"
import AppDataSource from "../../data-source"

const deleteUserService = async (id: string): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User)

  const user = await userRepository.findOneBy({
    id: id,
  })

  if (!user) {
    throw new AppError("User not found.", 404)
  }

  await userRepository.delete(user.id)
}

export default deleteUserService
