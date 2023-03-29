import { contactResponse } from "./../../schemas/contact.schema"
import { AppError } from "../../errors"
import { Contact } from "./../../entities/contact.entity"
import { User } from "./../../entities/user.entity"
import { IContactRequest } from "./../../interfaces/contact.interfaces"
import { decode } from "jsonwebtoken"
import AppDataSource from "../../data-source"

const createContactService = async (
  contactData: IContactRequest,
  token: string
) => {
  const userRepository = AppDataSource.getRepository(User)
  const contatsRepository = AppDataSource.getRepository(Contact)

  const { sub: userId } = decode(token)

  const user = await userRepository.findOneBy({
    id: userId.toString(),
  })

  const foundEmail = await contatsRepository
    .createQueryBuilder("contact")
    .where("contact.user = :user_id", {
      user_id: user.id,
    })
    .andWhere("contact.email = :contact_email", {
      contact_email: contactData.email,
    })
    .getOne()

  const foundCellphone = await contatsRepository
    .createQueryBuilder("contact")
    .where("contact.user = :user_id", {
      user_id: user.id,
    })
    .andWhere("contact.cellphone = :contact_cellphone", {
      contact_cellphone: contactData.cellphone,
    })
    .getOne()

  if (foundEmail) {
    throw new AppError(
      "A contact with this email is already on your contacts list"
    )
  }

  if (foundCellphone) {
    throw new AppError(
      "A contact with this cellphone is already on your contacts list"
    )
  }

  let newContact = contatsRepository.create(contactData)
  newContact.user = user
  newContact = await contatsRepository.save(newContact)

  const newContactToShow = await contactResponse.validate(newContact, {
    stripUnknown: true,
  })

  return newContactToShow
}

export default createContactService