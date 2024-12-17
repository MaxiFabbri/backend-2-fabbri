import { createCartService, readByUserIdService, updateCartService, destroyCartService } from "../services/carts.service.js"

async function createCart(req, res) {
  console.log("create cart: ", req.user)
  const message = "CART CREATED";
  let data = req.body;
  data.user_id = req.user._id
  const response = await createCartService(data);
  return res.status(201).json({ response, message });
}

async function readCartsFromUser(req, res) {
  const { user_id } = req.params;
  const response = await readByUserIdService({ user_id });
  const message = "CART FOUND";
  return res.status(200).json({ response, message });
}

async function updateCart(req, res) {
  const { id } = req.params;
  const data = req.body;
  const message = "CART UPDATED";
  const response = await updateCartService(id, data);
  return res.status(200).json({ response, message });
}

async function destroyCart(req, res) {
  const { id } = req.params;
  const response = await destroyCartService(id);
  const message = "CART DELETED";
  return res.status(200).json({ response, message });
}

export { createCart, readCartsFromUser, updateCart, destroyCart };