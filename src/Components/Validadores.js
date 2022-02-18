
export function validarnombre(dato){

    const expresionregular = /^[a-zA-Z ]{1,40}$/;

        if(dato!==""){

            if ( !expresionregular.test(dato)) { 
                return "Debe poner un nombre válido."    
            }else{
                return ""
            }

        }else{
            return ""
        }
    
}

export function validarapellido(dato){

    const expresionregular = /^[a-zA-Z ]{1,40}$/;

        if(dato!==""){

            if ( !expresionregular.test(dato)) { 
                return "Debe poner un apellido válido."    
            }else{
                return ""
            }

        }else{
            return ""
        }
    
}


export function validarcategoria(dato){

        if((dato==="Maxi")||(dato==="Senior")||(dato==="Libre")||(dato==="Master")){
            return "" 
        }else{
            return "Debe poner una categoría válida."
        }
 
}


export function validardocumento(dato){

    const expresionregular = /^[0-9 ]{7,8}$/;

        if(dato!==""){

            if ( !expresionregular.test(dato)) { 
                return "Debe poner un dni válido."    
            }else{
                return ""
            }

        }else{
            return ""
        }
    
}

export function validarequipo(dato){

    if(dato==="Elegir"){
        return "Debe elegir una opción" 
    }else{
        return ""
    }

}

