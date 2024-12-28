import CustomRouter from "../../utils/CustomRouter.util.js";
import {
  createCart,
  readCartsFromUser,
  updateCart,
  destroyCart,
  addItemToCart,
  removeItemFromCart
} from "../../contollers/carts.controllers.js"

class CartsApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["USER"], createCart);
    this.read("/:user_id", ["USER", "ADMIN"], readCartsFromUser);
    this.update("/addProduct/:cartId/:productId/:quantity",["USER"], addItemToCart)
    this.update("/removeProduct/:cartId/:productId/:quantity",["USER"], removeItemFromCart)
    this.update("/:id", ["USER", "ADMIN"], updateCart);
    this.destroy("/:id", ["USER", "ADMIN"], destroyCart);
  };
}

const cartsApiRouter = new CartsApiRouter();
export default cartsApiRouter.getRouter();