import { Schema, model } from "mongoose";
import IProduct from "../interface/IProduct";

const productsSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Array,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

export default model<IProduct>('products', productsSchema);