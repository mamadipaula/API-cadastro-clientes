import { contactUpdate } from "./../schemas/contact.schema";
import { ensureAuthMiddleware } from "./../middlewares/ensureAuth.middleware";
import {
  createContactController,
  deleteContactController,
  updateContactController,
} from "./../controllers/contacts.controllers";
import { Router } from "express";
import { ensureDataIsValid } from "../middlewares/ensureDataIsValid.middleware";
import { contactRequest } from "../schemas/contact.schema";

export const contactsRoutes = Router();

contactsRoutes.post(
  "",
  ensureDataIsValid(contactRequest),
  ensureAuthMiddleware,
  createContactController
);
contactsRoutes.patch(
  "/:id",
  ensureDataIsValid(contactUpdate),
  ensureAuthMiddleware,
  updateContactController
);
contactsRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  deleteContactController
);
