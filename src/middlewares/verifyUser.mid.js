import { readOne } from "../data/mongo/managers/users.manager.js"

async function verifyUser(req, res, next) {
    try { 
        const { email } = req.body
        const one = await readOne(email)
        if (one) {
            const message = "INVALID CREDENTIALS - USER EXISTS"
            return res.status(401).json({ message }) 
        } else {
            next()
        }  
    } catch (error) {
        return next(error)
    }
}

export default verifyUser