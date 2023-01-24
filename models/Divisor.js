const Primo = require('./Primo');

class Divisor {
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

    static multiplicaFatoresPrimos(fatores, indiceAtual = 0, fatoresIterados = [], resultados = []) {
        const fator = fatores[indiceAtual];
        const proximoIndice = indiceAtual + 1;
        const proximosFatores = fatores.slice(proximoIndice);
        const temProximoFator = proximosFatores.length > 0;

        for(let expoente = fator.expoente; expoente >= 0; expoente--) {

            const fatorComExpoenteAtual = new Primo(fator.base, expoente);

            if(temProximoFator) {
                fatoresIterados = this._removeFatorComMesmoValorDeBase(fatoresIterados, fatorComExpoenteAtual);
                fatoresIterados.push(fatorComExpoenteAtual);
                this.multiplicaFatoresPrimos(fatores, proximoIndice, fatoresIterados, resultados);
            } else {

                const fatoresParaMultiplicar = [...fatoresIterados, fatorComExpoenteAtual].map((item) => item.base ** item.expoente);
                const fatoresMultiplicados = fatoresParaMultiplicar.reduce((proximo, corrente) => proximo * corrente);
                resultados.push(fatoresMultiplicados);
            }
        }

        return resultados.sort((d1, d2) => d1 - d2);
    }

    static _adicionaOuAtualizaFatorPrimo(base, fatoresPrimos) {

        const indiceDoFator = fatoresPrimos.findIndex(item => item.base === base);
        const jaExisteFator = indiceDoFator >= 0;
            
        if(jaExisteFator) {
            this._atualizaExpoenteDoFator(fatoresPrimos, indiceDoFator);
        } else {
            const fatorPrimo = new Primo(base, 1);
            fatoresPrimos.push(fatorPrimo);                   
        }
    }

    static _atualizaExpoenteDoFator(fatoresPrimos, indiceDoFator) {
        const fatorPrimo = fatoresPrimos[indiceDoFator];
        fatorPrimo.expoente += 1;
        fatoresPrimos[indiceDoFator] = fatorPrimo;
    }

    static _removeFatorComMesmoValorDeBase(fatoresIterados, fatorAtual) {
        return fatoresIterados.filter(item => item.base !== fatorAtual.base );
    }
}

module.exports = Divisor;