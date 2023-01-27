const Divisor = require('./Divisor');
const Primo = require('./Primo');
const lodash = require('lodash');

class MMC {

    static calcular(numeros){

        const ehTudoPrimo = numeros.every(numero => Primo.ehPrimo(numero))

        if(ehTudoPrimo) {
            return numeros.reduce((anterior, proximo) => anterior * proximo);
        }

        const linhaDeDivisao = [];

        numeros.forEach(numero => {
            const resultado = { numero, divisores: Divisor.getDivisores(numero) }
            linhaDeDivisao.push(resultado);
        });

        const divisores = linhaDeDivisao.map(item => item.divisores);
        const divisoresIguais = lodash.intersection(...divisores)?.filter(valor => valor > 1);

        console.log(divisoresIguais);
        
    }
}

module.exports = MMC;