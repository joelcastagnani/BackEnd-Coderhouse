const crypto = require("crypto");
const fs = require("fs");

class UserManager {
  path = "files/users.txt";
  constructor() {}

  mostrarUsuarios = async () => {
    if (fs.existsSync(this.path)) {
      const data = await fs.promises.readFile(this.path, "utf-8");
      const users = JSON.parse(data);
      console.log(users);

      return users;
    }
    return [];
  };
  crearUsuario = async (nombre, apellido, nombreUsuario, password) => {
    const users = await this.mostrarUsuarios();
    const usuario = {
      nombre,
      apellido,
      nombreUsuario,
      password,
    };

    // usuario.salt = crypto.randomBytes(128).toString("base64");

    // usuario.password = crypto
    //   .createHmac("sha256", usuario.salt)
    //   .update(usuario.password)
    //   .digest("hex"); Aca se hashea la contraceña, pero para este ej no lo usamos (Funciona)

    users.push(usuario);
    await fs.promises.writeFile(this.path, JSON.stringify(users));
    return usuario;
  };
  validarUsuario = async (nombreUsuario, password) => {
    const usuarios = await this.mostrarUsuarios();
    const usuariosIndex = usuarios.findIndex(
      (user) => user.nombreUsuario == nombreUsuario
    );

    if (usuariosIndex == -1) {
      console.log("Error: El usuario no existe");
      return;
    }

    const usuario = usuarios[usuariosIndex];
    const newHash = crypto
      .createHmac("sha256", usuario.salt)
      .update(password)
      .digest("hex");

    if (newHash == usuario.password) {
      console.log("usuario logueado");
      return;
    }

    console.log("Contraseña incorrecta");
  };
}

const manager = new UserManager();
const crearUsuarios = async () => {
  let consultaUsuarios = await manager.mostrarUsuarios();
  console.log(consultaUsuarios);

  await manager.crearUsuario("joel", "castagnani", "jcastagnani", "1234");
  //   let consultaUsuarios2 = await manager.mostrarUsuarios();
  //   console.log(consultaUsuarios2);

  //await manager.validarUsuario("jcastagnani", "1234");
  //await manager.validarUsuario("jcastagnanii", "1234");
  //await manager.validarUsuario("jcastagnani", "12345");
};

crearUsuarios();
