//import { caudal_diario_m3 } from './afluente'
require('dotenv').config()

const arr1 = [0, 0, 0, 0, 0, 0, 216];
const arr2 = [7023, 6782, 7017, 6689, 7214, 7370, 6811];

function carga_dbo_semanal(afluente, DBO){
    try {
        let calc1 = 0;
        let calc2 = 0;
        for (let index = 0; index < 7; index++) {
            calc1 = calc1 + afluente[index];
            calc2 = calc2 + DBO[index];
        };
        calc2 = calc2 / 7;
        calc1 = calc1 / 7;
        let total = calc1 * calc2
        
        return total / 1000;
    } catch (error) {
        return 'Error en calculo';   
    }
}

console.log(carga_dbo_semanal(arr2, arr1))