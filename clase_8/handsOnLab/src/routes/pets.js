import { Router } from "express";
import { uploader } from "../utils.js";

const router = Router();

const pets = [];

router.get("/", (req, res) => {
  res.send(pets);
});
router.post("/", uploader.single("file"), (req, res) => {
  if (!req.file) {
    return res
      .status(400)
      .send({ status: "error", error: "No se cargo ninguna imagen" });
  }

  console.log(req.file);
  const pet = req.body;
  pet.image = req.file.path;
  pets.push(pet);
  res.send({ status: "success" });
});

export default router;
