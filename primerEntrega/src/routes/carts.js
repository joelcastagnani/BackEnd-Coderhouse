import { Router } from "express";

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
    products: products,
  };

  carts.push(newCart);
  res.status(201).json(newCart);
});

export default router;
