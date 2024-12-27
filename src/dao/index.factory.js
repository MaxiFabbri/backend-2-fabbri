import dbConnect from "../utils/dbConnect.util.js";
import envUtil from "../utils/env.util.js"

const { MODE } = envUtil;

let dao = {};

switch (MODE) {
  case "memory":
    console.log("atempting to connect to memory system");
    // si la persistencia es la memoria tengo que llenar dao con las importaciones de los managers de la memoria
    // const { default: ProductsManagerMemory } = await import(
    //   "./memory/ProductsManager.memory.js"
    // );
    // const { default: UsersManagerMemory } = await import(
    //   "./memory/UsersManager.memory.js"
    // );
    // const { default: CartsManagerMemory } = await import(
    //   "./memory/CartsManager.memory.js"
    // );
    // dao = {
    //   ProductsManager: ProductsManagerMemory,
    //   UsersManager: UsersManagerMemory,
    //   CartsManager: CartsManagerMemory,
    // };
    break;
  case "fs":
    console.log("atempting to connect to file system");
    break;
  default:
    console.log("connected to mongo database"); 
    dbConnect();
    // si la persistencia es mongo tengo que llenar dao con las importaciones de los managers de mongo
    const { default: ProductsManagerMongo } = await import(
      "./mongo/managers/products.manager.js"
    );
    const { default: UsersManagerMongo } = await import(
      "./mongo/managers/users.manager.js"
    );
    const { default: CartsManagerMongo } = await import(
      "./mongo/managers/carts.manager.js"
    );
    dao = {
      ProductsManager: ProductsManagerMongo,
      UsersManager: UsersManagerMongo,
      CartsManager: CartsManagerMongo,
    };
    break;
}

export default dao;