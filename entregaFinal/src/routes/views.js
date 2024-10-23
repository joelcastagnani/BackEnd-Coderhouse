import { Router } from "express";
import Products from "../managers/products.js";

const router = Router();
const productsManager = new Products();

router.get("/products", async (req, res) => {
  const products = await productsManager.getAll();
  res.render("products", { products });
});

export default router;
