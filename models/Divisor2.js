const Primo = require('./Primo');

class Divisor2 {
    static getDivisores(numero) {

        if(Primo.ehPrimo(numero)){
            return [1, numero];
        }

        const fatoresPrimos = this.getFatoresPrimos(numero);
        const divisores = this.multiplicaFatoresPrimos(fatoresPrimos);
        
        return divisores;
    }

    static getFatoresPrimos(dividendo, fatoresPrimos = []) {

        for (let divisor = 2; divisor <= dividendo; divisor++) {

            if (!Primo.ehPrimo(divisor)) {
                continue;
            }

            const quociente = dividendo / divisor;
            const resto = dividendo % divisor;
            const ehDivisivel = resto == 0;

            if (ehDivisivel) {

                this._adicionaOuAtualizaFatorPrimo(divisor, fatoresPrimos);
                return this.getFatoresPrimos(quociente, fatoresPrimos);
            }
        }

        return fatoresPrimos;
    }

    static multiplicaFatoresPrimos(fatores, fatoresIterados = [], divisores = []) {
        const fator = fatores[0];
        const proximosFatores = fatores.filter(item => item.base !== fator.base);

        for(let expoente = fator.expoente; expoente >= 0; expoente--) {

            if(proximosFatores.length === 0) {
                const fatorComExpoenteAtual = new Primo(fator.base, expoente);
                const fatoresParaMultiplicar = [...fatoresIterados, fatorComExpoenteAtual].map((item) => item.base ** item.expoente);
                const resultado = fatoresParaMultiplicar.reduce((proximo, corrente) => proximo * corrente);
                divisores.push(resultado);
                
            } else {

                const indiceFatorAtual = fatoresIterados.findIndex(item => item.base === fator.base);

                if(indiceFatorAtual >= 0) {
                    fatoresIterados[indiceFatorAtual].expoente = expoente;
                } else {
                    fatoresIterados.push(fator);
                }
                
                this.multiplicaFatoresPrimos(proximosFatores, fatoresIterados, divisores);
                
            }
        }

        return divisores.sort((d1, d2) => d1 - d2);
    }

    static _adicionaOuAtualizaFatorPrimo(base, fatoresPrimos) {

        const indiceDoFator = fatoresPrimos.findIndex(item => item.base === base);
            
        if(indiceDoFator < 0) {
            const fatorPrimo = new Primo(base, 1);
            fatoresPrimos.push(fatorPrimo);
        } else {
            const fatorPrimo = fatoresPrimos[indiceDoFator];
            fatorPrimo.expoente += 1;
            fatoresPrimos[indiceDoFator] = fatorPrimo;                    
        }
    }
}

module.exports = Divisor2;