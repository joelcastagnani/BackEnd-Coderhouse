import { Router } from "express";
import Products from "../managers/products.js";
import { uploader } from "../utils.js";

const router = Router();
const productsManager = new Products();

router.get("/", async (req, res) => {
  const products = await productsManager.getAll();
  res.send({ status: "success", payload: products });
});

router.post("/", uploader.single("thumbnail"), async (req, res) => {
  try {
    const photoRoute = `http://localhost:8080/images/${req.file.filename}`;
    const products = await productsManager.saveProducts(req.body, photoRoute);
    res.send({ status: "success", payload: products });
  } catch (error) {}
});

export default router;
