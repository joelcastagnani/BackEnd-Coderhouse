//node --watch .\src\index.js
import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let users = [];

app.get("/api/users", (req, res) => {
  res.send(users);
});
app.post("/api/users", (req, res) => {
  const user = req.body;

  if (!user.firstName || !user.lastName || !user.id) {
    return res
      .status(422)
      .send({ status: "error", error: "valores incompletos" });
  }

  users.push(user);

  res.send({ status: "success", message: "usuario creado" });
});
app.put("/api/users/:id", (req, res) => {
  const userID = req.params.id;
  const updateUser = req.body;

  const index = users.findIndex((user) => user.id == userID);

  if (index === -1) {
    return res
      .status(404)
      .send({ status: "error", messsage: "Usuario no encontrado" });
  }
  if (!updateUser.firstName || !updateUser.lastName || !updateUser.id) {
    return res
      .status(422)
      .send({ status: "error", error: "valores incompletos" });
  }

  users[index] = updateUser;
  res.send({ status: "success", message: "Usuario editado" });
});
app.delete("/api/users/:id", (req, res) => {
  const userID = req.params.id;
  let currentLength = users.length;

  users = users.filter((user) => userID != user.id);

  if (users.length == currentLength) {
    return res
      .status(404)
      .send({ status: "error", error: "Usuario no encontrado" });
  }

  res.send({ status: "success", message: users });
});

app.listen(8080, () => {
  console.log("servidor levantado en puerto 8080, en ejemplo post");
});
