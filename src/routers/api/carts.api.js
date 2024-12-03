import CustomRouter from "../../utils/CustomRouter.util.js";
import {
  create,
  readByUserId,
  update,
  destroy,
} from "../../data/mongo/managers/carts.manager.js";

class CartsApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["USER"], createCart);
    this.read("/:user_id", ["USER", "ADMIN"], readCartsFromUser);
    this.update("/:id", ["USER", "ADMIN"], updateCart);
    this.destroy("/:id", ["USER", "ADMIN"], destroyCart);
  };
}

const cartsApiRouter = new CartsApiRouter();
export default cartsApiRouter.getRouter();

async function createCart(req, res) {
  console.log("create cart: ", req.user)
  const message = "CART CREATED";
  let data = req.body;
  data.user_id = req.user._id
  const response = await create(data);
  return res.status(201).json({ response, message });
}

async function readCartsFromUser(req, res) {
  const { user_id } = req.params;
  const response = await readByUserId({ user_id });
  const message = "CART FOUND";
  return res.status(200).json({ response, message });
}

async function updateCart(req, res) {
  const { id } = req.params;
  const data = req.body;
  const message = "CART UPDATED";
  const response = await update(id, data);
  return res.status(200).json({ response, message });
}

async function destroyCart(req, res) {
  const { id } = req.params;
  const response = await destroy(id);
  const message = "CART DELETED";
  return res.status(200).json({ response, message });
}
