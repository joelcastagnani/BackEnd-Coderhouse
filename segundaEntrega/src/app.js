import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from "socket.io";
import productsRouter, {
  readProductsFromFile,
  saveProductsToFile,
} from "./routes/products.js";
import viewsRouter from "./routes/views.js";

const port = 8080;
const app = express();

//Handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + "/public"));

//Rutas
app.use("/api/products", productsRouter);
app.use("/", viewsRouter);

const server = app.listen(port, () => {
  console.log(`Servidor de la segunda entrega corriendo en el puerto ${port}`);
});

const io = new Server(server);

io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado");

  const products = await readProductsFromFile();
  socket.emit("updateProducts", products);

  socket.on("addProduct", async (product) => {
    const products = await readProductsFromFile();
    product.id = products.length + 1;
    product.status = true;
    products.push(product);

    await saveProductsToFile(products);

    io.emit("updateProducts", products);
  });
});

export { io };
