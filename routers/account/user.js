import { Router } from "express";
import userModel from "../../models/user.js";
import joi from 'joi'
import { hash, genSalt, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { jwt_secret } from "../../utils.js";
const r = Router()


r.post('/signup', async (req, res) => {
    const userSchema = joi.object({
        name: joi.string().pattern(new RegExp('^[a-zA-ZəöğıüçşƏÖĞIÜÇŞ]{3,30}$')).required(),
        email: joi.string().email({ tlds: { allow: ['com', 'net', 'ru', 'az'] } }).required(),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{3,30}$')).required(),
    })
    const { error, value } = userSchema.validate(req.body)
    if (error) {
        return res.status(400).send(error.message)
    }
    const hashPassword = await hash(value.password, await genSalt())
    const { password, ...data } = (await userModel.create({ ...value, password: hashPassword }))._doc
    return res.status(200).send(data)
})


r.post('/signin', async (req, res) => {
    const userSchema = joi.object({
        email: joi.string().email({ tlds: { allow: ['com', 'net', 'ru', 'az'] } }).required(),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{3,30}$')).required(),
    })
    const { error, value: { email, password } } = userSchema.validate(req.body)
    if (error) {
        return res.status(400).send(error.message)
    }
    const user = await userModel.findOne({ email })
    if (!user) {
        return res.status(404).send('Email not found')
    }
    const passRight = await compare(password, user.password)
    if (!passRight) {
        return res.status(401).send('Password is wrong!')
    }
    const token = jwt.sign({ email, _id: user._id }, jwt_secret)
    return res.status(200).send(token)
})

export default r
