import { IUserLogin } from "../interfaces/user.interfaces";
import { createSessionService } from "../services/session/createSession.service";
import { Request, Response } from "express";

export const createSessionController = async (req: Request, res: Response) => {
  const userData: IUserLogin = req.body;
  const loginData = await createSessionService(userData);
  return res.status(200).json(loginData);
};