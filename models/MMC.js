const Divisor = require('./Divisor');
const Primo = require('./Primo');
const Matriz = require('./MatrizMMC');
class MMC {

    static calcular(numeros) {

        // validar();

        const resultado = this._percorreMatriz(numeros);

    }

    static _percorreMatriz(numeros, matrizFormatada = []) {
        const matriz = new Matriz();
        const numerosComSeusDivisores = this._encontraDivisores(numeros);
        const sohDivisores = numerosComSeusDivisores.map(item => item.divisores);
        const divisor = this._encontraDivisorComMaiorOcorrencia(sohDivisores);

        const numerosComMesmoDivisor = numerosComSeusDivisores.filter(num => num.divisores.some(n => n === divisor));
        const numerosIndivisiveis = numerosComSeusDivisores.filter(num => !numerosComMesmoDivisor.some(n => n === num));

        const novasLinhas = matriz.retornaNovasLinhasParaMatriz(numerosComMesmoDivisor, numerosIndivisiveis, divisor, matrizFormatada);
        matrizFormatada.push(...novasLinhas);

        const proximosNumeros = matriz.retornaUltimaLinhaDaMatrizFormatada(matrizFormatada);

        const ehTudoUm = proximosNumeros.every(item => item.numero === 1);
        
        // if(!ehTudoUm) {
        //     this._percorreMatriz(proximosNumeros, matrizFormatada)
        // }


        /* 
            2, 8, 4, 7 | 2
            1, 4, 2, 7 | 2
            1, 2, 1, 7 | 2
            1, 1, 1, 7 | 7
            1, 1, 1, 1 / 56
                   
        
        
        */

        console.log(proximosNumeros);
    }

    static _encontraDivisores(numeros) {
        const numerosComDivisores = [];

        numeros.forEach((numero, indice) => {
            const num = numero['numero'] ?? numero;
            numerosComDivisores.push({
                numero: num,
                divisores: Divisor.getDivisores(num),
                posicaoNaMatriz: numero['posicaoNaMatriz'] ?? indice
            });
        });

        return numerosComDivisores;
    }

    static _encontraDivisorComMaiorOcorrencia(divisores) {
        const divisoresMaioresQueUm = divisores.flatMap(num => num)?.filter(num => num > 1);
        const divisoresAgrupados = this._agrupaDivisores(divisoresMaioresQueUm);
        const fnOrdenaDecrescente = (d1, d2) => d2.total - d1.total;

        return divisoresAgrupados.sort(fnOrdenaDecrescente)[0].divisor;
    }

    static _agrupaDivisores(divisores) {
        const grupoDeDivisores = [];

        divisores.forEach((divisor, indice) => {
            const indiceGrupo = grupoDeDivisores.findIndex(obj => obj.divisor === divisor);

            if (indiceGrupo < 0) {
                grupoDeDivisores.push({ divisor: divisores[indice], total: 1 })
            } else {
                grupoDeDivisores[indiceGrupo].total += 1;
            }
        })

        return grupoDeDivisores;
    }



    // static validar() {
    //     const existeNumeroZero = numeros.some(num => num === 0);
    //     const ehTudoUm = numeros.some(num => num === 1);
    //     const ehTudoPrimo = numeros.every(numero => Primo.ehPrimo(numero));

    //     if (existeNumeroZero) {
    //         throw Error('Não é possível dividir por zero.');
    //     }

    //     if (ehTudoPrimo && proximaLinha.length === 0) {
    //         return numeros.reduce((anterior, proximo) => anterior * proximo);
    //     }

    //     if (ehTudoUm && proximaLinha > 0) {
    //         return proximaLinha.reduce((anterior, proximo) => anterior * proximo);
    //     }
    // }
}

module.exports = MMC;