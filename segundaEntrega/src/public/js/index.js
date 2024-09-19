const socket = io();
let user;
let chatBox = document.getElementById("chatBox");

Swal.fire({
  title: "Identificate",
  input: "text",
  text: "Ingresa un nombre para identificarte en el chat:",
  inputValidator: (value) => {
    return !value && "Necesitas escribir un nombre de usuario";
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
  socket.emit("authenticated", user);
});

chatBox.addEventListener("keyup", (evt) => {
  if (evt.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      // console.log("User", user);
      // console.log("Message", chatBox.value);
      socket.emit("message", { user, message: chatBox.value });
      chatBox.value = "";
    }
  }
});

socket.on("messageLogs", (data) => {
  if (!user) {
    return;
  }

  let log = document.getElementById("messageLogs");
  let messages = [];
  data.forEach((message) => {
    messages += `${message.user} dice: ${message.message} <br>`;
  });

  log.innerHTML = messages;
});
socket.on("newUserConnected", (data) => {
  if (!user) {
    return;
  }
  Swal.fire({
    toast: true,
    position: "top-right",
    text: "Nuevo usuario conectado",
    title: `${data} se ha unido al chat`,
    timer: 2000,
    showConfirmButton: false,
  });
});
