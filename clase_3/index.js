//Hnads on lab
//Calculadora positiva con promesas

const suma = (num1, num2) => {
  return new Promise((resolve, reject) => {
    if (num1 == 0 || num2 == 0) {
      reject("Operacion innecesaria");
    }

    resultado = num1 + num2;

    if (resultado < 0) {
      reject("La calculadora solo debe devolver valores positivos");
    }

    resolve(resultado);
  });
};
const resta = (num1, num2) => {
  return new Promise((resolve, reject) => {
    if (num1 == 0 || num2 == 0) {
      reject("Operacion invalida");
    }

    resultado = num1 - num2;

    if (resultado < 0) {
      reject("La calculadora solo debe devolver valores positivos");
    }

    resolve(resultado);
  });
};
const multiplicacion = (num1, num2) => {
  return new Promise((resolve, reject) => {
    if (num1 < 0 || num2 < 0) {
      reject("Operacion invalida");
    }

    resultado = num1 * num2;

    if (resultado < 0) {
      reject("La calculadora solo debe devolver valores positivos");
    }

    resolve(resultado);
  });
};
const division = (num1, num2) => {
  return new Promise((resolve, reject) => {
    if (num2 === 0) {
      reject("No se puede dividir por 0");
    } else {
      resolve(num1 / num2);
    }
  });
};

const calculos = async () => {
  try {
    const numero1 = 10;
    const numero2 = 5;

    const resultSuma = await suma(numero1, numero2);
    console.log(resultSuma);

    const resultResta = await resta(numero1, 0);
    console.log(resultResta);

    const resultMultiplicacion = await multiplicacion(numero1, numero2);
    console.log(resultMultiplicacion);

    const resultDivision = await division(numero1, numero2);
    console.log(resultDivision);
  } catch (error) {
    console.error(error);
  }
};
const prueba = () => {
  console.log("si funciona");
};

calculos();
prueba(); //por mas que la funcion anterior falle, esta se ejecuta normalmente. (pero no se xq se ejecuta primero)
