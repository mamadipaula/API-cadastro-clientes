import { contactResponse } from "./../../schemas/contact.schema";
import { Contact } from "./../../entities/contact.entity";
import AppDataSource from "../../data-source";
import { IContactUpdate } from "./../../interfaces/contact.interfaces";

export const updateContactService = async (
  contactId: string,
  contactData: IContactUpdate
) => {
  const contactsRepository = AppDataSource.getRepository(Contact);

  const findContact = await contactsRepository.findOneBy({
    id: contactId,
  });

  let updatedContact = contactsRepository.create({
    ...findContact,
    ...contactData,
  });

  updatedContact = await contactsRepository.save(updatedContact);
  const updatedContactToShow = await contactResponse.validate(updatedContact, {
    stripUnknown: true,
  });

  return updatedContactToShow;
};