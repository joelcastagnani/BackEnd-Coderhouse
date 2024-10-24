import express from "express";
import __dirname from "./utils.js";
import mongoose from "mongoose";
import { engine } from "express-handlebars";
import path from "path";
import { Server } from "socket.io";

import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/carts.js";
import viewsRouter from "./routes/views.js";
import { productsModel } from "./models/products.js";
import { cartsModel } from "./models/carts.js";

const app = express();
const port = 8080;

const connection = mongoose.connect(
  "mongodb+srv://jcastagnani:backend123@backend-coderhouse.5lryv.mongodb.net/entregaFinal" //esto podria llegar a tener que cambiar
);

app.engine("handlebars", engine());

app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + "/public"));
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

const server = app.listen(port, () => {
  console.log(`Servidor de la entrega final ON en puerto ${port}`);
});

const io = new Server(server);

io.on("connection", async (socket) => {
  const products = await productsModel.find();
  socket.emit("updateProducts", products);
  socket.on("addProduct", async (product) => {
    const newProduct = new productsModel({
      ...product,
      status: true,
    });

    await newProduct.save();

    const updatedProducts = await productsModel.find();
    io.emit("updatedProducts", updatedProducts);
  });

  const carts = await cartsModel.find();
  socket.emit("updateCarts", carts)
  socket.on("addCart", async (cart) => {
    const newCart = new cartsModel({
      ...cart
    });

    await newCart.save();

    const updatedCarts = await cartsModel.find();
    io.emit("updatedCarts", updatedCarts);
  });
});
