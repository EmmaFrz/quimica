let R = require('ramda');
require('dotenv').config()
const arr1 = [441];
const arr2 = [7824, 6991, 8038, 7663, 6869, 8381, 7640];

const ssv1 = [2320];
const ssv2 = [2070];
const ssv3 = [2690];

const dbo = [4.399, 4.1141, 3.646];
const fm = [0.125, 0.093, 0.081, 0.098];

const dboAfluente = [219];
const dqoAfluente = [32];
const caudal = [1078];

const promedioSolidoAfluente = 688;
const promedioSolidoEfluente = 10; 
const caudal2 = [1523];

function carga_dbo_semanal(afluente, DBO){
    if(afluente.length <= 7 ){
        if(DBO.length < 7){
            try {
                let calc1 = R.mean(DBO);
                let calc2 = R.mean(afluente);
                let total = calc1 * calc2
                return parseFloat((total / 1000).toFixed(2));
            } catch (error) {
                return 'Error de calculo'
            }
        }else{
            return 'Error, DBO debe ser hasta 7 dias'
        }
    }else{
        return 'Error, Afluente debe ser igual o menor a 7 dias'
    }
    
}

function fm_semanal(afluente, DBO, arr1 = [], arr2 = [], arr3 = [], arr4 = [], arr5 = [], arr6 = []){
    const weekDBO = carga_dbo_semanal(afluente, DBO);
    let mean = R.mean(R.flatten([arr1, arr2, arr3, arr4, arr5, arr6]));
    const aproach1 = mean / 1000;
    const aproach2 = (2 * 3244) + 3353;
    const weekAverage = weekDBO/(aproach1 * aproach2) 
    return parseFloat(weekAverage.toFixed(3));
}

function carga_dbo_mensual(dbo){
    if(dbo.length > 0){
        try {
            let mean = R.mean(dbo);
            return parseFloat(mean.toFixed(3));
        } catch (error) {
            return error;
        }
    }else{
        return 'Error, no existen datos';
    }
}

function fm_mensual(fm){
    if(fm.length > 0){
        try {
            let mean = R.mean(fm);
            return parseFloat(mean.toFixed(3));
        } catch (error) {
            return error
        }
    }else{
        return 'Error, no existen datos';
    }
}

function kg_dbo_removida_semanal(dboAfluente, dqoSemana, caudalDiarioAfluente){
    try {
        let meanDbo = R.mean(dboAfluente);
        let meanDqo = R.mean(dqoSemana);
        let meanCaudal = R.mean(caudalDiarioAfluente);
        let aproach1 = meanDbo - (meanDqo / 2) 
        let aproach2 = (aproach1 * meanCaudal);
        let aproach3 = aproach2 / 1000
        return parseFloat(aproach3.toFixed(3))
    } catch (error) {
        return error
    }
}

function eficiencia_remocion_dbo_semanal(dboAfluente, dqoSemana){
    try {
        let meanDbo = R.mean(dboAfluente);
        let meanDqo = R.mean(dqoSemana);
        let aproach1 = meanDbo - (meanDqo / 2);
        let aproach2 = aproach1 / meanDbo;
        return parseFloat(aproach2.toFixed(3));
    } catch (error) {
        return error;
    }
}

function kg_solidos_suspendidos_totales_removidas_semanal(promedioSolidosSemanasAfluente, promedioSolidosSemanasEfluente, promedioCaudal){
    try {
        let meanCaudal = R.mean(promedioCaudal);
        let aproach1 = promedioSolidosSemanasAfluente - promedioSolidosSemanasEfluente;
        let aproach2 = aproach1 * meanCaudal;
        let aproach3 = aproach2 / 1000;
        return parseFloat(aproach3.toFixed(3));
    } catch (error) {
        return error
    }
}

//eficiencia remocion solidos suspendidos totales semanales


console.log(carga_dbo_semanal(arr2, arr1));
console.log(fm_semanal(arr2, arr1, ssv1, ssv2, ssv3));
console.log(carga_dbo_mensual(dbo));
console.log(fm_mensual(fm));
console.log(kg_dbo_removida_semanal(dboAfluente, dqoAfluente, caudal))
console.log(eficiencia_remocion_dbo_semanal(dboAfluente, dqoAfluente));
console.log(kg_solidos_suspendidos_totales_removidas_semanal(promedioSolidoAfluente, promedioSolidoEfluente, caudal2));