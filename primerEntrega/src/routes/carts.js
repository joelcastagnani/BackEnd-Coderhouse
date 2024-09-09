import { Router } from "express";
import fs from "fs";

const router = Router();
let carts = [];

router.post("/", (req, res) => {
  const { products } = req.body;

  if (!Array.isArray(products)) {
    return res.status(400).json({
      error: true,
      message: "El campo 'products' debe ser un array.",
    });
  }

  const newCart = {
    id: carts.length + 1,
    products: products.map((product) => ({
      productId: product.id,
      quantity: product.quantity || 1,
    })),
  };

  carts.push(newCart);
  res.status(201).json(newCart);
});
router.get("/:cid", (req, res) => {
  const { cid } = req.params;

  const cart = carts.find((c) => c.id == cid);

  if (!cart) {
    return res.status(404).json({
      error: {
        code: "CART_NOT_FOUND",
        message: `Carrito con ID ${cid} no encontrado`,
      },
    });
  }

  res.send({ cart });
});
router.post("/:cid/product/:pid", (req, res) => {
  const { cid, pid } = req.params;

  // enceuentra el carrito por el id que le pase
  const cart = carts.find((c) => c.id == cid);

  //si no ta, te tira error
  if (!cart) {
    return res.status(404).json({
      error: {
        code: "CART_NOT_FOUND",
        message: `Carrito con ID ${cid} no encontrado`,
      },
    });
  }

  // existe el p?
  const existingProduct = cart.products.find((p) => p.productId == pid);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.products.push({ productId: pid, quantity: 1 });
  }

  res.status(200).json({
    message: `Producto con ID ${pid} agregado al carrito con ID ${cid}`,
    cart,
  });
});

export default router;
