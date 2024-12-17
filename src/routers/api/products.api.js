import CustomRouter from "../../utils/CustomRouter.util.js";
import { createProduct, readPaginatedProducts, updateProduct, destroyProduct } from "../../contollers/products.controllers.js"

class ProductsApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["ADMIN"], createProduct);
    this.read("/:id?", ["PUBLIC"], readPaginatedProducts)
    this.update("/:id", ["ADMIN"], updateProduct);
    this.destroy("/:id", ["ADMIN"], destroyProduct);
  };
}

const productsApiRouter = new ProductsApiRouter();
export default productsApiRouter.getRouter();
