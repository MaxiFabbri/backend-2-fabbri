import { Router } from "express";
import { create, readByEmail, readById } from "../../data/mongo/managers/users.manager.js";
import isVerifyPassword from "../../middlewares/isVerifiedPassword.mid.js";

import isValidUserData from "../../middlewares/isValidUserData.mid.js";
import isUser from "../../middlewares/isUser.mid.js";

const sessionsRouter = Router()

// sessionsRouter.post("/register", 
//     // middleware para validar campos obligatorios! 
//     isValidUserData,
//     // middleware de usuario inexistente
//     isUser,
//     async(req, res, next)=> {
//     try {
//         const data = req.body
//         const one = await create(data)
//         const message = "USER REGISTERED"
//         return res.status(201).json({ message, one_id: one.id })
//     } catch (error) {
//         return next(error)
//     }
// })

// sessionsRouter.post("/login",
//     // middlewares para verificar que el usuario y la contraseña son correcta
//     isVerifyPassword,
//     (req, res, next)=> {
//     try {
//         req.session.online = true
//         req.session.email = req.body.email
//         const message = "USER LOGGED IN"
//         return res.status(200).json({ message })
//     } catch (error) {
//         return next(error)
//     }
// })

// sessionsRouter.post("/signout", async(req, res, next)=> {
//     try {
//         const sessions = req.session
//         req.session.destroy()
//         return res.status(200).json({ message: "USER SIGNED OUT", sessions })
//     } catch (error) {
//         return next(error)
//     }
// })

// sessionsRouter.post("/online", (req, res, next)=> {
//     try {
//         const sessions = req.session
//         console.log(sessions);        
//         if (sessions.online) {
//             return res.status(200).json({ message: "USER IS ONLINE", sessions })
//         }
//         return res.status(401).json({ message: "INVALID CREDENTIALS" })
//     } catch (error) {
//         return next(error)
//     }
// })

sessionsRouter.post("/register", isValidUserData, isUser, register)
sessionsRouter.post("/login", isVerifyPassword, login)
sessionsRouter.post("/signout", signout)
sessionsRouter.post("/online", online)

export default sessionsRouter

async function register(req, res, next) {
    try {
        const data = req.body
        const one= await create(data)
        return res.status(201).json({ message: "USER REGISTERED", one_id: one._id })
    } catch (error) {
        return next(error)
    }
}

async function login(req, res, next) {
    try {
        const { email }= req.body
        const one = await readByEmail(email)
        req.session.role = one.role
        req.session.user_id = one._id
        return res.status(200).json({ message: "USER LOGGED IN", user_id: one._id })
    } catch (error) {
        return next(error)
    }    
}

function signout(req, res, next) {
    try {
        req.session.destroy()
        return res.status(200).json({ message: "USER SIGNED OUT" })
    } catch (error) {
        return next(error)
    }
}

async function online(req, res, next) {    
    try {
        const { user_id } = req.session
        const one = await readById(user_id)
        if (req.session.user_id) {
            return res.status(200).json({ message: one.email.toUpperCase()+" IS ONLINE", online: true })
        } else {
            return res.status(400).json({ message: "USER IS NOT ONLINE", online: false })
        }
    } catch (error) {
        return next(error)
    }
}