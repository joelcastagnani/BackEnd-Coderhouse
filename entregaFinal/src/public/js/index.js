const socket = io();

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};


const renderProducts = (products) => {
  const productsList = document.getElementById("products-list");
  if (productsList) {
    productsList.innerHTML = "";
    products.forEach((product) => {
      const li = document.createElement("li");
      li.innerHTML = `
                <img src=${product.photo} />
                <h4>${product.title}</h4>
                <p>${product.description}</p>
                <p>Precio: $${product.price}</p>
                <button onclick="addToCart('${product._id}')">Agregar al Carrito</button>
            `;
      productsList.appendChild(li);
    });
  }
};
const renderCarts = (carts) => {
  const cartsList = document.getElementById("carts-list");
  if (cartsList) {
    cartsList.innerHTML = "";
    carts.forEach((cart) => {
      const li = document.createElement("li");
      li.className = "cart-item";
      li.innerHTML = `
                <p>ID:${cart._id}</p>
                <p>fecha: ${formatDate(cart.date)}</p>
                <ul class="cartProducts">
                  ${cart.items
                    .map(
                      (item) => `
                    <li>
                      Producto id: ${item.productId} - Cantidad: ${item.quantity}
                    </li>
                `
                    )
                    .join("")}
                </ul>
                
            `;
      cartsList.appendChild(li);
    });
  }
};

const addToCart = async (productId) => {
  try {
    const response = await fetch(`/api/carts/${productId}`, {
      method: "PUT",
    });
    const data = await response.json();
    alert(data.payload); // Muestra un mensaje de éxito
  } catch (error) {
    console.error("Error al agregar al carrito:", error);
    alert("Error al agregar al carrito");
  }
};

socket.on("updateProducts", (products) => {
  renderProducts(products);
});
socket.on("updatedProducts", (products) => {
  renderProducts(products);
});

socket.on("updateCarts", (carts) => {
  renderCarts(carts);
});
socket.on("updatedCarts", (carts) => {
  renderCarts(carts);
});

const form = document.getElementById("productForm");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const newProduct = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      code: document.getElementById("code").value,
      price: document.getElementById("price").value,
      stock: document.getElementById("stock").value,
      category: document.getElementById("category").value,
    };

    const photoInput = document.getElementById("photo");
    const file = photoInput.files[0];

    if (file) {
      const reader = new FileReader(); // Crea un nuevo objeto FileReader para leer el archivo

      reader.onloadend = () => {
        newProduct.photo = reader.result; // Al finalizar la lectura, asigna la URL base64 a newProduct
        socket.emit("addProduct", newProduct); // Envía el nuevo producto con la imagen
        form.reset(); // Resetea el formulario
      };

      reader.readAsDataURL(file); // Lee el archivo como una URL base64
    } else {
      // Maneja el caso en que no hay archivo seleccionado
      socket.emit("addProduct", newProduct); // Envía el producto sin imagen
      form.reset();
    }
  });
}
