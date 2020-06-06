import * as R from 'ramda';
require('dotenv').config();

const consumoElectrico = 1050;
const caudalAfluente = 1788;

const consumoElectricoArray = [735, 630, 315, 840, 1050, 1050, 1050];
const caudalAfluenteArray = [1565, 1536, 1502, 1581, 1590, 1360, 1788];
const dbo = 325;

const kwatt_diario = (consumoElectricoDiario, caudalDiarioAfluente) => {
    if(consumoElectricoDiario !== ''){
        try {
            let result = consumoElectricoDiario / caudalDiarioAfluente;
            return parseFloat(result.toFixed(3));
        } catch (error) {
            return error;
        }
    }else{
        return 'Calculo no realizado, no se encontró consumo electrico del dia.';
    }
}

const kwh_kgdbor = (consumoElectricoDiario, kgDboRemovidaSemnal) => {
    try {
        let meanConsumo = R.mean(consumoElectricoDiario);
        let approach1 = meanConsumo / kgDboRemovidaSemnal;
        return parseFloat(approach1.toFixed(3));
    } catch (error) {
        return error;
    }
}

const kwh_m3_semanal = (consumoElectricoDiario, caudalDiarioAfluente) => {
    try {
        let consumoSum = R.sum(consumoElectricoDiario);
        let consumoCaudal = R.sum(caudalDiarioAfluente);
        let approach1 = consumoSum / consumoCaudal;
        return parseFloat(approach1.toFixed(3));
    } catch (error) {
        return error;
    }
}

console.log(kwatt_diario(consumoElectrico, caudalAfluente));
console.log(kwh_kgdbor(consumoElectricoArray, dbo));
console.log(kwh_m3_semanal(consumoElectricoArray, caudalAfluenteArray));