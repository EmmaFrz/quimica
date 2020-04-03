require('dotenv').config()

//Calculo caudal en metros cubicos
export const caudal_diario_m3 = (totalizador, totalizadorAnterior) => {
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

//Calculo caudal en litros sobre segundos
const caudal_diario_ls = (totalizador, totalizadorAnterior) => {
    const result = caudal_diario_m3(totalizador, totalizadorAnterior);
    try {
        let calc = (((result * 1000) / 24) / 3600)
        return calc;
    } catch (error) {
        return 'Error en calculo.';
    }
}

console.log(caudal_diario_m3(process.env.TOTALIZADOR, process.env.TOTALIZADOR2))
console.log(caudal_diario_ls(process.env.TOTALIZADOR, process.env.TOTALIZADOR2))