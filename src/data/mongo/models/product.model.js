// import { model, Schema } from "mongoose";

// const collection = "products"
// // ingles
// // plural
// // minusculas
// // representativo del recurso
// const schema = new Schema({
//     title: { type: String, required: true, index: true },
//     price: { type: Number, default: 10 },
//     stock: { type: Number, default: 10 },
//     category: { type: String, enum: ["celulares","tablets","computadoras"], default: "computadoras"}
// })

// const Product = model(collection, schema)
// export default Product

// Backend 1
import { model, Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
import "dotenv/config.js"

// mongoose.pluralize(null)

const collection = process.env.PRODUCTS_COLLECTION

const schema = new Schema({
    title: {type: String, required: true },
    description: {type: String, required: true },
    code: {type: String, required: true },
    price: {type: Number, required: true },
    status: {type: Boolean, required: false},
    stock: {type: Number, required: true },
    category: {type: String, required: true },
    thumbnails: {type:[String], required: false}
})
schema.plugin(mongoosePaginate)

const productModel = model(collection, schema)

export default productModel
