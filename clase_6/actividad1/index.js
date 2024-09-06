import express from "express";

const app = express();
let port = 8080;

app.get("/bienvenida", (req, res) => {
  res.send(
    '<p style="color: blue;">Bienvenido al servidor Express en el puerto 8080!</p>'
  );
});
app.get("/usuario", (req, res) => {
  const usuarioFalso = {
    nombre: "Joel",
    apellido: "Castagnani",
    edad: 29,
    correo: "jcastagnani@gmail.com",
  };

  console.log(usuarioFalso);
  res.send(usuarioFalso);
});

app.listen(port, () => {
  console.log("Estoy levantado en el puerto 8080 de la actividad 1");
});
