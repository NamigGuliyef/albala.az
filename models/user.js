
import { model, Schema } from "mongoose";
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone_number: {
        type: String
    },
    user_photo: {
        type: String
    },
    password: {
        type: String,
        required: true
    }
}, { versionKey: false })


const userModel = model('user', userSchema)
export default userModel
