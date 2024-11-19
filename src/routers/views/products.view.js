import { Router } from "express";
import { read } from "../../data/mongo/managers/products.manager.js";
import ProductController from '../../data/mongo/managers/products.manager.js';

const controller = new ProductController

const productsViewsRouter = Router()

productsViewsRouter.get("/newproduct", (req,res,next) => {
    console.log("newproduct render")
    return res.render('newproduct')
})

productsViewsRouter.get("/:id?",async (req, res, next) => {    
    const { id }  = req.params;
    var filter = {}
    var sort = {}
    if (id) {
        filter = { _id: id }
    } else if (req.query.category || req.query.stock || req.query.sort) {
        if(req.query.category) {filter.category =  req.query.category};
        if(req.query.stock) {filter.stock = { $gt: parseInt(req.query.stock)}}
        if(req.query.sort){
            if (req.query.sort === 'asc') {
                sort = {price: 1}
            } else if (req.query.sort === 'desc'){
                sort = {price: -1}
            } else {
                sort = {}
            }
        }
    } 
    const limitNumber = req.query.limit || 10; 
    const pg = req.query.page || 1;
    const data = await controller.get(limitNumber, pg, filter, sort)
    if(data) {
        res.status(200).render('products', {products: data});
    } else {
        res.status(404).send({ error: 'Dato invalido', data: "" });
    }
})


export default productsViewsRouter