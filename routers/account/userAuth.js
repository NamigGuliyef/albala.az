import { compare, genSalt, hash } from "bcrypt";
import { Router } from "express";
import userModel from "../../models/user.js";
import userLocationModel from "../../models/user_location.js";
import whishlistModel from "../../models/whishlist.js";
import joi from 'joi'
import orderModel from "../../models/order.js";
import reviewModel from "../../models/review.js";
import productBasketModel from "../../models/basket.js";
import offerModel from "../../models/offer.js";

const r = Router()


r.get('/profile', async (req, res) => {
    const { password, ...data } = (await userModel.findOne({ _id: req.user._id }))._doc
    return res.status(200).send(data)
})


r.delete('/profile', async (req, res) => {
    const deletedProfile = await userModel.findOneAndDelete({ _id: req.body._id })
    return res.status(200).send(deletedProfile)
})


r.put('/edit-profile', async (req, res) => {
    const userSchema = joi.object({
        name: joi.string().pattern(new RegExp('^[a-zA-ZəöğıüçşƏÖĞIÜÇŞ]{3,30}$')).required(),
        surname: joi.string().pattern(new RegExp('^[a-zA-ZəöğıüçşƏÖĞIÜÇŞ]{3,30}$')).required(),
        phone_number: joi.string().pattern(new RegExp('^[0-9]{9}$')),
        email: joi.string().email({ tlds: { allow: ['com', 'net', 'ru', 'az'] } }).required(),
        user_photo: joi.string(),
        old_password: joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{3,30}$')),
        new_password: joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{3,30}$')),
    })
    const { error, value } = userSchema.validate(req.body)
    if (error) {
        return res.status(400).send(error.message)
    }
    if (value.old_password) {
        const user = await userModel.findOne({ _id: req.user._id })
        const oldPass = await compare(value.old_password, user.password)
        if (!oldPass) {
            return res.status(401).send("Password is wrong!")
        }
        const newPass = await hash(value.new_password, await genSalt())
        const updateUser = await userModel.findOneAndUpdate({ _id: req.user._id }, { $set: { ...value, password: newPass } }, { new: true })
        return res.status(200).send(updateUser)
    }
    const updateUser = await userModel.findOneAndUpdate({ _id: req.user._id }, { $set: value }, { new: true })
    return res.status(200).send(updateUser)
})

//test edildi!
r.get('/address', async (req, res) => {
    const userAddress = await userLocationModel.find({ userId: req.user._id })
    return res.status(200).send(userAddress)
})

//test edildi
r.post('/address', async (req, res) => {
    const userLocationSchema = joi.object({
        recipient: joi.string().pattern(new RegExp('^[a-zA-ZəöğıüçşƏÖĞIÜÇŞ ]{3,30}$')).required(),
        location: joi.string().pattern(new RegExp('^[a-zA-Z0-9əöğıüçşƏÖĞIÜÇŞ., ]{3,100}$')).required(),
        city: joi.string().pattern(new RegExp('^[a-zA-ZəöğıüçşƏÖĞIÜÇŞ]{3,30}$')).required(),
        phone_number: joi.string().pattern(new RegExp('^[0-9]{9}$')).required(),
        postal_code: joi.string().pattern(new RegExp('^[A-Z0-9]{6}$')).required(),
    })
    const { error, value } = userLocationSchema.validate(req.body)
    if (error) {
        return res.status(400).send(error.message)
    }
    value.userId = req.user._id
    const newAddress = await userLocationModel.create(value)
    return res.status(200).send(newAddress)
})

