import CustomRouter from "../utils/CustomRouter.util.js";
import apiRouter from "./api/index.api.js";
import viewsRouter from "./views/index.views.js";

class IndexRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.use("/api", ["PUBLIC"], apiRouter);
    this.use("/", ["PUBLIC"], viewsRouter);
  };
}

const indexRouter = new IndexRouter();
export default indexRouter.getRouter()

