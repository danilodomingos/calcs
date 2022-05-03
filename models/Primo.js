class Primo {

    constructor(){}

    static ehPrimo(numero){

        if(numero < 0 ){
            numero  *= -1;
        }

        if(numero === 0 | numero === 1){
            return false;
        }

        for(let valorAtual = 2; valorAtual < numero; valorAtual++){
            
            const resto = numero % valorAtual;

            if(resto == 0){
                return false;
            }
        }

        return true;
    }
}

module.exports = Primo;