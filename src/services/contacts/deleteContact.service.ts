import { Contact } from "../../entities/contact.entity";
import AppDataSource from "../../data-source";

export const deleteContactService = async (contactId: string) => {
  const contactsRepository = AppDataSource.getRepository(Contact);

  const foundContact = await contactsRepository.findOneBy({
    id: contactId,
  });

  await contactsRepository.delete(foundContact.id);
};