import React, { useEffect, useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Login log out

import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";


// import base de datos
import { getFirestore, setDoc, doc, getDocs, collection, onSnapshot, query} from "firebase/firestore";


// generar id automatico
import { v4 as uuidv4 } from 'uuid';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAimvtX9XQ8g-GWZDqtF4eYwk9bN2TUESg",
  authDomain: "liga-de-veteranos.firebaseapp.com",
  projectId: "liga-de-veteranos",
  storageBucket: "liga-de-veteranos.appspot.com",
  messagingSenderId: "608636833010",
  appId: "1:608636833010:web:7476f65e0306ca7445946b"
};

// Initialize Firebase
initializeApp(firebaseConfig);


// iniciar sesion

export async function login(username, password){
  
  let token = false;
  
  const  auth = await getAuth();
  
  await signInWithEmailAndPassword(auth, username, password)
  .then(() => {
      // Signed in
      token=true;
      // ...
  })
  .catch((error) => {
      token=false;
  
  });

  return token;

}


// salir

export async function salir(){

  const auth = await getAuth();
  await signOut(auth).then(() => {
  // Sign-out successful.

  }).catch((error) => {
  // An error happened.
  });

}

//esta logeado?
export function useLogeado() {

  const [token, setToken] = useState(0);

  const auth = getAuth();
  
  useEffect(() => {
    
    onAuthStateChanged(auth, (user) => {
                
      if (user) {
        if(user.uid==="7n0g6VhtDqgWMuwa8a5KadVyS1O2")
        {
            setToken(1);
        }else if (user.uid==="0L3Xjin4o9WeSfAfB4RKLqwlXS22")
        {
            setToken(2);
            
        } else {
            setToken(3);
        }
      }
    }); 
          
  });
   
  return token;
}


// Listado de Equipos

export function useVerlistadoequipos(coleccion) {

  
  const [listadoequipos, setListaquipos] = useState([]);

  const db = getFirestore();

  console.log("Ingreso al servidor para pedir lista de equipos")
  
  useEffect(()=>{
    
    //funcion real time
    onSnapshot(query(collection(db, coleccion)), (snapshot) => {
        //ingresa cada ves que hay un cambio
        let listado =[];
        //hace for each para ordenar la lista
        snapshot.forEach((item)=>{
        
            let objeto = []

            objeto.id=item.id;
            objeto.nombre = item.data().nombre;
            objeto.categoria = item.data().categoria;
            objeto.dg =item.data().dg
            objeto.gc =item.data().gc
            objeto.gf =item.data().gf
            objeto.pe =item.data().pe
            objeto.pg =item.data().pg
            objeto.pj =item.data().pj
            objeto.pp =item.data().pp
            objeto.puntos =item.data().puntos
            

            listado.push(objeto);
            
        })
        //si la lista que trajo es igual de largo que el estado entonces la cambia 
        //si no no se hace render y espera al proximo llamado
      if(listadoequipos.length !== listado.length){
      
        setListaquipos(listado)
      }
      
    
    
    });

  });
  
    
      
   
  return listadoequipos ;
}


// listado de jugadores

export async function verlistadojugadores(coleccion) {
  
  const db = await getFirestore();

  let listado = [];
  
  const datos = await getDocs(collection(db, coleccion));
    
  
    datos.docs.forEach((item)=>{
      
      let objeto = []

      objeto.id=item.id;
      objeto.nombre = item.data().nombre;
      objeto.apellido = item.data().apellido;
      objeto.documento =item.data().documento
      objeto.equipo =item.data().equipo
      objeto.goles =item.data().goles
      objeto.suspendido =item.data().suspendido
      
  
      listado.push(objeto);
      
    })
    
  return listado;
}


// Agregar equipo

export async function nuevoequipo(categoria, nombre, lista) {
// Add a new document in collection "cities"
  const db = await getFirestore();
  let texto;
  let equipoid = uuidv4();
  let validador = true;

  lista.forEach((item)=>{
  
    if(item.nombre===nombre){
      validador= false;
    }
  });  
    
  if (validador)
    {
      try{
        await setDoc(doc(db, "equipos", equipoid), {
            nombre:nombre,
            categoria: categoria,
            dg: 0,
            gc: 0,
            gf: 0,
            pe: 0,
            pg: 0,
            pj: 0,
            pp: 0,
            puntos: 0,
        }); 
        
        texto= "El equipo se registro con exito"
      }catch{
        texto="Se produjo un error, pruebe de nuevo o llame a su técnico"
      }

    }else{
      texto="El equipo ya esta registrado"
    }

  return texto;
}


// Agregar jugadores

export async function nuevojugador(nombre, apellido, documento, equipo) {
  // Add a new document in collection "cities"
    const db = await getFirestore();
    const lista= await verlistadojugadores("jugadores")
    let texto;
    let jugadorid = uuidv4();
    let validador = true;
  
    lista.forEach((item)=>{
    
      if(item.documento===documento){
        validador= false;
      }
    });  
      
    if (validador)
      {
        try{
          await setDoc(doc(db, "jugadores", jugadorid), {
              nombre:nombre,
              apellido: apellido,
              documento: documento,
              equipo: equipo,
              goles: 0,
              suspendido: 0,
              
          }); 
          
          texto= "El jugador se registro con exito"
        }catch{
          texto="Se produjo un error, pruebe de nuevo o llame a su técnico"
        }
      }else{
        texto="El jugador ya esta registrado"
      }

    return texto;
  }
  