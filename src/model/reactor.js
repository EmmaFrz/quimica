require('dotenv').config()

//Funcion que calcula el indice volumetrico del licor
function ivl(v30, sst){
    if(v30 !== ''){
        try {
            return ((v30*1000))/sst
        } catch (error) {
          return 'Error de calculo'  
        }
    }else{
        return;
    }
}

//Funcion que calcula el indice volumetrico del licor
function ivl_50(v30_50, sst){
    if(v30_50 !== ''){
        try {
            return ((v30_50*1000)/sst)
        } catch (error) {
            return 'Error de calculo'
        }
    }else{
        return;
    }
}

console.log(ivl(process.env.V30, process.env.SST))
console.log(ivl_50(process.env.V30_50, process.env.SST))