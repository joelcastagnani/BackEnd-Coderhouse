import { Router } from "express";
import Products from "../managers/products.js";
import { uploader } from "../utils.js";
import { title } from "process";

const router = Router();
const productsManager = new Products();

router.get("/", async (req, res) => {
  const {
    limit = 10,
    page = 1,
    sort,
    query,
    category,
    availability,
  } = req.query;

  const limitNum = parseInt(limit, 10) || 10;
  const pageNum = parseInt(page, 10) || 1;

  const filter = {};
  if (query) {
    filter.$or = [
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
      { category: { $regex: query, $options: "i" } }, // Buusqueda por categorqa
      { available: query === "true" }, // Busqueda por disponibilidaddd
    ];
  }

  if (category) {
    filter.available = availability === "true"; //lo paso a booleano pero no se si estra bien esto
  }

  const options = {
    page: pageNum,
    limit: limitNum,
    sort: sort === "asc" ? { price: 1 } : sort === "des" ? { price: -1 } : {},
  };

  try {
    const result = await productsManager.paginate(filter, options);
    res.send({
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage
        ? `/api/products?page=${result.prevPage}&limit=${limitNum}`
        : null,
      nextLink: result.hasNextPage
        ? `/api/products?page=${result.nextPage}&limit=${limitNum}`
        : null,
    });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
});
router.post("/", uploader.single("thumbnail"), async (req, res) => {
  try {
    const photoRoute = `http://localhost:8080/images/${req.file.filename}`;
    const products = await productsManager.saveProducts(req.body, photoRoute);
    res.send({ status: "success", payload: products });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
});

export default router;
