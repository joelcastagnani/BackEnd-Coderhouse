import express from "express";
import usersRouter from "./routes/users.js";
import petsRouter from "./routes/pets.js";
import __dirname from "./utils.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + "/public"));
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);

app.get("/", (req, res) => {
  res.send("servidor en funcionamiento, clase 8");
});

const server = app.listen(8080, () => {
  console.log("Server ON, clase 8");
});
