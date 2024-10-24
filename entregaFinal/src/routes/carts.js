import { Router } from "express";
import Carts from "../managers/carts.js";

const router = Router();
const cartsManager = new Carts();

router.get("/", async (req, res) => {
  const carts = await cartsManager.getAll();
  res.send({ status: "success", payload: carts });
});
router.post("/", async (req, res) => {
  try {
    const carts = await cartsManager.saveCarts(req.body);
    res.send({ status: "success", payload: carts });
  } catch (error) {
    res.status(500).send({ status: "error", error });
  }
});
router.put("/:idProduct", async (req, res) => {
  try {
    const { idProduct } = req.params;
    const newCart = await cartsManager.saveCarts({
      userId: "userIdPlaceholder",
      items: [],
      totalPrice: 0,
    });

    await cartsManager.addProductToCart(idProduct, newCart._id); // Usa el nuevo carrito
    res.send({
      status: "success",
      payload: "Se creó un nuevo carrito y se agregó el producto.",
    });
  } catch (error) {
    res.status(500).send({ status: "error", error });
  }
});
router.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const result = await cartsManager.removeProductFromCart(cid, pid);
    if (result) {
      res.send({ status: "success", payload: "Producto eliminado del carrito." });
    } else {
      res.status(404).send({ status: "error", error: "Carrito o producto no encontrado." });
    }
  } catch (error) {
    res.status(500).send({ status: "error", error: error.message});
  }
});
router.put("/:cid", async (req, res) => {
  const { cid } = req.params;
  const { items } = req.body;

  

  if (!Array.isArray(items)) {
    return res.status(400).send({ status: "error", error: "Items debe ser un array." });
  }

  try {
    const updatedCart = await cartsManager.updateCart(cid, items);
    if (updatedCart) {
      res.send({ status: "success", payload: updatedCart });
    } else {
      res.status(404).send({ status: "error", error: "Carrito no encontrado." });
    }
  } catch (error) {
    console.error("Error en el endpoint PUT:", error);
    res.status(500).send({ status: "error", error: error.message || "Error desconocido" });
  }
});//esta no funciona y nose xq

export default router;
