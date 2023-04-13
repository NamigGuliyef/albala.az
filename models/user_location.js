import mongoose, { model, Schema } from "mongoose";
const userLocationSchema = new Schema({
    recipient: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    postal_code: {
        type: String,
        required: true
    }
}, { versionKey: false })

const userLocationModel = model('userLocation', userLocationSchema)
export default userLocationModel
