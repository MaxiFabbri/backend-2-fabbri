import { Router } from "express";
import { create, read, readById, readByEmail, update, destroy } from "../../data/mongo/managers/users.manager.js";
// import __dirname from "../../utils.js"

const usersViewsRouter = Router()

usersViewsRouter.get("/",(req, res, next) => {
    // isOnline()
    
    // if(!data.online) { 
    //     return res.render('login', data)
    // } else {
    //     return location.replace("/products")
    // }
    // const data = {
    //     online: false
    // }
    // console.log("Views Router data online: ",data)
    // if(req.session.user_id) {
    //     data.online = true 
    //     // return location.replace("/products")
    //     return res.render('login', data)
    // }
    // console.log("Session ", req.session.user_id," data: ",data )
    return res.render('index')
})
usersViewsRouter.get("/login", (req,res,next) => {
    return res.render('login')
})

usersViewsRouter.get("/register", (req,res,next) => {
    return res.render('register')
})


export default usersViewsRouter

// async function isOnline (req, res, next) {
//     console.log("isOnline Runing ", req)
//     const data = {
//         online: false
//     }
//     if(req.session.user_id) {
//         data.online = true 
//         return data
//     }
//     console.log("Session ", req.session.user_id," data: ",data )
//     return data
// }