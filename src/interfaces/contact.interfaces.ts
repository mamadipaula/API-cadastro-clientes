import { IUser } from "./user.interfaces";

export interface IContactRequest {
  name: string;
  email: string;
  cellphone: string;
}

export interface IContact extends IContactRequest {
  insertedAt: string;
  user: IUser;
}

export interface IContactUpdate {
  name?: string;
  email?: string;
  cellphone?: string;
}

export interface IContactResponse extends IContactRequest {
  id: string;
  insertedAt: string;
}
