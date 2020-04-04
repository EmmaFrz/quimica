let R = require('ramda');
require('dotenv').config()
const arr1 = [441];
const arr2 = [7824, 6991, 8038, 7663, 6869, 8381, 7640];

const ssv1 = [2320];
const ssv2 = [2070];
const ssv3 = [2690];



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


console.log(carga_dbo_semanal(arr2, arr1))
console.log(fm_semanal(arr2, arr1, ssv1, ssv2, ssv3,))