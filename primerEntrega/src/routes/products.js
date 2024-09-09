import { Router } from "express";

const router = Router();
let products = [];

router.get("/", (req, res) => {
  let { limit } = req.query;
  if (limit) {
    limit = parseInt(limit, 10);
    res.json(products.slice(0, limit));
  } else {
    res.json(products);
  }
});
router.get("/:pid", (req, res) => {
  const productID = req.params.pid;

  let product = products.find((p) => p.id == productID); //Despues tenes que asegurarte que los productos tengan un campo que sea ID

  if (!product) {
    return res.status(404).json({
      error: {
        code: "PRODUCT_NOT_FOUND",
        message: `Producto con ID ${productID} no encontrado`,
      },
    });
  }

  res.send({ product });
});
router.post("/", (req, res) => {
  const {
    title,
    description,
    code,
    price,
    status = true,
    stock,
    category,
  } = req.body;

  if (!title || !description || !code || !price || !stock || !category) {
    return res
      .status(400)
      .json({ error: "Todos los campos son obligatorios, excepto thumbnails" });
  }

  const newProduct = {
    id: Number(products.length + 1),
    title,
    description,
    code,
    price: Number(price),
    status: Boolean(status),
    stock: Number(stock),
    category,
  };

  products.push(newProduct);

  res.status(201).json({ status: "success", product: newProduct });
});
router.put("/:pid", (req, res) => {
  const { pid } = req.params;
  const updateProduct = req.body;

  const index = products.findIndex((p) => p.id == pid);

  if (index === -1) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  if (
    !updateProduct.title ||
    !updateProduct.code ||
    !updateProduct.category ||
    !updateProduct.description ||
    !updateProduct.price ||
    !updateProduct.stock ||
    !updateProduct.status
  ) {
    return res.status(422).json({
      error: {
        code: "422 - INCOMPLETE_VALUES",
        message: "Valores incompletos",
      },
    });
  }

  products[index] = updateProduct;

  res.status(200).json({
    message: "Producto actualizado correctamente",
    product: products[index],
  });
});
router.delete("/:pid", (req, res) => {
  const { pid } = req.params;
  let currentLength = products.length;

  products = products.filter((p) => pid != p.id);

  if (products.length == currentLength) {
    return res
      .status(404)
      .send({ status: "error", error: "Porducto no eliminado" });
  }

  res.send({ status: "success", message: products });
});

export default router;
