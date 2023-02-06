class MatrizMMC {

    retornaNovasLinhasParaMatriz(numeros, numerosIndivisiveis, divisor, matrizFormatada) {
        const existeLinhasNaMatriz = matrizFormatada.length > 0;
        const novasLinhas = [];

        if (!existeLinhasNaMatriz) {
            const primeiraLinha = this._formataLinhaNaMatriz(numeros, numerosIndivisiveis, divisor, existeLinhasNaMatriz);
            novasLinhas.push(primeiraLinha);
        }

        const proximaLinha = this._formataLinhaNaMatriz(numeros, numerosIndivisiveis, divisor);
        novasLinhas.push(proximaLinha);

        return novasLinhas;
    }

    retornaUltimaLinhaDaMatrizFormatada(matrizFormatada) {
        const ultimoIndice = matrizFormatada.length - 1;
        const ultimaLinha = matrizFormatada[ultimoIndice];
        const indiceUltimoObjeto = ultimaLinha.length - 1;

        return ultimaLinha.slice(0, indiceUltimoObjeto);
    }

    _formataLinhaDeNumeros(proximosNumeros, numerosIndivisiveis, divisor) {
        const fnOrdenaAsc = (d1, d2) => d1.posicaoNaMatriz - d2.posicaoNaMatriz;
        return [...proximosNumeros, ...numerosIndivisiveis, { divisor }].sort(fnOrdenaAsc);
    }

    _formataLinhaNaMatriz(numeros, numerosIndivisiveis, divisor, existeLinhasNaMatriz = true) {
        const numerosCalculados = this._executaDivisao(numeros, existeLinhasNaMatriz ? divisor : 1);
        return this._formataLinhaDeNumeros(numerosCalculados, numerosIndivisiveis, divisor);
    }

    _executaDivisao(numerosComMesmoDivisor, divisor) {
        return numerosComMesmoDivisor.map((item) => {
            return {
                numero: item.numero / divisor,
                posicaoNaMatriz: item.posicaoNaMatriz
            }
        });
    }
}

module.exports = MatrizMMC;