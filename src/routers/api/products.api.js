import CustomRouter from "../../utils/CustomRouter.util.js";
import {
  create,
  read,
  readPaginated,
  update,
  destroy,
} from "../../data/mongo/managers/products.manager.js";

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

async function createProduct(req, res) {
  const message = "PRODUCT CREATED";
  const data = req.body;
  const response = await create(data);
  return res.json201(response, message);
}
async function readProducts(req, res) {
  const message = "PRODUCTS FOUND";
  const response = await read();
  if (response.length > 0) {
    return res.json200(response, message);
  }
  return res.json404();
}
async function readPaginatedProducts(req, res) {
  const { id } = req.params;
  var filter = {}
  var sort = {}
  if (id) {
    filter = { _id: id }
  } else if (req.query.category || req.query.stock || req.query.sort) {
    if (req.query.category) { filter.category = req.query.category };
    if (req.query.stock) { filter.stock = { $gt: parseInt(req.query.stock) } }
    if (req.query.sort) {
      if (req.query.sort === 'asc') {
        sort = { price: 1 }
      } else if (req.query.sort === 'desc') {
        sort = { price: -1 }
      } else {
        sort = {}
      }
    }
  }
  const limitNumber = req.query.limit || 10;
  const pg = req.query.page || 1;
  const message = "PRODUCTS FOUND";
  const response = await readPaginated(limitNumber, pg, filter, sort);
  if (response.totalDocs > 0) {
    return res.json200(response, message);
  }
  return res.json404();
}
async function updateProduct(req, res) {
  const { id } = req.params;
  const data = req.body;
  const message = "PRODUCT UPDATED";
  const response = await update(id, data);
  if (response) {
    return res.json200(response, message);
  }
  return res.json404();
}
async function destroyProduct(req, res) {
  const { id } = req.params;
  const message = "PRODUCT DELETED";
  const response = await destroy(id);
  if (response) {
    return res.json200(response, message);
  }
  return res.json404();
}