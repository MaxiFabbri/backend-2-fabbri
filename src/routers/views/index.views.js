import CustomRouter from "../../utils/CustomRouter.util.js";
import productsViewRouter from "./products.view.js";
import usersViewsRouter from "./users.view.js";
//import cartsViewRouter from "./carts.view.js"

class IndexViews extends CustomRouter {
    constructor() {
        super();
        this.init();
    }
    init = () => {
        //this.use("/carts", ["USER", "ADMIN"], cartsViewRouter)
        this.use("/products", ["USER", "ADMIN"], productsViewRouter);
        this.use("/", ["PUBLIC"], usersViewsRouter);
    };
}

const indexViews = new IndexViews();
export default indexViews.getRouter();