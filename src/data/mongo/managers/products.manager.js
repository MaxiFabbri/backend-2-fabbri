import Product from "../models/product.model.js";
import Manager from "./manager.js";

const productsManager = new Manager(Product)
const { create, read, readPaginated, update, destroy } = productsManager

export { create, read, readPaginated, update, destroy }



// class ProductController {
//     constructor() {}

//     // get = async () => {
//     //     try {
//     //         return await read()
//     //     } catch (error) {
//     //         return error.message;
//     //     }
//     // }

//     // Metodo para ver productos con paginados, filtrados y ordenados
//     // get = async (limitNumber,pg,filter,sort) => {
//     //     try {
//     //         return await readPaginated(filter, {
//     //             limit: limitNumber,
//     //              page: pg,
//     //              sort: sort,
//     //              lean: true});
//     //     } catch (err) {
//     //         return err.message;
//     //     }
//     // }

//     // Metodo para Cargar un producto
//     add = async (data) => {
//         try {
//             return await Product.create(data);
//         } catch (err) {
//             return err.message;
//         }
//     }

//     // Metodo para actualizar un producto
//     update = async (filter, updated, options) => {
//         try {
//             return await Product.findOneAndUpdate(filter, updated, options);
//         } catch (err) {
//             return err.message;
//         }
//     }

//     // Metodo para eliminar un producto
//     delete = async (filter, options) => {
//         try {
//             return await Product.findOneAndDelete(filter, options);
//         } catch (err) {
//             return err.message;
//         }
//     }
// }


// export default ProductController;