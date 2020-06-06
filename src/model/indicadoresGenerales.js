import * as R from 'ramda';
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

const promedioSolidoEficienciaAfluente = 224;
const promedioSolidoEficienciaEfluente = 50;

const solidoReactor1 = [30];
const solidoReactor2 = [3800];

const arrayReactor1 = [30, 30, 30, 30, 30, 30, 30];
const arrayReactor2 = [3800, 3800, 3220, 3220, 2500, 2500, 2500];


const carga_dbo_semanal = (afluente, DBO) => {
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

const fm_semanal = (afluente, DBO, arr1 = [], arr2 = [], arr3 = [], arr4 = [], arr5 = [], arr6 = []) => {
    const weekDBO = carga_dbo_semanal(afluente, DBO);
    let mean = R.mean(R.flatten([arr1, arr2, arr3, arr4, arr5, arr6]));
    const aproach1 = mean / 1000;
    const aproach2 = (2 * 3244) + 3353;
    const weekAverage = weekDBO/(aproach1 * aproach2) 
    return parseFloat(weekAverage.toFixed(3));
}

const carga_dbo_mensual = (dbo) => {
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

const fm_mensual = (fm) => {
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

const kg_dbo_removida_semanal = (dboAfluente, dqoSemana, caudalDiarioAfluente) =>{
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

const eficiencia_remocion_dbo_semanal = (dboAfluente, dqoSemana) =>{
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

const kg_solidos_suspendidos_totales_removidas_semanal = (promedioSolidosSemanasAfluente, promedioSolidosSemanasEfluente, promedioCaudal) => {
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

const eficiencia_remocion_solidos_suspendidos_totales_semanales = (promedioSolidosSemanasAfluente, promedioSolidosSemanasEfluente) => {
    try {
        let meanAfluente = promedioSolidosSemanasAfluente;
        let meanEfluente = promedioSolidosSemanasEfluente;
        let aproach1 = meanAfluente - meanEfluente;
        let aproach2 = aproach1 / meanAfluente;
        return parseFloat(aproach2.toFixed(3));
    } catch (error) {
        return error;
    }
}

const solidos_suspendidos_totales_promedio = (arr1 = [], arr2 = [], arr3 = [], arr4 = [], arr5 = [], arr6 = []) => {
    let mean = R.mean(R.flatten([arr1, arr2, arr3, arr4, arr5, arr6]));
    return parseFloat(mean.toFixed(3));
}

const solidos_suspendidos_totales_reactores_semanales = (arr1 = [0], arr2 = [0], arr3 = [0], arr4 = [0], arr5 = [0], arr6 = [0]) => {
    try {
        let mean1 = R.mean(arr1);
        let mean2 = R.mean(arr2);
        let mean3 = R.mean(arr3);
        let mean4 = R.mean(arr4);
        let mean5 = R.mean(arr5);
        let mean6 = R.mean(arr6);
        let arr = [mean1, mean2, mean3, mean4, mean5, mean6];
        let totalMean = R.pipe(
            R.filter(x => x !== 0)
        )(arr)
        let totalApproach = R.mean(totalMean);    
        return parseFloat(totalApproach.toFixed(3));
    } catch (error) {
        return error;
    }
};

console.log(carga_dbo_semanal(arr2, arr1));
console.log(fm_semanal(arr2, arr1, ssv1, ssv2, ssv3));
console.log(carga_dbo_mensual(dbo));
console.log(fm_mensual(fm));
console.log(kg_dbo_removida_semanal(dboAfluente, dqoAfluente, caudal))
console.log(eficiencia_remocion_dbo_semanal(dboAfluente, dqoAfluente));
console.log(kg_solidos_suspendidos_totales_removidas_semanal(promedioSolidoAfluente, promedioSolidoEfluente, caudal2));
console.log(eficiencia_remocion_solidos_suspendidos_totales_semanales(promedioSolidoEficienciaAfluente, promedioSolidoEficienciaEfluente));
console.log(solidos_suspendidos_totales_promedio(solidoReactor1, solidoReactor2));
console.log(solidos_suspendidos_totales_reactores_semanales(arrayReactor1, arrayReactor2));