import {Router} from "express";
import productController from "../controller/productController";

class productsRoute{

    public router: Router;
    private controller: productController;

    constructor(){

        this.router = Router();
        this.controller = new productController();
        this.config();
    }

    public config = () => {
        
        this.router.get("/products/:page", this.controller.getProducts);
        this.router.get("/products/:name", this.controller.getProductsByName);
        this.router.get("/products/:low&:upper", this.controller.getProductsByPrice);
        this.router.get("/product/:id", this.controller.getProductById);
        this.router.get("/images/:id", this.controller.getProductImage);
    }
}

export default productsRoute;