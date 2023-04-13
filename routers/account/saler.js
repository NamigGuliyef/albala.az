import { Router } from "express";
import salerModel from "../../models/saler.js";
import joi from 'joi'
import { hash, genSalt, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { jwt_secret } from "../../utils.js";
const r = Router()

r.post('/signup', async (req, res) => {
    const salerSchema = joi.object({
        name: joi.string().pattern(new RegExp('^[a-zA-ZəöğıüçşƏÖĞIÜÇŞ]{3,30}$')).required(),
        surname: joi.string().pattern(new RegExp('^[a-zA-ZəöğıüçşƏÖĞIÜÇŞ]{3,30}$')).required(),
        email: joi.string().email({ tlds: { allow: ['com', 'net', 'ru', 'az'] } }).required(),
        phone_number: joi.string().pattern(new RegExp('^[0-9]{9}$')).required(),
        company_name: joi.string().pattern(new RegExp('^[a-zA-Z0-9.əöğıüçşƏÖĞIÜÇŞ ]{3,30}$')).required(),
        company_VOEN: joi.string().pattern(new RegExp('^[0-9]{10}$')).required(),
        company_location: joi.string().pattern(new RegExp('^[a-zA-Z0-9 -,.əöğıüçşƏÖĞIÜÇŞ]{3,100}$')).required(),
        fin_code: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{7}$')).required(),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{3,30}$')).required(),
    })
    const { error, value } = salerSchema.validate(req.body)
    if (error) {
        return res.status(400).send(error.message)
    }
    const hashPassword = await hash(value.password, await genSalt())
    const { password, ...data } = (await salerModel.create({ ...value, password: hashPassword }))._doc
    return res.status(200).send(data)
})


r.post('/signin', async (req, res) => {
    const salerSchema = joi.object({
        email: joi.string().email({ tlds: { allow: ['com', 'net', 'ru', 'az'] } }).required(),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{3,30}$')).required(),
    })
    const { error, value: { email, password } } = salerSchema.validate(req.body)
    if (error) {
        return res.status(400).send(error.message)
    }
    const saler = await salerModel.findOne({ email })
    if (!saler) {
        return res.status(404).send('Email not found')
    }
    const passRight = await compare(password, saler.password)
    if (!passRight) {
        return res.status(401).send('Password is wrong!')
    }
    const token = jwt.sign({ email, _id: saler._id }, jwt_secret)
    return res.status(200).send(token)
})

export default r 