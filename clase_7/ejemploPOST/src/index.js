//node --watch .\src\index.js
import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = [];

app.get("/api/users", (req, res) => {
  res.send(users);
});

app.post("/api/users", (req, res) => {
  const user = req.body;

  if (!user.firstName || !user.lastName || !user.id) {
    return res
      .status(400)
      .send({ status: "error", error: "valores incompletos" });
  }

  users.push(user);

  res.send({ status: "success", message: "usuario creado" });
});

app.listen(8080, () => {
  console.log("servidor levantado en puerto 8080, en ejemplo post");
});
