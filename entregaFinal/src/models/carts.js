import mongoose from "mongoose";
import Products from "../managers/products.js";
import { type } from "os";

const cartsCollection = "Carts";

const cartItemSchema = mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});
const cartsSchema = mongoose.Schema({
  items: [cartItemSchema], //array de productos que contiene el carrito
  totalPrice: Number,
  date: {
    type: Date,
    default: Date.now(),
  },
});

export const cartsModel = mongoose.model(cartsCollection, cartsSchema);
