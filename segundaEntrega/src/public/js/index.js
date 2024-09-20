const socket = io();

socket.on("updateProducts", (products) => {
  const productsList = document.getElementById("productsList");
  if (productsList) {
    productsList.innerHTML = "";
    products.forEach((product) => {
      const li = document.createElement("li");
      li.textContent = `ID: ${product.id} - ${product.title} - ${product.price}`;
      productsList.appendChild(li);
    });
  }
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

    socket.emit("addProduct", newProduct);
  });
}
