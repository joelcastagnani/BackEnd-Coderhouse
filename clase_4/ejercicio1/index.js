const generarNumeros = () => {
  return new Promise((resolve) => {
    const numbers = {};
    for (let i = 0; i < 100000000; i++) {
      const number = Math.floor(Math.random() * 20 + 1);
      if (!numbers[number]) {
        numbers[number] = 1;
      } else {
        numbers[number]++;
      }
    }
    resolve(numbers);
  });
};
const main = async () => {
  try {
    console.log("Generando numeros aleatorios...");
    const numbers = await generarNumeros();
    console.log(numbers);
  } catch (error) {}
};

main();
