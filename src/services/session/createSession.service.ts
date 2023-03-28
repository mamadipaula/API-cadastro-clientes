import { AppError } from "../../errors";
import { User } from "./../../entities/user.entity";
import AppDataSource from "../../data-source";
import { IUserLogin } from "./../../interfaces/user.interfaces";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

export const createSessionService = async (userData: IUserLogin) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    email: userData.email,
  });

  if (!user) {
    throw new AppError("Wrong email/password.", 403);
  }

  const matchPassword = await compare(userData.password, user.password);

  if (!matchPassword) {
    throw new AppError("Wrong email/password.", 403);
  }

  const token = jwt.sign({ email: userData.email }, process.env.SECRET_KEY, {
    expiresIn: "24h",
    subject: user.id,
  });

  return {
    token: token,
    id: user.id,
  };
};


