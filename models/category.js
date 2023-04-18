import mongoose, { model, Schema } from "mongoose";
const categorySchema = new Schema({
    name: { type: String, required: true },
    filterIds: { type: [mongoose.Schema.Types.ObjectId], ref: 'filter' },
    topCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'topCategory' },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'admin' }
}, { versionKey: false })


categorySchema.post('save', async function () {
    await mongoose.model('topCategory').findOneAndUpdate({ _id: this.topCategoryId }, { $push: { categoryIds: this._id } })
})

categorySchema.pre('findOneAndDelete', async function () {
    const _id = this.getFilter()._id
    const deletedCategory = await mongoose.model('category').findOne({ _id })
    await mongoose.model('topCategory').findOneAndUpdate({ _id: deletedCategory.topCategoryId }, { $pull: { topCategoryId: deletedCategory._id } })
    next()
})

const categoryModel = model('category', categorySchema)
export default categoryModel