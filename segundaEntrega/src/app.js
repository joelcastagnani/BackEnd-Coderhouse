//node --watch src/app.js
import express from "express";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.js";
import __dirname from "./utils.js";

const port = 8080;
const app = express();

app.engine("handlebars", handlebars.engine());

app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use("/", viewsRouter);

const server = app.listen(port, () => {
  console.log(`Servidor de la segunda entrega corriendo en el puerto ${port}`);
});
