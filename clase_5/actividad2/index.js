const fs = require("fs");
const Blob = require("buffer").Blob;

const manejoJson = async () => {
  try {
    let jsonParseado = JSON.parse(
      await fs.promises.readFile("package.json", "utf-8")
    );

    const info = {
      contenidoStr: JSON.stringify(jsonParseado),
      contenidoObj: jsonParseado,
      size: new Blob([jsonParseado]).size,
    };

    console.log(info);

    await fs.promises.writeFile("info.json", JSON.stringify(info));
  } catch (error) {
    throw new Error(error);
  }
};

manejoJson();
