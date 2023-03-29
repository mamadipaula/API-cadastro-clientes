import { IUserRequest, IUserUpdate } from "../interfaces/user.interfaces"
import createUserService from "../services/user/createUser.service"
import { Request, Response } from "express"
import listUserService from "../services/user/listUser.service"
import updateUserService from "../services/user/updateUser.service"
import deleteUserService from "../services/user/deleteUser.service"

const createUserController = async (req: Request, res: Response) => {
  const userData: IUserRequest = req.body
  const user = await createUserService(userData)
  return res.status(201).json(user)
}

const listUserController = async (req: Request, res: Response) => {
  const id: string = req.params.id
  const user = await listUserService(id)
  return res.status(200).json(user)
}

const updateUserController = async (req: Request, res: Response) => {
  const userData: IUserUpdate = req.body
  const id: string = req.params.id
  const user = await updateUserService(userData, id)
  return res.status(200).json(user)
}

const deleteUserController = async (req: Request, res: Response) => {
  const id: string = req.params.id
  await deleteUserService(id)
  return res.status(204).json()
}

export { createUserController, listUserController, updateUserController, deleteUserController}
