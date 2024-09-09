import express from "express";

import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/carts.js";

const app = express();

const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRouter);
app.use("/api/carts/", cartsRouter);

app.get("/", (req, res) => {
  res.send("Servido de la primer entrega en funcionando en el puerto 8080.");
});

app.listen(port, () => {
  console.log("Server ON - Primera entrega.");
});
