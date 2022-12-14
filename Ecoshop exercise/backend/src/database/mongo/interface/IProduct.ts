import { Document } from "mongoose";

export default interface IProduct extends Document {
    
    id: number;
    name: string;
    detail: string;
    description: string;
    brand: string;
    price: number;
    discount: number[];
    image: string;
}