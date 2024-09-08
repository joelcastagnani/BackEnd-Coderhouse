import { Router } from "express";

const router = Router();

const users = [];

// function mid1(req, res, next) {
//   req.dato1 = "dato 1";
//   next();
// }
// function mid2(req, res, next) {
//   req.dato2 = "dato 2";
//   next();
// }

router.get("/", (req, res) => {
  res.send(users);
});
router.post("/", (req, res) => {
  const user = req.body;
  users.push(user);
  res.send({ status: "success" });
});
export default router;
