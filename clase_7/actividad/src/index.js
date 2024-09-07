import express from "express";
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let frase = "frase inicial";

app.get("/api/frase", (req, res) => {
  res.send(frase);
});
app.get("/api/palabras/:pos", (req, res) => {
  const pos = +req.params.pos;

  if (isNaN(pos)) {
    return res
      .status(400)
      .send({ status: "error", error: "Debe enviar un numero" });
  }

  const palabras = frase.split(" ");

  res.send({ palabra: palabras[pos - 1] });
});
app.post("/api/palabras", (req, res) => {
  const palabra = req.body.palabra;

  frase = `${frase} ${palabra}`;

  res.send({ palabra, pos: frase.split(" ").length });
});
app.put("/api/palabras/:pos", (req, res) => {
  const pos = +req.params.pos;
  console.log(pos);

  const palabra = req.body.palabra;

  if (isNaN(pos)) {
    return res
      .status(400)
      .send({ status: "error", error: "Debe enviar un numero" });
  }

  const palabras = frase.split(" ");

  const anterior = palabras[pos - 1];
  palabras[pos - 1] = palabra;

  frase = palabras.join(" ");

  res.send({ actualizada: palabra, anterior });
});

app.listen(port, () => {
  console.log(
    "servidor levantado en puerto 8080, en la actividad de la calse 7"
  );
});
