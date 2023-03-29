import "express-async-errors"
import express from "express"
import "reflect-metadata"
import { handleErrors } from "./errors"
import { sessionRoutes } from "./routes/session.routes"
import { userRoutes } from "./routes/user.routes"
import { contactsRoutes } from "./routes/contacts.routes"
import swaggerUI from "swagger-ui-express"
import swaggerDocument from "../swagger.json"

const app = express()
app.use(express.json())

app.use("/users", userRoutes)
app.use("/login", sessionRoutes)
app.use("/contacts", contactsRoutes)
app.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use(handleErrors)

export default app