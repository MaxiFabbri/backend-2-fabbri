import {
    create,
    readByUserId,
    update,
    destroy,
  } from "../dao/mongo/managers/carts.manager.js";

  async function createCartService() {
    const response = await create(data);
    return response
  }

  async function readByUserIdService(user_id) {
    const response = await  readByUserId({ user_id })
    return response
  }
  
  async function updateCartService(id, data) {
    const response = await update(id, data)
    return response
  }
  
  async function destroyCartService() {
    const response = await destroy(id)
    return response
  }
  

  export { createCartService, readByUserIdService, updateCartService, destroyCartService };
