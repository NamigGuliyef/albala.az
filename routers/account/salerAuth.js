import { compare, hash, genSalt } from "bcrypt";
import { Router } from "express";
import joi from 'joi'
import offerModel from "../../models/offer.js";
import orderModel from "../../models/order.js";
import salerModel from "../../models/saler.js";
const r = Router()

r.put('/edit-profile', async (req, res) => {
    const salerSchema = joi.object({
        name: joi.string().pattern(new RegExp('^[a-zA-ZəöğıüçşƏÖĞIÜÇŞ]{3,30}$')).required(),
        surname: joi.string().pattern(new RegExp('^[a-zA-ZəöğıüçşƏÖĞIÜÇŞ]{3,30}$')).required(),
        email: joi.string().email({ tlds: { allow: ['com', 'net', 'ru', 'az'] } }).required(),
        phone_number: joi.string().pattern(new RegExp('^[0-9]{9}$')).required(),
        company_name: joi.string().pattern(new RegExp('^[a-zA-Z0-9.əöğıüçşƏÖĞIÜÇŞ ]{3,30}$')).required(),
        company_VOEN: joi.string().pattern(new RegExp('^[0-9]{10}$')).required(),
        company_location: joi.string().pattern(new RegExp('^[a-zA-Z0-9 -,.əöğıüçşƏÖĞIÜÇŞ]{3,100}$')).required(),
        fin_code: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{7}$')).required(),
        old_password: joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{3,30}$')),
        new_password: joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{3,30}$'))
    })
    const { error, value } = salerSchema.validate(req.body)
    if (error) {
        return res.status(400).send(error.message)
    }
    if (value.old_password) {
        const saler = await salerModel.findOne({ _id: req.saler._id })
        const oldPass = await compare(value.old_password, saler.password)
        if (!oldPass) {
            return res.status(401).send("Password is wrong!")
        }
        const newPass = await hash(value.new_password, await genSalt())
        const updateSaler = await salerModel.findOneAndUpdate({ _id: req.saler._id }, { $set: { ...value, password: newPass } }, { new: true })
        return res.status(200).send(updateSaler)
    }
    const updateSaler = await salerModel.findOneAndUpdate({ _id: req.saler._id }, { $set: value }, { new: true })
    return res.status(200).send(updateSaler)
})


//test edildi
r.post('/offer', async (req, res) => {
    const { price, productId } = req.body
    const newProductOffer = await offerModel.create({ salerId: req.saler._id, price, productId })
    return res.status(200).send(newProductOffer)
})

//test edildi
// saticinin teklifleri
r.get('/offer', async (req, res) => {
    const productOffer = await offerModel.find({ salerId: req.saler._id })
    return res.status(200).send(productOffer)
})

//test edildi!
// teklifi deyismek!
// order verende price offer-dan order-e kopyalanmalidir!
r.put('/offer', async (req, res) => {
    const updateOffer = await offerModel.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }, { new: true })
    return res.status(200).send(updateOffer)
})

//test edildi
r.delete('/offer', async (req, res) => {
    const deletedOffer = await offerModel.findOneAndDelete({ _id: req.body._id })
    return res.status(200).send(deletedOffer)
})

//test edildi
r.get('/order', async (req, res) => {
    const allOrder = await orderModel.find({ salerId: req.saler._id })
    return res.status(200).send(allOrder)
})

//test edildi
r.put('/order', async (req, res) => {
    const updateOrderStatus = await orderModel.findOneAndUpdate({ _id: req.body._id }, { $set: { statusId: req.body.statusId } }, { new: true })
    return res.status(200).send(updateOrderStatus)
})


export default r
