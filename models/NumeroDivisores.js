const NumeroPrimo = require('./NumeroPrimo');
const Potencia = require('./Potencia');
const _ = require('lodash');

class NumeroDivisores {

    static getDivisores(numero){

        if(numero === 0){
            throw Exception("Zero não pode ser dividido.");
        }

        if(NumeroPrimo.ehPrimo(numero)){
            return [1, numero]; 
        }

        const potencias = this._decomporEmPrimos(numero);
        const divisores = this._encontraDivisores(potencias);

        return divisores;
    }

    static _decomporEmPrimos(dividendo, divisoresPrimos = []) {

        for(let divisor = 2; divisor <= dividendo; divisor++){

            if(!NumeroPrimo.ehPrimo(divisor)){
                continue;
            }

            const quociente = dividendo / divisor;
            const resto = dividendo % divisor;

            if(resto == 0){
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

    static _encontraDivisores(potencias) {

        const divisores = [];

        potencias = this._expandeExpoentes(potencias);

        const primeiraPotencia = potencias.filter(item => item.base === potencias[0].base);
        const listaDePotenciasSemAPrimeira = potencias.filter(item => item.base !== potencias[0].base);

        primeiraPotencia.forEach((potencia) => {
            
        })
        

        return potencias;
    }

    static _expandeExpoentes(potencias) {

        const potenciasExpandidas = [];

        potencias.forEach(potencia => {

            for(let expoente = 0; expoente <= potencia.expoente; expoente++){
                potenciasExpandidas.push(new Potencia(potencia.base, expoente));
            }
        });

        return potenciasExpandidas;
    }
}

module.exports = NumeroDivisores;