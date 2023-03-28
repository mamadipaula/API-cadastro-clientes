import "express-async-errors";
import express from "express";
import "reflect-metadata";
import { handleErrors } from "./errors";
import { sessionRoutes } from "./routes/session.routes";
import { userRoutes } from "./routes/user.routes";
import { contactsRoutes } from "./routes/contacts.routes";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(
  cors({
    allowedHeaders: [
      "sessionId",
      "Content-Type",
      "Authorization",
      "authorization",
    ],
    origin: ["http://localhost:3000"],
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  })
);

app.use("/users", userRoutes);
app.use("/login", sessionRoutes);
app.use("/contacts", contactsRoutes);

app.use(handleErrors);

export default app;