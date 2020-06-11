import * as R from 'ramda';
require('dotenv').config();

const solidosTotales = 2776.7;
const caudal = 770;

const AKBM = 20.47;
const Mapocho = 0;

const pesajeLodos = 22.5;
const sequedadLodo = [18.99, 18.92];

const lodos_exceso_base_seca = (SolidosTotalesReactores, CaudalTotalLodosExceso ) => {
    try {
        let approach1 = (CaudalTotalLodosExceso * SolidosTotalesReactores) /1000;
        let approach2 = approach1 / 1000
        return parseFloat(approach2.toFixed(3));
    } catch (error) {
        return error;
    }
};

const pesaje_lodos_retirados = (biosolidoAKBM, biosolidoMapoco) => {
    try {
        let approach1 = biosolidoAKBM + biosolidoMapoco;
        return parseFloat(approach1.toFixed(3));
    } catch (error) {
       return error; 
    }
};

const lodos_retirados_base_seca = (pesajeLodosRetirados, sequedadLodoDeshidratado) => {
    try {
        let count = 0;
        for (let index = 0; index < sequedadLodoDeshidratado.length; index++) {
            if(sequedadLodoDeshidratado[index] === ''){
                count++;
                if(count === sequedadLodoDeshidratado.length){
                    return 'Sin datos asociados';
                }
            }else{
                let approach1 = sequedadLodoDeshidratado[index] * pesajeLodosRetirados;
                let approach2 = approach1 / 100;
                return parseFloat(approach2.toFixed(3));
            }
        }
    } catch (error) {
        return error;
    }
}

console.log(lodos_exceso_base_seca(solidosTotales, caudal));
console.log(pesaje_lodos_retirados(AKBM, Mapocho));
console.log(lodos_retirados_base_seca(pesajeLodos, sequedadLodo));
