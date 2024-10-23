//node --watch .\src\app.js
import express from "express";
import __dirname from "./utils.js";
import handlebars from "handlebars";
import { engine } from "express-handlebars";
import productsRouter from "./routes/products.js";
import mongoose from "mongoose";
import path from "path";
import viewsRouter from "./routes/views.js";

const app = express();
const port = 8080;

const connection = mongoose.connect(
  "mongodb+srv://jcastagnani:backend123@backend-coderhouse.5lryv.mongodb.net/entregaFinal"
);

app.engine("handlebars", engine());

app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + "/public"));
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use("/api/products", productsRouter);
app.use("/", viewsRouter);

const server = app.listen(port, () => {
  console.log(`Servidor de la entrega final ON en puerto ${port}`);
});
