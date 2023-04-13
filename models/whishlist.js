import mongoose, { model, Schema } from "mongoose";
const whishlistSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }
}, { versionKey: false })

const whishlistModel = model('whishlist', whishlistSchema)
export default whishlistModel

