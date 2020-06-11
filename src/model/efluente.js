import * as R from 'ramda';
require('dotenv').config();

const caudalLitros = 5248;

const afluenteLitros = 82.28;
const efluenteLitros = 60.7;

const caudal_diario_efluente_litros_segundo = (caudalDiarioEfluente) => {
    try {
        let approach1 = caudalDiarioEfluente * 1000;
        let approach2 = approach1 / 24;
        let approach3 = approach2 / 3600;
        return parseFloat(approach3.toFixed(3));
    } catch (error) {
        return error;
    }
}

const discrepancia_afluente_efluente = (caudalDiarioEfluente, caudalDiarioAfluente) => {
    try {
        let approach1 = caudalDiarioAfluente - caudalDiarioEfluente;
        let approach2 = approach1 / caudalDiarioAfluente;
        let approach3 = approach2 * 100
        return parseFloat(approach3.toFixed(3));
    } catch (error) {
        return error;
    }
}


console.log(caudal_diario_efluente_litros_segundo(caudalLitros));
console.log(discrepancia_afluente_efluente(efluenteLitros, afluenteLitros))