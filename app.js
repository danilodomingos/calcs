const NumeroPrimo = require('./models/NumeroPrimo');

const primo = new NumeroPrimo();


console.log(primo.ehPrimo(1));
console.log(primo.ehPrimo(2));
console.log(primo.ehPrimo(0));