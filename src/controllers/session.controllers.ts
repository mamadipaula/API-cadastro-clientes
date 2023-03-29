import { IUserLogin } from "../interfaces/user.interfaces"
import createLoginService from "../services/login/createLogin.service";
import { Request, Response } from "express"

const createLoginController = async (req: Request, res: Response) => {
  const userData: IUserLogin = req.body;
  const loginData = await createLoginService(userData);
  return res.status(200).json(loginData);
}

export { createLoginController }