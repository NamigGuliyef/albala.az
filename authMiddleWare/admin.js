import jwt from 'jsonwebtoken'
import { jwt_admin_secret } from '../utils.js'
export const adminMiddleWare = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(400).send('Token is invalid')
    }
    jwt.verify(token, jwt_admin_secret, (err, admin) => {
        if (err) {
            return res.status(401).send('Token is wrong!')
        }
        req.admin = admin
        next()
    })
}
