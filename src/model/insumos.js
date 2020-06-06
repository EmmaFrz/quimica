import * as R from 'ramda';
import { parse } from 'dotenv/types';
require('dotenv').config();


const consumHipoclorito = 232;
const caudal = 1832;

const consumo_hipoclorito_desinfection_flujo_diario = (consumoHipocloritoDiario, caudalDiarioAfluente) => {
    if(consumoHipocloritoDiario !== ''){
        try {
            let approach1 = consumoHipocloritoDiario * 0.1;
            let approach2 = (approach1/caudalDiarioAfluente) * 1000;
            //let approach3 = approach1 / approach2;
            return parseFloat(approach2.toFixed(3));
        } catch (error) {
            return error;
        }
    }
}

const dosis_desinfeccion_promedio_mes = () => {
    //Consulta es la variable donde se encuentran todas los calculos realizados e el consumo de hipoclorito
    //diario, esto se debe buscar en la tabla donde lo guardas, ten en cuenta que para una busqueda más eficiente
    //te recomiendo guardar este dato unico con una llave foranea a la planta correspondiente.
    try {
        let arrMonth = [];
        for (let index = 0; index < array.length; index++) {
            arrMonth.push(consulta[index]);
        }
        let total = R.mean(arrMonth);
        return parseFloat(total.toFixed(3));
    } catch (error) {
        return error;
    }
}

console.log(consumo_hipoclorito_desinfection_flujo_diario(consumHipoclorito, caudal));