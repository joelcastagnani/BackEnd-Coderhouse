import express from "express";

const app = express();
let port = 8080;

app.get("/saludo", (req, res) => {
  res.send("Ahora desde express");
});

app.listen(port, () => {
  console.log("Estoy levantado en el puerto 8080");
});
