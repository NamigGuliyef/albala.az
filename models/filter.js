import { model, Schema } from "mongoose";
const filterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    values: {
        type: [String],
        required: true
    }
}, { versionKey: false })

const filterModel = model('filter', filterSchema)
export default filterModel

