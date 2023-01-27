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
        const menorDivisor = this._encontraMenorDivisor(divisores);


        /* 
            2, 8, 4, 7 |
                       |
                       |
                       |
                   
        
        
        */

        console.log('divisores');
        console.log(divisores);
        
    }

    static _encontraMenorDivisor(divisores) {
        const arrayFlat = divisores.flatMap(num => num);
        const numerosUnicosMaioresQueUm = [...new Set(arrayFlat)]?.filter(num => num > 1);
        const menorDivisor = numerosUnicosMaioresQueUm.sort((d1, d2) => d1 - d2)[0];

        return menorDivisor;
    }
}

module.exports = MMC;