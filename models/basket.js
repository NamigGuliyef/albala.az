import mongoose, { model, Schema } from "mongoose";
const productBasketSchema = new Schema({
    offerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'offer'
    },
    quantity: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, { versionKey: false })

const productBasketModel = model('productbasket', productBasketSchema)
export default productBasketModel
