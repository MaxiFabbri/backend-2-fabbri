import {
  createCartService,
  readOneCartService,
  readByUserIdService,
  updateCartService,
  destroyCartService
} from "../services/carts.service.js"
import { readProductByIdService, updateProductService } from "../services/products.service.js"

async function addItemToCart(req, res) {
  const { cartId, productId, quantity } = req.params
  const quantityInt = parseInt(quantity)
  // Traigo los datos del cart y del Producto
  const cart = await readOneCartService(cartId)
  const product = await readProductByIdService(productId)
  // Verifico si el Cart es existe
  if (!cart) return res.json404()
  const data = cart
  // Verifico Stock del producto
  if (quantityInt > product.stock) return res.json403()
  // Resto los items del Stock del producto
  const productData = product
  productData.stock -= quantityInt
  await updateProductService(productId,productData)
  // Verifico si el producto ya está en el cart
  const productIndex = data.products.findIndex(
    (produ) => produ.product_id._id.toString() === productId
  );
  // Actualizo la cantidad y el Total
  if(productIndex != -1){
    data.products[productIndex].quantity += quantityInt
    data.total += product.price * quantityInt
  } else {
    data.products.push({product_id: productId, quantity: quantityInt})
    data.total += product.price * quantity 
  }
  data.user_id = cart.user_id._id
  const response = updateCartService(cartId, data)
  const message = "Item Added to cart";
  return res.json201(response, message);
}

async function removeItemFromCart(req, res) {
  
}

async function createCart(req, res) {
  // leo el UserId
  const user_id = req.user._id
  const cart = await readByUserIdService(user_id)
  // Veo si hay un Cart reserved de ese usuario
  if (!cart || cart.state != "reserved") {
    // si no hay
    const total = 0
    const products = []
    const data = { user_id, products, total }
    const response = await createCartService(data);
    const message = "CART CREATED";
    return res.json201(response, message)
  }
  return res.json403()
}

async function readCartsFromUser(req, res) {
  const { user_id } = req.params;
  const response = await readByUserIdService(user_id);
  if (response) {
    const message = "CART FOUND";
    return res.json200(response, message)
  }
  return res.json404()
}

async function updateCart(req, res) {
  const { id } = req.params;
  const data = req.body;
  const message = "CART UPDATED";
  const response = await updateCartService(id, data);
  return res.json200(response, message)
}

async function destroyCart(req, res) {
  const { id } = req.params;
  const response = await destroyCartService(id);
  const message = "CART DELETED";
  return res.json200(response, message)
}

export { createCart, readCartsFromUser, updateCart, destroyCart, addItemToCart, removeItemFromCart };