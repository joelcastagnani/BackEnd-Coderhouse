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
const peliculas = [
  {
    id: 1,
    nombre: "el Padrino",
    genero: "drama",
  },
  {
    id: 2,
    nombre: "inception",
    genero: "drama",
  },
  {
    id: 3,
    nombre: "parásitos",
    genero: "suspenso",
  },
  {
    id: 4,
    nombre: "toy Story",
    genero: "drama",
  },
  {
    id: 5,
    nombre: "la la land",
    genero: "suspenso",
  },
  {
    id: 6,
    nombre: "gladiador",
    genero: "accion",
  },
  {
    id: 7,
    nombre: "el señor de los anillos",
    genero: "accion",
  },
  {
    id: 8,
    nombre: "matrix",
    genero: "accion",
  },
  {
    id: 9,
    nombre: "el caballero oscuro",
    genero: "accion",
  },
  {
    id: 10,
    nombre: "titanic",
    genero: "romance",
  },
  {
    id: 11,
    nombre: "el gran hotel budapest",
    genero: "romance",
  },
  {
    id: 12,
    nombre: "el silencio de los inocentes",
    genero: "romance",
  },
  {
    id: 13,
    nombre: "buscando a nemo",
    genero: "romance",
  },
  {
    id: 14,
    nombre: "pulp fiction",
    genero: "romance",
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
app.get("/peliculas", (req, res) => {
  const { genero } = req.query;
  const peliculasFiltradas = peliculas.filter(
    (pelicula) => pelicula.genero === genero
  );

  if (peliculasFiltradas.length <= 0) {
    res.send(`No existe pelicula con el genero ${genero}`);
    return;
  }
  res.send(peliculasFiltradas);
});

app.listen(port, () => {
  console.log("Estoy levantado en el puerto 8080");
});
