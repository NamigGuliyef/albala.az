import mongoose, { model, Schema } from "mongoose";
const orderSchema = new Schema({
    statusId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'orderstatus'
    },
    quantity: Number,
    price: Number,
    offerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'offer'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }
}, { versionKey: false, timestamps: true })


const orderModel = model('order', orderSchema)
export default orderModel
