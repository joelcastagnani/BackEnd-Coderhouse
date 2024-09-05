const fs = require("fs");
const path = "files/ejemplo.txt";

const operacionesAsync = async () => {
  try {
    await fs.promises.writeFile(
      path,
      "Estoy escribiendo un ejemplo de archivos con promesas"
    );
    let resultado = await fs.promises.readFile(path, "utf-8");
    console.log(resultado);
  } catch (error) {}
};
//m da paja editarlo y borrarlo
operacionesAsync();
