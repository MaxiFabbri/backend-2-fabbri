import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import __dirname from "./src/utils.js"
import handlebars from 'express-handlebars';
import pathHandler from "./src/middlewares/pathHandler.mid.js"
import errorHandler from "./src/middlewares/errorHandler.mid.js"
import indexRouter from "./src/routers/index.router.js"
import dbConnect from "./src/utils/dbConnect.util.js"
import argsUtil from "./src/utils/args.util.js"
import envUtil from "./src/utils/env.util.js"
//import session from "express-session"
//import MongoStore from "connect-mongo"

//Server
const server = express()
const port = envUtil.PORT
const ready = () => {
    console.log("Server ready on port: ",port);
    if(argsUtil.persistence === "mongo"){
        dbConnect()
    } 
}
server.listen(port, ready)

// Handlebars configuration
server.engine('handlebars', handlebars.engine());
server.set('views', __dirname+'/views');
server.set('view engine', 'handlebars');

// paquete de rutas-endpoints estatico;
server.use('/static', express.static('public'))

//Middlewares
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(morgan("dev"))
server.use(cookieParser(envUtil.SECRET_KEY))


// Routes
server.use(indexRouter)

// Middlewares
server.use(errorHandler)
server.use(pathHandler)

