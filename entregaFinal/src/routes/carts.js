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
  } catch (error) {}
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

export default router;
