//import { Router } from "express";
import CustomRouter from "../../utils/CustomRouter.util.js";

class UsersViews extends CustomRouter {
    constructor() {
        super();
        this.init();
    }
    init = () => {
        this.use("/login", ["PUBLIC"], renderLogin)
        this.use("/register", ["PUBLIC"], renderRegister)
        this.use("/", ["PUBLIC"], renderIndex)
    };
}

const usersViewsRouter = new UsersViews();
export default usersViewsRouter.getRouter()

function renderIndex (req, res, next) {
    console.log("index render")
    return res.render('index')
}

function renderLogin (req, res, next) {
    console.log("login render")
    return res.render('login')
}

function renderRegister (req, res, next) {
    console.log("register render")
    return res.render('register')
}
