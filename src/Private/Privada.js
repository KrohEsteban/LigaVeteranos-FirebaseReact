import React from "react";
import ModDatosPartidos from "./ModDatosPartidos.js";
import ModDatosEquipos from "./ModDatosEquipos.js";
import ReturnLogin from "./ReturnLogin.js"
import { useLogeado, useVerlistadoequipos, useVerlistadojugadores } from "./FireBase.js";



export default function Privada() {
    
    let token = useLogeado(); ;
    console.log("ingreso usuario" , token)
    /*
        Va al servidor a ver si el usuario esta logeado, 
        si lo esta inresa a una pag o a otra depende del tipo de usuario
        mientras espera la respuesta del servidor pone el logo de cargando
        si no esta logeado muestra un alerta para retornar al login
    */

    
    // actualizacione en tiempo real de las listas cuando se cargan
    const listaequipos = useVerlistadoequipos("equipos");

    const listajugadores= useVerlistadojugadores("jugadores");

  
    if ( (token === 0) || (token === null)){
            
        return <>Cargando...</>
            
    }else if (token === 1 ){     
            
        return <ModDatosPartidos listaequipos={listaequipos} listajugadores={listajugadores}/>

    }else if (token === 2){     
        
        return <ModDatosEquipos listaequipos={listaequipos} listajugadores={listajugadores}/>
                
    }else{

        return <ReturnLogin/>

    };
             
    
};      
