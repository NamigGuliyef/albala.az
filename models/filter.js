import mongoose, { model, Schema } from "mongoose";
const filterSchema = new Schema({
    name: {
        type: String, // storage, color
        required: true
    },
    values: {
        type: [String],  // [8, 16, 32, ...] , [red, green]
        required: true
    },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'admin' }
}, { versionKey: false })

const filterModel = model('filter', filterSchema)
export default filterModel

