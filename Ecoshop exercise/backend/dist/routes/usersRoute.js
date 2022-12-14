"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controller/userController"));
class usersRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.controller = new userController_1.default();
        this.config();
    }
    config() {
        this.router.get('/:id', this.controller.getUser);
        this.router.get('/favorites/:email/pages', this.controller.getTotalFavorites);
        this.router.get('/favorites/:email/:page', this.controller.getFavorites);
        this.router.post('/login', this.controller.signIn);
        this.router.post('/register', this.controller.signUp);
        this.router.post('/addFavorite', this.controller.addFavorite);
        this.router.post('/removeFavorite', this.controller.removeFavorite);
        this.router.get('/cart/:email', this.controller.getShoppingCart);
        this.router.post('/addToCart', this.controller.addToCart);
        this.router.post('/removeToCart', this.controller.removeToCart);
    }
}
exports.default = usersRoute;
