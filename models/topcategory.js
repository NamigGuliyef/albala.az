import mongoose, { model, Schema } from "mongoose";
const topCategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    filterId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'filter'
    }
}, { versionKey: false })

const subCategoryModel = model('topCategory', topCategorySchema)
export default topCategoryModel




/*
category [erkek, kadin, elektronik]
subcategory[tshort, , telefon]

subcategory -> [{name:ram, values:[2,4,6,8,12]}]


*/