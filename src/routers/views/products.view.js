import CustomRouter from "../../utils/CustomRouter.util.js";

class ProductsViewsRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }
    init = () => {
        //this.use("/carts", ["USER", "ADMIN"], cartsViewRouter)
        this.use("/newproduct", ["ADMIN"], renderNewProduct);
        this.use("/:id?", ["USER", "ADMIN"], renderProducts);
    };
}

const productsViewsRouter = new ProductsViewsRouter();
export default productsViewsRouter.getRouter();


function renderNewProduct (req, res, next) {
    return res.render('newproduct')
}
 
async function renderProducts(req, res, next) {
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
    //console.log("get products: ", limitNumber, " pg ", pg, " filter ", filter, " Sort: ", sort)
    
    const url = `http://localhost:9000/api/products?limit=${limitNumber}&page=${pg}`
    const options = {
        headers: { "Content-Type": "application/json" },
    };
    
    let response = await fetch(url, options)
    response = await response.json()
    const data = response.response

    if (data) {
        res.status(200).render('products', { products: data });
    } else {
        res.status(404).send({ error: 'Dato invalido', data: "" });
    }
}
