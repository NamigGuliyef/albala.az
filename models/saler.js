import { model, Schema } from "mongoose";
const salerSchema = new Schema({
    isActive: {
        type: Boolean,
        default: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone_number: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    company_VOEN: {
        type: String,
        required: true
    },
    company_location: {
        type: String,
        required: true
    },
    fin_code: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, { versionKey: false })

const salerModel = model('saler', salerSchema)
export default salerModel
