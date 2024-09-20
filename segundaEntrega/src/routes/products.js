import { Router } from "express";
import fs from "fs/promises";

const router = Router();
let PRODUCTS_FILE = "./src/files/products.json";

export const readProductsFromFile = async () => {
  try {
    const data = await fs.readFile(PRODUCTS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};
const saveProductsToFile = async (products) => {
  try {
    await fs.writeFile(
      PRODUCTS_FILE,
      JSON.stringify(products, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.error("error al guardar los productos", error);
  }
};

router.get("/", async (req, res) => {
  let { limit } = req.query;
  const products = await readProductsFromFile();

  if (limit) {
    limit = parseInt(limit, 10);
    res.json(products.slice(0, limit));
  } else {
    res.json(products);
  }
});
router.get("/:pid", async (req, res) => {
  const productID = req.params.pid;
  const products = await readProductsFromFile();

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
router.post("/", async (req, res) => {
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

  const products = await readProductsFromFile();

  const newProduct = {
    id: Number(products.length + 1),
    title,
    description,
    code,
    price: Number(price),
    status: status === "true", // convierte el string "true" o "false" a booleano
    stock: Number(stock),
    category,
  };

  products.push(newProduct);
  await saveProductsToFile(products);
  res.status(201).json({ status: "success", product: newProduct });
});
router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const updateProduct = req.body;

  const products = await readProductsFromFile();
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
    updateProduct.status === undefined
  ) {
    return res.status(422).json({
      error: {
        code: "422 - INCOMPLETE_VALUES",
        message: "Valores incompletos",
      },
    });
  }

  products[index] = { ...products[index], ...updateProduct };

  await saveProductsToFile(products);

  res.status(200).json({
    message: "Producto actualizado correctamente",
    product: products[index],
  });
});
router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  const products = await readProductsFromFile();
  const currentLength = products.length;

  const updatedProducts = products.filter((p) => p.id != pid);

  if (updatedProducts.length == currentLength) {
    return res
      .status(404)
      .send({ status: "error", error: "Porducto no encontrado" });
  }

  await saveProductsToFile(updatedProducts);

  res.status(200).json({
    status: "success",
    message: `Producto con ID ${pid} eliminado correctamente`,
    products: updatedProducts,
  });
});

export default router;
