import {
    create,
    read,
    update,
    destroy,
} from "../dao/mongo/managers/users.manager.js";

async function createUserService(data) {
    const response = await create(data);
    return response;
}
async function readUserService() {
    const response = await read();
    return response;
}
async function updateUserService(id, data) {
    const response = await update(id, data);
    return response;
}
async function destroyUserService() {
    const response = destroy(id);
    return response;
}

export { createUserService, readUserService, updateUserService, destroyUserService }