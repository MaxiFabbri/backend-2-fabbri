import dao from "../dao/index.factory.js"
const { CartsManager } = dao

  async function createCartService(data) {
    const response = await CartsManager.create(data);
    return response
  }
  async function readOneCartService(id) {
    const response = await CartsManager.readById(id);
    return response
  }

  async function readByUserIdService(user_id) {
    const response = await  CartsManager.readByUserId( {user_id} )
    return response
  }
  
  async function updateCartService(id, data) {
    const response = await CartsManager.update(id, data)
    return response
  }
  
  async function destroyCartService() {
    const response = await CartsManager.destroy(id)
    return response
  }
  

  export { createCartService, readOneCartService, readByUserIdService, updateCartService, destroyCartService };
