import AppDataSource from "../../data-source"
import { User } from "../../entities/user.entity"
import { IUser } from "../../interfaces/user.interfaces"
import { listUsersSchema } from "../../schemas/user.schema"


const listAllUsersService = async (): Promise<IUser[]> => {
    const userRepository = AppDataSource.getRepository(User)

    const users = await userRepository.find({
        relations: {
            contacts: true
        }
    })

    const usersReturn = await listUsersSchema.validate(users, {
        stripUnknown: true
    })

    return usersReturn
   
}

export default listAllUsersService