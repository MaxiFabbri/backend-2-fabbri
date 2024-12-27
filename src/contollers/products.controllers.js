import {
  createProductService,
  readProductService,
  readProductPaginatedService,
  updateProductService,
  destroyProductService
} from "../services/products.service.js"

async function createProduct(req, res) {
  const message = "PRODUCT CREATED";
  const data = req.body;
  const response = await createProductService(data);
  return res.json201(response, message);
}
async function readProducts(req, res) {
  const message = "PRODUCTS FOUND";
  const response = await readProductService();
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
  const response = await readProductPaginatedService(limitNumber, pg, filter, sort);
  if (response.totalDocs > 0) {
    return res.json200(response, message);
  }
  return res.json404();
}
async function updateProduct(req, res) {
  const { id } = req.params;
  const data = req.body;
  const message = "PRODUCT UPDATED";
  const response = await updateProductService(id, data);
  if (response) {
    return res.json200(response, message);
  }
  return res.json404();
}
async function destroyProduct(req, res) {
  const { id } = req.params;
  const message = "PRODUCT DELETED";
  const response = await destroyProductService(id);
  if (response) {
    return res.json200(response, message);
  }
  return res.json404();
}

export { createProduct, readProducts, readPaginatedProducts, updateProduct, destroyProduct };