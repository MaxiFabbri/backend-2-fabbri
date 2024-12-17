import {
    create,
    read,
    readPaginated,
    update,
    destroy,
} from "../dao/mongo/managers/products.manager.js";

async function createProductService(data) {
    const response = await create(data);
    return response;
}
async function readProductService() {
    const response = await read();
    return response;
}
async function readProductPaginatedService(limitNumber, pg, filter, sort) {
    const response = await readPaginated(limitNumber, pg, filter, sort);
    return response;
}
async function updateProductService(id, data) {
    const response = await update(id, data);
    return response;
}
async function destroyProductService(id) {
    const response = await destroy(id);
    return response;
}

export { createProductService, readProductService, readProductPaginatedService, updateProductService, destroyProductService }