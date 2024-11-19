import { Router } from "express";
import productsViewRouter from "./products.view.js";
import usersViewRouter from "./users.view.js";


const viewsRouter = Router()

viewsRouter.use("/products", productsViewRouter)
viewsRouter.use("/", usersViewRouter)
// viewsRouter.use("/cookies", cookiesRouter)
// viewsRouter.use("/sessions", sessionsRouter)

export default viewsRouter