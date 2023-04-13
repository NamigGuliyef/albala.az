import mongoose, { model, Schema } from "mongoose";
const productBrandSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin'
    }
}, { versionKey: false })

const productBrandModel = model('productBrand', productBrandSchema)
export default productBrandModel
