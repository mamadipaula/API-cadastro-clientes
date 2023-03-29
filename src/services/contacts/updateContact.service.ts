import { contactResponse } from "./../../schemas/contact.schema"
import { Contact } from "./../../entities/contact.entity"
import AppDataSource from "../../data-source"
import { IContactUpdate } from "./../../interfaces/contact.interfaces"

const updateContactService = async (
  id: string,
  contactData: IContactUpdate
) => {
  const contactsRepository = AppDataSource.getRepository(Contact);

  const contact = await contactsRepository.findOneBy({
    id: id,
  })

  let updatedContact = contactsRepository.create({
    ...contact,
    ...contactData,
  })

  updatedContact = await contactsRepository.save(updatedContact)
  const updatedContactToShow = await contactResponse.validate(updatedContact, {
    stripUnknown: true,
  })

  return updatedContactToShow
}

export default updateContactService