import "dotenv/config.js"
import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import session from "express-session"
import pathHandler from "./src/middlewares/pathHandler.mid.js"
import errorHandler from "./src/middlewares/errorHandler.mid.js"
import indexRouter from "./src/routers/index.router.js"
import dbConnect from "./src/utils/dbConnect.util.js"

//Server
const server = express()
const port = process.env.PORT
const ready = () => {
    console.log(`Server ready on port: ${port}`)
    dbConnect()
}
server.listen(port, ready)

//Middlewares
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(morgan("dev"))
server.use(cookieParser(process.env.SECRET_KEY))
server.use(session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },
}))

// Routes
server.use(indexRouter)


// Middlewares
server.use(errorHandler)
server.use(pathHandler)


