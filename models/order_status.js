import  { model, Schema } from "mongoose";
const orderStatSchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, { versionKey: false })

const orderStatModel = model('orderstatus', orderStatSchema)
export default orderStatModel
