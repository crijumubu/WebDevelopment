"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = __importDefault(require("../model/model"));
//import Products from "../model/products";
class Controller {
    constructor() {
        this.model = new model_1.default();
    }
    index(req, res) {
        res.send("Welcome to Ecoshop backend!");
    }
    postProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productsModel = require("../model/products");
            const product = productsModel(req.body);
            product.save().then((data) => res.json(data));
        });
    }
    getProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productsModel = require("../model/products");
            const data = yield productsModel.find();
            res.json(data);
            //productsModel.find().then((data: any) => res.json(data));
        });
    }
}
exports.default = Controller;
