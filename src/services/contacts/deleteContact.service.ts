import { Contact } from "../../entities/contact.entity"
import AppDataSource from "../../data-source"

const deleteContactService = async (id: string) => {
  const contactsRepository = AppDataSource.getRepository(Contact)

  const contact = await contactsRepository.findOneBy({
    id: id,
  })

  await contactsRepository.delete(contact.id)
}

export default deleteContactService