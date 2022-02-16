import React, { useEffect, useState}   from "react";
import ModDatosPartidos from "./ModDatosPartidos.js";
import ModDatosEquipos from "./ModDatosEquipos.js";
import ReturnLogin from "./ReturnLogin.js"
import { logeado, useLogeado } from "./FireBase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";


export default function Privada() {
    
    let token = useLogeado(); ;
    console.log("ingreso usuario" , token)
  
    if ( (token === 0) || (token === null)){
            
        return <>Cargando...</>
            
    }else if (token === 1 ){     
            
        return <ModDatosPartidos/>

    }else if (token === 2){     
        
        return <ModDatosEquipos/>
                
    }else{

        return <ReturnLogin/>

    };
             
    
};      
