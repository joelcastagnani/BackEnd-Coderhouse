import { Router } from "express";
import { readProductsFromFile } from "./products.js";

const router = Router();

router.get("/home", async (req, res) => {
  try {
    const products = await readProductsFromFile();
    res.render("home", { products });
  } catch (error) {
    res.status(500).send("Error al cargar los rpoductos");
  }
});
router.get("/realTimeProducts", async (req, res) => {
  res.render("realTimeProducts");
});

export default router;
