function verifySessionData(req, res, next) {
    try { 
        const { email, password } = req.body
        if (email && password) {
            next()
        } else {
            const message = "INVALID CREDENTIALS - DATA MISSING"
            return res.status(401).json({ message }) 
        }  
    } catch (error) {
        return next(error)
    }
}

export default verifySessionData