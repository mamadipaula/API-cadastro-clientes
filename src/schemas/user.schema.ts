import { contactResponse } from "./contact.schema";
import {
  IUser,
  IUserRequest,
  IUserUpdate,
} from "../interfaces/user.interfaces";
import * as yup from "yup";
import { SchemaOf } from "yup";

export const userSchema: SchemaOf<IUserRequest> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  cellphone: yup.string().required(),
});

export const userWithoutPassword: SchemaOf<IUser> = yup.object().shape({
  id: yup.string(),
  name: yup.string(),
  email: yup.string(),
  cellphone: yup.string(),
  createdAt: yup.date(),
  updatedAt: yup.date(),
  contacts: yup.array(contactResponse),
});

export const userUpdateSchema: SchemaOf<IUserUpdate> = yup.object().shape({
  id: yup.string().notRequired(),
  name: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  cellphone: yup.string().notRequired(),
  password: yup.string().notRequired(),
});

export const listUsersSchema = yup.array(userWithoutPassword)