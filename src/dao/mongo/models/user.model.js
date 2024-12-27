import { model, Schema } from "mongoose";

const collection = "users"
// ingles
// plural
// minusculas
// representativo del recurso
const schema = new Schema({
    name: { type: String },
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'USER', enum: ['USER','ADMIN','PREM'] },
    verifyCode: { type: String, required: true },
    verifiedUser: { type: Boolean, default: false },
    isOnline: { type: Boolean, default: false }
},{
    timestamps: true
})

const User = model(collection, schema)
export default User