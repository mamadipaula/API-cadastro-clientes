import updateContactService from "./../services/contacts/updateContact.service"
import createContactService from "./../services/contacts/createContact.service"
import { IContactRequest } from "./../interfaces/contact.interfaces";
import { Request, Response } from "express"
import deleteContactService from "../services/contacts/deleteContact.service"

const createContactController = async (req: Request, res: Response) => {
  const contactData: IContactRequest = req.body
  let token: string = req.headers.authorization
  token = token.split(" ")[1];
  const contact = await createContactService(contactData, token)
  return res.status(201).json(contact)
}

const updateContactController = async (req: Request, res: Response) => {
  const contactData: IContactRequest = req.body
  const id: string = req.params.id
  const contact = await updateContactService(id, contactData)
  return res.status(200).json(contact)
}

const deleteContactController = async (req: Request, res: Response) => {
  const id: string = req.params.id
  await deleteContactService(id)
  return res.status(204).json()
}

export { createContactController, updateContactController, deleteContactController}
