import { Router } from "express";
import fs from "fs/promises"; //importe el file system en "modo" ¿promesa? esto se lo pregunte a chat gpt, no entendi

const router = Router();
let CARTS_FILE = "./src/files/carts.json";

const readCartsFromFile = async () => {
  //Le aclaro a la fuincion que es asincronica por el async
  try {
    const data = await fs.readFile(CARTS_FILE, "utf-8"); //guardo los carritos en "data" asincronicamente
    return JSON.parse(data); //Si todo esta OK, devuelve los carritos guardados en "data"
  } catch (error) {
    return []; //Si el archivo no existe o esta vacio, retorno un array vacio (en modo de error)
  }
}; //Creo funcion para leer carritos desde el archivo json
const saveCartsToFile = async (carts) => {
  //la funcion es asincronica
  try {
    //si todo esta OK escribe los carritos en el archivo, con el await le digo que espere
    await fs.writeFile(CARTS_FILE, JSON.stringify(carts, null, 2), "utf-8"); //aca no entendi los parametros, se los pregunte a char gpt
  } catch (error) {
    console.error("Error al guardar los carritos", error);
  }
}; //Creo la funcion para guardar los carritos en el archivo JSON

router.post("/", async (req, res) => {
  const { products } = req.body;

  if (!Array.isArray(products)) {
    return res.status(400).json({
      error: true,
      message: "El campo 'products' debe ser un array.",
    });
  }

  const carts = await readCartsFromFile(); //si todo esta OK lee los carritos del archivo asincronicamente (i guess)

  const newCart = {
    id: carts.length + 1,
    products: products.map((product) => ({
      productId: product.id,
      quantity: product.quantity || 1,
    })),
  };

  carts.push(newCart);
  await saveCartsToFile(carts); //Guarda los carritos de "carts" en el archivo
  res.status(201).json(newCart); //si todo salio OK retorna el nuevo carrito
});
router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const carts = await readCartsFromFile();
  const cart = carts.find((c) => c.id == cid);

  if (!cart) {
    return res.status(404).json({
      error: {
        code: "CART_NOT_FOUND",
        message: `Carrito con ID ${cid} no encontrado`,
      },
    });
  }

  res.send({ cart });
});
router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const carts = await readCartsFromFile(); //lee el archivo
  // enceuentra el carrito por el id que le pase
  const cart = carts.find((c) => c.id == cid);

  //si no ta, te tira error
  if (!cart) {
    return res.status(404).json({
      error: {
        code: "CART_NOT_FOUND",
        message: `Carrito con ID ${cid} no encontrado`,
      },
    });
  }

  // existe el p?
  const existingProduct = cart.products.find((p) => p.productId == pid);

  if (existingProduct) {
    existingProduct.quantity += 1; //si existe, le suma uno a la cantidad
  } else {
    cart.products.push({ productId: pid, quantity: 1 }); //si no existe, crea el producto con cantidad 1
  }

  await saveCartsToFile(carts);

  res.status(200).json({
    message: `Producto con ID ${pid} agregado al carrito con ID ${cid}`,
    cart,
  });
});

export default router;
