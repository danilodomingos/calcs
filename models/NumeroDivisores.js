const NumeroPrimo = require('./NumeroPrimo');
const Potencia = require('./Potencia');
const _ = require('lodash');

class NumeroDivisores {

    static getDivisores(numero) {

        if (numero === 0) {
            throw Exception("Zero não pode ser dividido.");
        }

        if (NumeroPrimo.ehPrimo(numero)) {
            return [1, numero];
        }

        const potencias = this._decomporEmPrimos(numero);
        const divisores = this._encontraDivisores(potencias);

        return divisores;
    }

    static _decomporEmPrimos(dividendo, divisoresPrimos = []) {

        for (let divisor = 2; divisor <= dividendo; divisor++) {

            if (!NumeroPrimo.ehPrimo(divisor)) {
                continue;
            }

            const quociente = dividendo / divisor;
            const resto = dividendo % divisor;

            if (resto == 0) {
                divisoresPrimos.push(divisor);
                return this._decomporEmPrimos(quociente, divisoresPrimos);
            }
        }

        const divisoresPrimosAgrupadosPorValor = _.groupBy(divisoresPrimos);

        const potencias = Object.entries(divisoresPrimosAgrupadosPorValor)
            .map(([base, expoente]) => {
                return new Potencia(parseInt(base), parseInt(expoente.length));
            });

        return potencias;
    }

    static _encontraDivisores(listaDePotencias) {

        const listaDeBaseDasPotencias = listaDePotencias.map(item => item.base);
        const listaDePotenciasComExpoentesExpandidos = this._expandeExpoentes(listaDePotencias);

        const fatores = this._percorreFatores(listaDeBaseDasPotencias, listaDePotenciasComExpoentesExpandidos);

        console.log(fatores);

        // const divisores = fatores.map((potencias) => {
        //     const listaDeResultados = potencias.map((potencia) => potencia.base ^ potencia.expoente);
        //     return listaDeResultados.reduce((proximo, corrente) => proximo * corrente);
        // });

        // console.log(divisores);


        /*
          [
            Potencia { base: 2, expoente: 3 },
            Potencia { base: 3, expoente: 0 },
            Potencia { base: 5, expoente: 1 }
          ],
        */

        


        return listaDePotencias;
    }

    static _expandeExpoentes(potencias) {

        const potenciasExpandidas = [];

        potencias.forEach(potencia => {

            for (let expoente = 0; expoente <= potencia.expoente; expoente++) {
                potenciasExpandidas.push(new Potencia(potencia.base, expoente));
            }
        });

        return potenciasExpandidas;
    }

    static _percorreFatores(listaDeBaseDasPotencias, listaDePotencias, listaDeFatores = [], listaComTodosOsFatores = []) {

        const ehUltimaBase = (listaDeBaseDasPotencias.length === 1);
        const listaDePotenciasComBaseDoPrimeiroIndice = listaDePotencias.filter(pot => pot.base === listaDeBaseDasPotencias[0]);

        if(ehUltimaBase) {

            listaDePotenciasComBaseDoPrimeiroIndice.forEach(pot => {
                const novaListaDeFatores = listaDeFatores.concat(pot);
                listaComTodosOsFatores.push(novaListaDeFatores);
            });

            listaDeFatores = [];
            
        } else {

            listaDePotenciasComBaseDoPrimeiroIndice.forEach(pot => {

            // listaDeFatores = this._removePotenciaAnteriorComMesmoValorDeBase(pot, listaDeFatores);
            if(listaDeFatores.length > 1){
                listaDeFatores.pop();
            }            
            listaDeFatores.push(pot);

            const listaDeBaseDasPotenciasSemPrimeiroIndice = listaDeBaseDasPotencias.filter(base => base !== listaDeBaseDasPotencias[0]);
            const listaDePotenciasSemABaseDoPrimeiroIndice = listaDePotencias.filter(p => p.base !== listaDeBaseDasPotencias[0]);

            this._percorreFatores(listaDeBaseDasPotenciasSemPrimeiroIndice, listaDePotenciasSemABaseDoPrimeiroIndice, listaDeFatores, listaComTodosOsFatores)
            });
        }

        return listaComTodosOsFatores;
    }

    static _removePotenciaAnteriorComMesmoValorDeBase(potencia, listaDeFatores) {
        return listaDeFatores.filter(fator => fator.base !== potencia.base);
    }

}

module.exports = NumeroDivisores;