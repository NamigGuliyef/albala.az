import mongoose, { model, Schema } from "mongoose";
const topCategorySchema = new Schema({
    name: { type: String, required: true },
    categoryIds: { type: [mongoose.Schema.Types.ObjectId], ref: 'category' },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'admin' }
}, { versionKey: false })

const topCategoryModel = model('topCategory', topCategorySchema)
export default topCategoryModel




/*
top category [erkek, kadin, elektronik]
category[tshort, , telefon]

category -> [{name:ram, values:[2,4,6,8,12]}]


*/