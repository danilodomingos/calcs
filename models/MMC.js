const Divisor = require('./Divisor');
const Primo = require('./Primo');
const _ = require('lodash');

class MMC {

    static calcular(linhaDeDividendos){

        // let listaDeDividendos, listaDeDivisores = [];


        const listaDePrimos = linhaDeDividendos.filter((numero) => Primo.ehPrimo(numero));

        if(listaDePrimos.lenght === linhaDeDividendos.lenght){
            return linhaDeDividendos.qreduce((proximo, corrente) => proximo * corrente);
        }

        // // preenche linha de dividendos...
        // linhaDeDividendos.forEach(valor => {
        //     listaDeDividendos.push(valor)
        // });


        // // percorre lista buscando os divisores...
        // listaDeDividendos.forEach((dividendo, indice) => {

        //     if(Primo.ehPrimo(dividendo)) {

        //         const removeNoIndex = indice + 1;
        //         const listaDeDividendosSemIndiceAtual = listaDeDividendos.slice(removeNoIndex)
        //         const listaDeProximosDividendos = [1].concat(listaDeDividendosSemIndiceAtual);


        //     }
        // });


        // return listaDeDividendos;

    }
}

module.exports = MMC;