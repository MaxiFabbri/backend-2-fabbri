import dao from "../dao/index.factory.js"
const { ProductsManager } = dao

async function createProductService(data) {
    const response = await ProductsManager.create(data);
    return response;
}
async function readProductService() {
    const response = await ProductsManager.read();
    return response;
}
async function readProductByIdService(productId) {
    const response = await ProductsManager.readById(productId);
    return response;
}
async function readProductPaginatedService(limitNumber, pg, filter, sort) {
    const response = await ProductsManager.readPaginated(limitNumber, pg, filter, sort);
    return response;
}
async function updateProductService(id, data) {
    const response = await ProductsManager.update(id, data);
    return response;
}
async function destroyProductService(id) {
    const response = await ProductsManager.destroy(id);
    return response;
}

export { createProductService, readProductByIdService, readProductService, readProductPaginatedService, updateProductService, destroyProductService }