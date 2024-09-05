const fs = require("fs");

fs.writeFile(
  "files/ejemplo.txt",
  "Holaaaa estoy en un archivo txt con callback",
  (error) => {
    if (error) {
      console.log("error al escribir el archivo");
    }
    fs.readFile("files/ejemplo.txt", "utf-8", (error, data) => {
      if (error) {
        console.log("error al leer el  archivo");
      }
      console.log(data);
      fs.appendFile(
        "files/ejemplo.txt",
        "estoy editando  un archivo con callbacks",
        (error) => {
          if (error) {
            console.log("error al editar el archivo");
          }
          fs.readFile("files/ejemplo.txt", "utf-8", (error, data) => {
            if (error) {
              console.log("error al leer el archivo");
            }
            console.log(data);
            fs.unlink("files/ejemplo.txt", (error) => {
              if (error) {
                console.log("error al eliminar el archivo");
              }
            });
          });
        }
      );
    });
  }
);
