import mongoose, { model, Schema } from "mongoose";
const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    topCategoryId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'topCategory'
    }
}, { versionKey: false })

const categoryModel = model('category', categorySchema)
export default categoryModel
