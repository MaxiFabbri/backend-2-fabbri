import Cart from "../models/cart.model.js";
import Manager from "./manager.js";


const cartsManager = new Manager(Cart)
const { create,  readByUserId, update, destroy } = cartsManager

export { create, readByUserId, update, destroy }