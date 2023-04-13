import mongoose, { model, Schema } from "mongoose";
const reviewSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'product'
    }
}, { versionKey: false })


reviewSchema.post('save', async function () {
    await mongoose.model('product').findOneAndUpdate({ _id: this.productId }, { $push: { reviewIds: this._id } })
})


reviewSchema.pre('findOneAndDelete', async function (next) {
    const _id = this.getFilter()._id
    const deletedReview = await mongoose.model('review').findOne({ _id })
    await mongoose.model('product').findOneAndUpdate({ _id: deletedReview.productId }, { $pull: { reviewIds: deletedReview._id } })
    next()
})


const reviewModel = model('review', reviewSchema)
export default reviewModel