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
router.put("/:idProduct/:idCart", async (req, res) => {
  try {
    const { idProduct, idCart } = req.params;
    const result = await cartsManager.addProductToCart(idProduct, idCart);
    res.send({
      status: "success",
      payload: "Se agrego el producto al carrito correctamente.",
    });
  } catch (error) {
    res.status(500).send({ status: "error", error });
  }
});

export default router;
