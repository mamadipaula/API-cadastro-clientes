import {
    IContactRequest,
    IContactResponse,
    IContactUpdate,
  } from "../interfaces/contact.interfaces";
  import * as yup from "yup";
  import { SchemaOf } from "yup";
  
  export const contactRequest: SchemaOf<IContactRequest> = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    cellphone: yup.string().required(),
  });
  
  export const contactResponse: SchemaOf<IContactResponse> = yup.object().shape({
    id: yup.string(),
    name: yup.string(),
    email: yup.string().email(),
    cellphone: yup.string(),
    insertedAt: yup.string(),
  });
  
  export const contactUpdate: SchemaOf<IContactUpdate> = yup.object().shape({
    name: yup.string().notRequired(),
    email: yup.string().email().notRequired(),
    cellphone: yup.string().notRequired(),
  });

  export const listContactsSchema = yup.array(contactResponse)