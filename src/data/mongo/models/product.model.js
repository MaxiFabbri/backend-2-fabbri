import { model, Schema } from "mongoose";

const collection = "products"
// ingles
// plural
// minusculas
// representativo del recurso
const schema = new Schema({
    title: {type: String, required: true, index: true },
    description: {type: String, required: true },
    code: {type: String, required: false },
    price: {type: Number, required: true, default: 1000 },
    status: {type: Boolean, required: true, default: true},
    stock: {type: Number, required: true, default: 10 },
    category: {type: String, enum: ["bazar","electro","textil","grafica"], required: true, default: "bazar" },
    thumbnails: {type:[String], required: false}
})

const Product = model(collection, schema)
export default Product