//test edildi
r.put('/edit-address', async (req, res) => {
    const userLocationSchema = joi.object({
        _id: joi.string().required(),
        recipient: joi.string().pattern(new RegExp('^[a-zA-ZəöğıüçşƏÖĞIÜÇŞ ]{3,30}$')).required(),
        location: joi.string().pattern(new RegExp('^[a-zA-Z0-9əöğıüçşƏÖĞIÜÇŞ., ]{3,100}$')).required(),
        city: joi.string().pattern(new RegExp('^[a-zA-ZəöğıüçşƏÖĞIÜÇŞ]{3,30}$')).required(),
        phone_number: joi.string().pattern(new RegExp('^[0-9]{9}$')).required(),
        postal_code: joi.string().pattern(new RegExp('^[A-Z0-9]{6}$')).required(),
    })
    const { error, value } = userLocationSchema.validate(req.body)
    if (error) {
        return res.status(400).send(error.message)
    }
    const updateAddress = await userLocationModel.findOneAndUpdate({ userId: req.user._id, _id: req.body._id }, { $set: value }, { new: true })
    return res.status(200).send(updateAddress)
})

//duzelis edildi!
r.delete('/address', async (req, res) => {
    const deleteAddress = await userLocationModel.findOneAndDelete({ userId: req.user._id, _id: req.body._id })
    return res.status(200).send(deleteAddress)
})


r.get('/whishlist', async (req, res) => {
    const whishlist = await whishlistModel.find({ userId: req.user._id })
    return res.status(200).send(whishlist)
})


r.post('/whishlist', async (req, res) => {
    const newWhisList = await whishlistModel.create({ userId: req.user._id, productId: req.body.productId })
    return res.status(200).send(newWhisList)
})

//duzelis edildi
r.delete("/whishlist", async (req, res) => {
    const deletedWhishlist = await whishlistModel.findOneAndDelete({ userId: req.user._id, _id: req.body._id })
    return res.status(200).send(deletedWhishlist)
})

//test edildi
r.get('/order', async (req, res) => {
    const allOrder = await orderModel.find({ userId: req.user._id }).populate({
        path: 'offerId',
        populate: [
            { path: 'salerId', select: ['company_name', 'email'] },
            { path: 'productId', select: ['name', 'description'] }
        ]
    })
    return res.status(200).send(allOrder)
})

//test edildi
r.post('/order', async (req, res) => {
    const { price } = await offerModel.findById(req.body.offerId)
    const newOrder = await orderModel.create({ userId: req.user._id, ...req.body, price })
    return res.status(200).send(newOrder)
})


r.post('/review', async (req, res) => {
    const { description, rating, productId } = req.body
    const newReview = await reviewModel.create({ userId: req.user._id, description, rating, productId })
    return res.status(200).send(newReview)
})

//duzelis edildi!
r.put('/review', async (req, res) => {
    const updateReview = await reviewModel.findOneAndUpdate({ userId: req.user._id, _id: req.body._id }, { $set: req.body }, { new: true })
    return res.status(200).send(updateReview)
})

//duzelis edildi!
r.delete('/review', async (req, res) => {
    const deletedReview = await reviewModel.findOneAndDelete({ userId: req.user._id, _id: req.body._id })
    return res.status(200).send(deletedReview)
})


r.post('/basket', async (req, res) => {
    const { offerId, quantity } = req.body
    const addProductBasket = await productBasketModel.create({ userId: req.user._id, offerId, quantity })
    return res.status(200).send(addProductBasket)
})


r.get('/basket', async (req, res) => {
    const allBasket = await productBasketModel.find({ userId: req.user._id })
        .populate({
            path: 'offerId',
            populate: [
                { path: 'productId', select: ['name', 'description'] },
                { path: 'salerId', select: ['company_name'] },
            ]
        })
    return res.status(200).send(allBasket)
})


r.put('/basket', async (req, res) => {
    const updateBasket = await productBasketModel.findOneAndUpdate({ _id: req.body._id }, { $set: { quantity: req.body.quantity } }, { new: true })
    return res.status(200).send(updateBasket)
})


r.delete('/basket', async (req, res) => {
    const deletedBasket = await productBasketModel.findOneAndDelete({ _id: req.body._id })
    return res.status(200).send(deletedBasket)
})


export default r
