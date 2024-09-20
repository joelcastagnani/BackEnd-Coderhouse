//node --watch src/app.js
import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from "socket.io";
import productsRouter, { readProductsFromFile } from "./routes/products.js";

const port = 8080;
const app = express();

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + "/public"));

app.use("/api/products", productsRouter);

app.get("/home", async (req, res) => {
  try {
    const products = await readProductsFromFile();
    res.render("home", { products });
  } catch (error) {
    res.status(500).send("Error al cargar los rpoductos");
  }
});

const server = app.listen(port, () => {
  console.log(`Servidor de la segunda entrega corriendo en el puerto ${port}`);
});

const io = new Server(server);

/* EVENTOS DE EJEMPLO DEL WEBSOCKET
// Escuchar eventos de conexión de WebSocket
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  // Escuchar un evento personalizado
  socket.on('mensajeCliente', (msg) => {
    console.log('Mensaje recibido del cliente:', msg);

    // Enviar un mensaje de vuelta a todos los clientes conectados
    io.emit('mensajeServidor', `Servidor: ${msg}`);
  });

  // Manejar la desconexión del cliente
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});
*/
