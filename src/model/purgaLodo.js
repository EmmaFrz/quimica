require('dotenv').config()

function caudal_total_lodo_exceso(totalizador, totalizadorAnterior){
    if(totalizadorAnterior === ''){
        return;
    }else{
        if(totalizador !== ''){
            return totalizador - totalizadorAnterior
        }else{
            return;
        }
    }
}

function edad_lodo(totalizador, totalizadorAnterior){
    let caudal = caudal_total_lodo_exceso(totalizador, totalizadorAnterior);
    try {
        return ((1761 * 2) + 1818) / caudal
    } catch (error) {
        return 'Error Calculo';
    }
}

console.log(caudal_total_lodo_exceso(process.env.LODO, process.env.LODO_ANTERIOR))
console.log(edad_lodo(process.env.LODO, process.env.LODO_ANTERIOR))