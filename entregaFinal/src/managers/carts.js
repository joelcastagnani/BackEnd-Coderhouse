import { cartsModel } from "../models/carts.js";
import { productsModel } from "../models/products.js";

export default class Carts {
  constructor() {}

  getAll = async () => {
    const carts = await cartsModel.find();
    return carts.map((cart) => cart.toObject());
  };

  saveCarts = async (cart) => {
    try {
      const result = await cartsModel.create(cart);
      return result;
    } catch (error) {
      throw error;
    }
  };
  addProductToCart = async (idProduct, idCart) => {
    try {
      const product = await productsModel.findOne({ _id: idProduct });
      const cart = await cartsModel.findOne({ _id: idCart });

      cart.items.push({
        title: product.title,
        productId: product.productId,
        quantity: product.quantity,
      });

      await cartsModel.updateOne({ _id: idCart }, cart);
    } catch (error) {
      throw error;
    }
  };
}
