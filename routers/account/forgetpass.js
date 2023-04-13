import { Router } from "express";
import userModel from "../../models/user.js";
import jwt from 'jsonwebtoken'
import { jwt_secret } from "../../utils.js";
import { hash, genSalt } from "bcrypt";
import nodemailer from 'nodemailer'
const r = Router()

r.post('/forgetPassword', async (req, res) => {
    const { email } = req.body
    const token = jwt.sign({ email }, jwt_secret)

    const mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: 'quliyevnamiq8@gmail.com',
            pass: 'wprbqfahngjeiktl',
        }
    });
    let details = {
        from: 'quliyevnamiq8@gmail.com',
        to: `${email}`,
        subject: "Hello ✔",
        html: `
        <a href="http://localhost:6000/account/recover/${token}">Token</a>`,
    }
    mailTransporter.sendMail(details, (err) => {
        if (err) {
            return res.send(err.message)
        } else {
            return res.send('Mesaj gonderildi')
        }
    })
})


r.post('/recovery/:token', async (req, res) => {
    const token = req.params.token
    if (!token) {
        return res.status(400).send('Token is invalid')
    }
    jwt.verify(token, jwt_secret, async (err, forget) => {
        if (err) {
            return res.status(401).send('Token is wrong!')
        }
        const hashPass = await hash(req.body.password, await genSalt())
        const updateData = await userModel.findOneAndUpdate({ email: forget.email }, { $set: { password: hashPass } })
        return res.status(200).send(updateData)
    })
})

export default r    