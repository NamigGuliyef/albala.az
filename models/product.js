import mongoose, { model, Schema } from "mongoose";
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reviewIds: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: 'review'
    },
    offerIds: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: 'offer'
    },
    photoUrls: {
        type: [String],
        required: true
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'brand'
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    }
}, { versionKey: false })

const productModel = model('product', productSchema)
export default productModel;
