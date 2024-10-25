import mongoose from "mongoose";
import Products from "../managers/products.js";


const cartsCollection = "Carts";

const cartItemSchema = mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'products',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});
const cartsSchema = mongoose.Schema({
  items: [cartItemSchema],
  totalPrice: Number,
  date: {
    type: Date,
    default: Date.now(),
  },
});

export const cartsModel = mongoose.model(cartsCollection, cartsSchema);
