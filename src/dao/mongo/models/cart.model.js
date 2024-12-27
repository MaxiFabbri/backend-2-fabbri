import { model, Schema, Types } from "mongoose";

const collection = "carts"
// ingles
// plural
// minusculas
// representativo del recurso
const schema = new Schema({
    user_id: { type: Types.ObjectId, ref: "users", required: true },
    state: { type: String, enum: ["reserved","paid","delivered"], default: "reserved"},
    products: [
        {
            product_id: { type: Types.ObjectId, ref: "products", required: true },
            quantity: { type: Number, required: true }            
        },
    ],
    total: {type: Number, default: 0},
},{
    timestamps: true
})

schema.pre(/^find/, function () {
    this.populate("products.product_id", "title price stock");
    this.populate("user_id", "email name");
  });
  

const Cart = model(collection, schema)
export default Cart