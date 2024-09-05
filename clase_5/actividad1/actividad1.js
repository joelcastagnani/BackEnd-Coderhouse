const fs = require("fs");
const { readFile } = require("fs/promises");

const fecha = new Date().toLocaleDateString();
const hora = new Date().toLocaleTimeString();

const path = "files/actividad1.txt";

fs.writeFile(path, fecha + "-" + hora, (error) => {
  if (error) {
    console.log("Error al escribir el archivo en la actividad 1");
  }
  fs.readFile(path, "utf-8", (error, data) => {
    if (error) {
      console.log("error al leer el  archivo");
    }
    console.log(data);
  });
});
