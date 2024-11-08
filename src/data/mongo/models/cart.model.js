import mongoose, { Types } from 'mongoose'
import "dotenv/config.js"

mongoose.pluralize(null)

const collection = process.env.CART_COLLECTION

const schema = new mongoose.Schema({
    product: { type: [{ _id: mongoose.Schema.Types.ObjectId, qty: Number }], required: true, ref: config.PRODUCTS_COLLECTION}
})

const cartModel = mongoose.model(collection, schema)

export default cartModel