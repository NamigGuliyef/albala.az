import mongoose, { model, Schema } from "mongoose";

const offerSchema = new Schema({
    salerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'saler'
    },
    price: {
        type: Number,
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'product'
    }
}, { versionKey: false })


offerSchema.post('save', async function () {
    await mongoose.model('product').findOneAndUpdate({ _id: this.productId }, { $push: { offerIds: this._id } })
})

offerSchema.pre('findOneAndDelete', async function (next) {
    const _id = this.getFilter()._id
    const deletedOffer = await mongoose.model('offer').findOne({ _id })
    await mongoose.model('product').findOneAndUpdate({ _id: deletedOffer.productId }, { $pull: { offerIds: deletedOffer._id } })
    next()
})


const offerModel = model('offer', offerSchema)
export default offerModel
