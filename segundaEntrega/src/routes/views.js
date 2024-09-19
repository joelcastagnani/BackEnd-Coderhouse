import express from "express";
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("index", {
    mensaje: "Contenido que se le dio a la variable desde el res.render",
  });
});

export default router;
