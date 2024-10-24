import { Router } from "express";
import Products from "../managers/products.js";
import Carts from "../managers/carts.js";

const router = Router();

const productsManager = new Products();
const cartsManager = new Carts();

router.get("/", async (req, res) => {
  const products = await productsManager.getAll();
  const carts = await cartsManager.getAll();

  res.render("home", { products, carts });
});
router.get("/products", async (req, res) => {
  const products = await productsManager.getAll();
  res.render("products", { products });
});
router.get("/carts", async (req, res) => {
  const carts = await cartsManager.getAll();
  res.render("carts", { carts });
});

export default router;
