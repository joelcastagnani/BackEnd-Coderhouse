const crypto = require("crypto");

class UserManager {
  usuarios = [];
  constructor() {}
  mostrarUsuarios = async () => {
    return this.usuarios;
  };
  crearUsuario(nombre, apellido, nombreUsuario, password) {
    const usuario = {
      nombre,
      apellido,
      nombreUsuario,
      password,
    };

    usuario.salt = crypto.randomBytes(128).toString("base64");

    usuario.password = crypto
      .createHmac("sha256", usuario.salt)
      .update(usuario.password)
      .digest("hex");

    this.usuarios.push(usuario);
    return usuario;
  }
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

  manager.crearUsuario("joel", "castagnani", "jcastagnani", "1234");
  //   let consultaUsuarios2 = await manager.mostrarUsuarios();
  //   console.log(consultaUsuarios2);

  await manager.validarUsuario("jcastagnani", "1234");
  await manager.validarUsuario("jcastagnanii", "1234");
  await manager.validarUsuario("jcastagnani", "12345");
};

crearUsuarios();
