import { userSchema, userUpdateSchema } from "./../schemas/user.schema";
import { ensureDataIsValid } from "./../middlewares/ensureDataIsValid.middleware";
import { ensureAuthMiddleware } from "./../middlewares/ensureAuth.middleware";
import {
  createUserController,
  deleteUserController,
  retrieveUserController,
  updateUserController,
} from "./../controllers/user.controllers";
import { Router } from "express";

export const userRoutes = Router();

userRoutes.post("", ensureDataIsValid(userSchema), createUserController);
userRoutes.get("/:id", ensureAuthMiddleware, retrieveUserController);
userRoutes.patch(
  "/:id",
  ensureDataIsValid(userUpdateSchema),
  ensureAuthMiddleware,
  updateUserController
);

userRoutes.delete(
  "/:id",
  ensureAuthMiddleware,
  deleteUserController
);
