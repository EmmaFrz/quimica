import * as R from 'ramda';

let purga = 200;
let caudal = 120;

let cloroConsumo = 18.15;
let consignaCloroMin = 4; 
let consignaCloroMax = 7;

let polimeroDiario = 19.23;
let ratioPolimeroMin = 6;
let ratioPolimeroMax = 9;

const desviasion_purga_reactores_consigna = (purgaReactorConsiga, caudalTotalLodosEnExceso) => {
    let approach1 = (purgaReactorConsiga / caudalTotalLodosEnExceso) * 100;
    let approach2 = approach1 - 100;
    return parseFloat(approach2.toFixed(3));
};

const desviasion_dosis_cloro_consigna_minima = (consigaDosisCloro, consumoCloroFlujoDiario) => {
    let approach1 = consumoCloroFlujoDiario / consigaDosisCloro;
    let approach2 = approach1 * 100;
    let approach3 = approach2 - 100;
    return parseFloat(approach3.toFixed(3));
};

const desviasion_dosis_cloro_consigna_maxima = (consigaDosisCloro, consumoCloroFlujoDiario) => {
    let maxima = desviasion_dosis_cloro_consigna_minima(consigaDosisCloro, consumoCloroFlujoDiario);
    return maxima;
};

const desviasion_dosis_cloro_consigna = (consumoCloroFlujoDiario, consignacionCloroMin, consigacionCloroMax, funcionMin, funcionMax) => {
    try {
        let consignaMin = funcionMin(consignacionCloroMin, consumoCloroFlujoDiario);
        let consignaMax = funcionMax(consigacionCloroMax, consumoCloroFlujoDiario);
        
        if(consumoCloroFlujoDiario <= consigacionCloroMax && consumoCloroFlujoDiario >= consignacionCloroMin){
            return 0;
        }
    
        if(consumoCloroFlujoDiario > consigacionCloroMax){
            return consignaMax;
        };
    
        if(consumoCloroFlujoDiario < consignacionCloroMin){
            return consignaMin;
        }
    } catch (error) {
        return error;
    }
};

const desviasion_consigna_polimeros_minimo = (consignaRatioPolimero, consumoPolimeroDiario) => {
    let approach1 = consumoPolimeroDiario / consignaRatioPolimero;
    let approach2 = approach1 * 100;
    let approach3 = approach2 - 100;
    return parseFloat(approach3.toFixed(3));
}

const desviasion_consigna_polimeros_maxima = (consignaRatioPolimero, consumoPolimeroDiario) => {
    let maxima = desviasion_consigna_polimeros_minimo(consignaRatioPolimero, consumoPolimeroDiario);
    return maxima;
}

const desviasion_dosis_polimero_consigna = (consumoPolimeroDiario, consignaRatioPolimeroMin, consignaRatioPolimeroMax, funcionMin, funcionMax) => {
    const total = desviasion_dosis_cloro_consigna(consumoPolimeroDiario, consignaRatioPolimeroMin, consignaRatioPolimeroMax, funcionMin, funcionMax);
    return total;
}

console.log(desviasion_purga_reactores_consigna(purga, caudal));
console.log(desviasion_dosis_cloro_consigna_minima(consignaCloroMin, cloroConsumo));
console.log(desviasion_dosis_cloro_consigna_maxima(consignaCloroMax, cloroConsumo));
console.log(desviasion_dosis_cloro_consigna(cloroConsumo, consignaCloroMin, consignaCloroMax, desviasion_dosis_cloro_consigna_minima, desviasion_dosis_cloro_consigna_maxima));
console.log(desviasion_consigna_polimeros_minimo(ratioPolimeroMin, polimeroDiario));
console.log(desviasion_consigna_polimeros_maxima(ratioPolimeroMax, polimeroDiario));
console.log(desviasion_dosis_polimero_consigna(polimeroDiario, ratioPolimeroMin, ratioPolimeroMax, desviasion_consigna_polimeros_minimo, desviasion_consigna_polimeros_maxima));