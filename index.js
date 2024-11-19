import "dotenv/config.js"
import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import session from "express-session"
// import sessionFileStore from "session-file-store"
import MongoStore from "connect-mongo"
import __dirname from "./src/utils.js"

import handlebars from 'express-handlebars';

import pathHandler from "./src/middlewares/pathHandler.mid.js"
import errorHandler from "./src/middlewares/errorHandler.mid.js"
import indexRouter from "./src/routers/index.router.js"
import dbConnect from "./src/utils/dbConnect.util.js"
import config from "./src/utils/config.js"

//Server
const server = express()
const port = process.env.PORT
const ready = () => {
    console.log(`Server ready on port: ${port}`)
    dbConnect()
}
server.listen(port, ready)

// Handlebars configuration
server.engine('handlebars', handlebars.engine());
server.set('views', __dirname+'/views');
server.set('view engine', 'handlebars');

// paquete de rutas-endpoints estatico
//server.use('/static', express.static(__dirname+'/public'));
server.use('/static', express.static('public'))

//Middlewares
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(morgan("dev"))
server.use(cookieParser(process.env.SECRET_KEY))

server.use(session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({ mongoUrl: process.env.MONGO_LINK, ttl: 60*60*24})
}))

// Routes
server.use(indexRouter)


// Middlewares
server.use(errorHandler)
server.use(pathHandler)


