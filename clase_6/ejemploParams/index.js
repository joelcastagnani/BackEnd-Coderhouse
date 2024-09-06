import express from "express";
const app = express();
let port = 8080;
app.use(express.urlencoded({ extended: true }));

const usuarios = [
  {
    id: 1,
    nombre: "Juan",
    apellido: "Pérez",
    edad: 25,
  },
  {
    id: 2,
    nombre: "María",
    apellido: "González",
    edad: 30,
  },
  {
    id: 3,
    nombre: "Carlos",
    apellido: "Rodríguez",
    edad: 22,
  },
  {
    id: 4,
    nombre: "Ana",
    apellido: "Fernández",
    edad: 28,
  },
];

app.get("/usuarios", (req, res) => {
  res.send(usuarios);
});
app.get("/usuarios/:userId", (req, res) => {
  const userId = req.params.userId;

  let usuario = usuarios.find((u) => u.id == userId);
  console.log(usuario);

  if (!usuario) {
    return res.send({ error: "Usuario no encontrado" });
  }

  res.send({ usuario });
});
app.get("/unParametro/:nombre", (req, res) => {
  const nombre = req.params.nombre;

  res.send(`Bienvenido, ${nombre}`);
});
app.get("/ejemploQueries", (req, res) => {
  let { nombre, apellido, edad } = req.query;
  res.send(`Bienvenido, ${nombre} ${apellido} de ${edad} años`); //http://localhost:8080/ejemploQueries?nombre=joel&apellido=casta&edad=29
});

app.listen(port, () => {
  console.log("Estoy levantado en el puerto 8080");
});
