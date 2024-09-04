const moment = require("moment");
const hoy = moment();
const fechaDeNacimiento = moment("06-08-1995", "DD-MM-YYYY");

if (fechaDeNacimiento.isValid()) {
  console.log(fechaDeNacimiento);
  const diferencia = hoy.diff(fechaDeNacimiento, "days");
  console.log(diferencia);
} else {
  console.log("fecha de nacimiento no valida");
}
