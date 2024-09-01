class TiquetManager {
  #precioBaseDeGanancia = 0.15;

  constructor() {
    this.eventos = [];
  }

  getEventos = () => {
    return this.eventos;
  };
  agregarEvento = (
    nombre,
    lugar,
    precio,
    capacidad = 50,
    fecha = new Date().toLocaleDateString()
  ) => {
    const evento = {
      nombre,
      lugar,
      precio: precio + precio * this.#precioBaseDeGanancia,
      capacidad,
      fecha,
      participantes: [],
    };

    evento.id = this.eventos.length + 1;
    this.eventos.push(evento);
  };
  agregarUsuario = (idEvento, idUsuario) => {
    const eventoIndex = this.eventos.findIndex((e) => e.id == idEvento);
    if (eventoIndex == -1) {
      console.log("El evento no existe (agregar usuario)");
      return;
    }

    const eventoElegido = this.eventos[eventoIndex];

    const usuarioRegistrado = eventoElegido.participantes.includes(idUsuario); //este include retorna un true o false
    if (usuarioRegistrado) {
      console.log("El usuario ya existe");
      return;
    }

    eventoElegido.participantes.push(idUsuario);
  };
  ponerEventoEnGira = (idEvento, nuevaLocalidad, nuevaFecha) => {
    const eventoIndex = this.eventos.findIndex((e) => e.id == idEvento);
    if (eventoIndex == -1) {
      console.log("El evento no existe (ponerEventosENbla bla)");
      return;
    }

    const eventoElegido = this.eventos[eventoIndex];
    const newEvento = {
      ...eventoElegido,
      lugar: nuevaLocalidad,
      fecha: nuevaFecha,
      id: this.eventos.length + 1,
      participantes: [],
    };

    this.eventos.push(newEvento);
  };
}

const manejadorDeEventos = new TiquetManager();
manejadorDeEventos.agregarEvento("Evento joel", "Argentina", 5000, 100);
manejadorDeEventos.agregarUsuario(1, 2);
manejadorDeEventos.agregarUsuario(1, 3);
manejadorDeEventos.agregarUsuario(1, 5);
manejadorDeEventos.ponerEventoEnGira(1, "Mexico", "23/07/2023");
console.log(manejadorDeEventos.getEventos());
