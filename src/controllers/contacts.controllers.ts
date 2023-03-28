import { updateContactService } from "./../services/contacts/updateContact.service";
import { createContactService } from "./../services/contacts/createContact.service";
import { IContactRequest } from "./../interfaces/contact.interfaces";
import { Request, Response } from "express";
import { deleteContactService } from "../services/contacts/deleteContact.service";

export const createContactController = async (req: Request, res: Response) => {
  const contactData: IContactRequest = req.body;
  let userToken: string = req.headers.authorization;
  userToken = userToken.split(" ")[1];
  const createdContact = await createContactService(contactData, userToken);
  return res.status(201).json(createdContact);
};

export const updateContactController = async (req: Request, res: Response) => {
  const contactData: IContactRequest = req.body;
  const contactId: string = req.params.id;
  const updatedContact = await updateContactService(contactId, contactData);
  return res.status(200).json(updatedContact);
};

export const deleteContactController = async (req: Request, res: Response) => {
  const contactId: string = req.params.id;
  await deleteContactService(contactId);
  return res.status(204).json();
};
