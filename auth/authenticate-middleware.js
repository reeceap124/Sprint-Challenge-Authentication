const jwt = require('jsonwebtoken')
const {jwtSecret} = require('../config/secrets')

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, jwtSecret, (err)=>{
            if (err) {
                res.status(401).json({message: 'this token is not valid'})
            } else {
                next();
            }
        })
    } else {
        res.status(401).json({message: 'sorry, not authorized'})
    }
}