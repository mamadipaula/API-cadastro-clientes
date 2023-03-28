import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { listContactsSchema } from "../../schemas/contact.schema";



const listAllContactsService = async ()  => {
    const contactRepository = AppDataSource.getRepository(Contact)

    const contacts = await contactRepository.find({
        relations: {
            user: true
        }
    })

    const contactsReturn = await listContactsSchema.validate(contacts, {
        stripUnknown: true
    })

    return contactsReturn

    
}

export default listAllContactsService