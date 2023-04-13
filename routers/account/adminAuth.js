import { Router } from "express";
import joi from 'joi'
import productModel from "../../models/product.js";
import { genSalt, hash } from 'bcrypt'
import adminModel from "../../models/admin.js";
import productBrandModel from "../../models/brand.js";
import orderStatModel from "../../models/order_status.js";
import salerModel from "../../models/saler.js";
const r = Router()

r.post('/add-admin', async (req, res) => {
    const adminSchema = joi.object({
        name: joi.string().pattern(new RegExp('^[a-zA-ZəöğıüçşƏÖĞIÜÇŞ]{3,30}$')).required(),
        surname: joi.string().pattern(new RegExp('^[a-zA-ZəöğıüçşƏÖĞIÜÇŞ]{3,30}$')).required(),
        email: joi.string().email({ tlds: { allow: ['com', 'net', 'ru', 'az'] } }).required(),
        password: joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{3,30}$')).required(),
    })
    const { error, value } = adminSchema.validate(req.body)
    if (error) {
        return res.status(400).send(error.message)
    }
    const hashPassword = await hash(value.password, await genSalt())
    const addAdmin = await adminModel.create({ ...value, password: hashPassword })
    return res.status(200).send(addAdmin)
})

//test edildi
r.delete('/salerProfile', async (req, res) => {
    const updateSaler = await salerModel.findOneAndUpdate({ _id: req.body._id }, { $set: { isActive: false } }, { new: true })
    return res.status(200).send(updateSaler)
})

//test edildi
r.get('/salerProfile', async (req, res) => {
    const allSaler = await salerModel.find({ isActive: true })
    return res.status(200).send(allSaler)
})

//test edildi
r.post('/productBrand', async (req, res) => {
    const productBrandSchema = joi.object({
        name: joi.string().pattern(new RegExp('^[a-zA-Z0-9əöğıüçşƏÖĞIÜÇŞ., ]{3,30}$')).required(),
    })
    const { error, value: { name } } = productBrandSchema.validate(req.body)
    if (error) {
        return res.status(400).send(error.message)
    }
    const newProductBrand = await productBrandModel.create({ adminId: req.admin._id, name })
    return res.status(200).send(newProductBrand)
})

//test edildi
r.get('/productBrand', async (req, res) => {
    const allProductBrand = await productBrandModel.find({ adminId: req.admin._id })
    return res.status(200).send(allProductBrand)
})

//duzelis edildi!
r.put('/productBrand', async (req, res) => {
    const productBrandSchema = joi.object({
        _id: joi.string().required(),
        name: joi.string().pattern(new RegExp('^[a-zA-Z0-9əöğıüçşƏÖĞIÜÇŞ., ]{3,30}$')).required(),
    })
    const { error, value } = productBrandSchema.validate(req.body)
    if (error) {
        return res.status(400).send(error.message)
    }
    const updateProductBrand = await productBrandModel.findOneAndUpdate({ _id: req.body._id }, { $set: value }, { new: true })
    return res.status(200).send(updateProductBrand)
})

//test edildi
r.delete('/productBrand', async (req, res) => {
    const deletedProductBrand = await productBrandModel.findOneAndDelete({ _id: req.body._id })
    return res.status(200).send(deletedProductBrand)
})

//test edildi
r.post('/product', async (req, res) => {
    const productSchema = joi.object({
        name: joi.string().pattern(new RegExp('^[a-zA-Z0-9əöğıüçşƏÖĞIÜÇŞ., ]{3,30}$')).required(),
        description: joi.string().pattern(new RegExp('^[a-zA-Z0-9əöğıüçşƏÖĞIÜÇŞ., ]{3,100}$')).required(),
        reviewIds: joi.array(),
        offerIds: joi.array(),
        photoUrls: joi.array(),
        brandId: joi.string()
    })
    const { error, value } = productSchema.validate(req.body)
    if (error) {
        return res.status(400).send(error.message)
    }
    value.adminId = req.admin._id
    const newProduct = await productModel.create(value)
    return res.status(200).send(newProduct)
})

//test edildi
r.get('/product', async (req, res) => {
    const allProduct = await productModel.find({ adminId: req.admin._id })
    return res.status(200).send(allProduct)
})

//duzelis edildi!
r.put('/product', async (req, res) => {
    const productSchema = joi.object({
        _id: joi.string().required(),
        name: joi.string().pattern(new RegExp('^[a-zA-Z0-9əöğıüçşƏÖĞIÜÇŞ., ]{3,30}$')).required(),
        description: joi.string().pattern(new RegExp('^[a-zA-Z0-9əöğıüçşƏÖĞIÜÇŞ., ]{3,100}$')).required(),
        reviewIds: joi.array(),
        offerIds: joi.array(),
        photoUrls: joi.array(),
        brandID: joi.string()
    })
    const { error, value } = productSchema.validate(req.body)
    if (error) {
        return res.status(400).send(error.message)
    }
    const updateProduct = await productModel.findOneAndUpdate({ _id: req.body._id }, { $set: value }, { new: true })
    return res.status(200).send(updateProduct)
})

//duzelis edildi!
r.delete('/product', async (req, res) => {
    const deletedProduct = await productModel.findOneAndDelete({ _id: req.body._id })
    return res.status(200).send(deletedProduct)
})

//test edildi!
r.post('/orderstatus', async (req, res) => {
    const { name } = req.body
    const newOrderStatus = await orderStatModel.create({ name })
    return res.status(200).send(newOrderStatus)
})

//test edildi!
r.get('/orderstatus', async (req, res) => {
    const allOrderStatus = await orderStatModel.find()
    return res.status(200).send(allOrderStatus)
})

//test edildi!
r.put('/orderstatus/:id', async (req, res) => {
    const updateOrderStatus = await orderStatModel.findOneAndUpdate({ _id: req.params.id }, { $set: { name: req.body.name } }, { new: true })
    return res.status(200).send(updateOrderStatus)
})

//test edildi!
r.delete('/orderstatus/:id', async (req, res) => {
    const deletedOrderStatus = await orderStatModel.findOneAndDelete({ _id: req.params.id })
    return res.status(200).send(deletedOrderStatus)
})



export default r
