import { cartsModel } from "../models/carts.js";
import { productsModel } from "../models/products.js";

export default class Carts {
  constructor() {}

  getAll = async () => {
    const carts = await cartsModel.find().populate('items.productId');
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

      if (!cart) throw new Error("Carrito no encontrado");

      cart.items.push({
        productId: product._id,
        quantity: 1,
      });

      await cartsModel.updateOne({ _id: idCart }, { items: cart.items });
    } catch (error) {
      throw error;
    }
  };
  removeProductFromCart = async (cid, pid) => {
    try {
      const cart = await cartsModel.findOne({ _id: cid });

      if (!cart) throw new Error("Carrito no encontrado");

      const productIndex = cart.items.findIndex(
        (item) => item.productId.toString() === pid
      );

      if (productIndex === -1)
        throw new Error("Producto no encontrado en el carrito");

      cart.items.splice(productIndex, 1);

      await cartsModel.updateOne({ _id: cid }, { items: cart.items });

      return cart;
    } catch (error) {
      throw error;
    }
  };
  updateCart = async (cid, newItems) => {
    try {
      const cart = await cartsModel.findOne({ _id: cid });

      if (!cart) throw new Error("Carrito no encontrado");

      cart.items = newItems;

      await cartsModel.updateOne({ _id: cid }, { items: cart.items });

      return cart;
    } catch (error) {
      console.error("Error en updateCart:", error);
      throw new Error(error.message); 
    }
  };
  updateProductQuantity = async (cid, pid, quantity) => {
    try {
      const cart = await cartsModel.findOne({ _id: cid });
      
      if (!cart) throw new Error("Carrito no encontrado");
  
      const productIndex = cart.items.findIndex(
        (item) => item.productId.toString() === pid
      );
  
      if (productIndex === -1) throw new Error("Producto no encontrado en el carrito");
  
      // Actualiza la cantidad del producto
      cart.items[productIndex].quantity = quantity;
  
      // Guarda los cambios en la base de datos
      await cartsModel.updateOne({ _id: cid }, { items: cart.items });
  
      return cart; // Devuelve el carrito actualizado
    } catch (error) {
      throw error;
    }
  };
  clearCart = async (cid) => {
    try {
      const cart = await cartsModel.findOne({ _id: cid });
      if (!cart) throw new Error("Carrito no encontrado");

      cart.items = [];
  
      await cartsModel.updateOne({ _id: cid }, { items: cart.items });
  
      return cart;
    } catch (error) {
      throw error;
    }
  };
}
