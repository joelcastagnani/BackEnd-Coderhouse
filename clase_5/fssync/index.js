const fs = require("fs");

//fs.writeFileSync("files/ejemplo.txt", "Holaaaa estoy en un archivo txttt");//crea el archivo txt y escribe

if (fs.existsSync("files/ejemplo.txt")) {
  //pregunta si el archivo existe
  let contenido = fs.readFileSync("files/ejemplo.txt", "utf-8"); //lee el archivo
  console.log(contenido);

  fs.appendFileSync("files/ejemplo.txt", "estoy editando el archivo"); //sobreescribe el archivo
  contenido = fs.readFileSync("files/ejemplo.txt", "utf-8");
  console.log(contenido);

  fs.unlinkSync("files/ejemplo.txt"); //borra el archivo txt
}
