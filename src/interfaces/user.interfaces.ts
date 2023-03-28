import { IContactResponse } from "./contact.interfaces";

export interface IUserRequest {
  name: string;
  email: string;
  cellphone: string;
  password: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  cellphone: string;
  createdAt: Date;
  updatedAt: Date;
  contacts: IContactResponse[];
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdate {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  cellphone?: string;
}

export interface IUserPartial {
  name: string;
  email: string;
  cellphone: string;
}
