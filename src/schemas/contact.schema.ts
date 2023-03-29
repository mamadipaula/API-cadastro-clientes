import {
    IContactRequest,
    IContactResponse,
    IContactUpdate,
  } from "../interfaces/contact.interfaces"
  import * as yup from "yup"
  import { SchemaOf } from "yup"
  
const contactRequest: SchemaOf<IContactRequest> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  cellphone: yup.string().required(),
  })
  
const contactResponse: SchemaOf<IContactResponse> = yup.object().shape({
  id: yup.string(),
  name: yup.string(),
  email: yup.string().email(),
  cellphone: yup.string(),
  insertedAt: yup.string(),
  })
  
const contactUpdate: SchemaOf<IContactUpdate> = yup.object().shape({
  name: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  cellphone: yup.string().notRequired(),
  })

const listContactsSchema = yup.array(contactResponse)

export { contactRequest, contactResponse, contactUpdate, listContactsSchema}