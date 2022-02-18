import { useEffect, useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// import gestion usuario

import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";


// import base de datos
import { getFirestore, setDoc, doc, collection, onSnapshot, query, getDoc} from "firebase/firestore";


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
const  auth = getAuth(); // usuario
const db = getFirestore(); // base de datos

// iniciar sesion
/*
devuelve 0 si hay un error, 1 si puede ingresar cualquier usuario y 
2 si el usuario de agragar equipo esta HABILITADO
3 si el usuario de agregar equipo esta DESABILITADO 
*/ 
export async function login(username, password){
  
  let token = 0;
  
  const docRef = doc(db, "usuario", "YEfWLF5SQjMkaXT6RoCO"); //revisa si esta habilitado el usuario de agregar equipos
  
  const docSnap = await getDoc(docRef);
  
  await signInWithEmailAndPassword(auth, username, password) //revisa si el usuario es correcto
  .then(() => {
      // Signed in
      token=1;
      
      
      
      if (docSnap.exists()) {
        if (docSnap.data().usuarioequipos){
          token = 2;
        }else{
          token = 3;
        }
      } else {
        
        token=0;
      }
      // ...
  })
  .catch((error) => {
      token=0;
  
  });

  

  return token;

}


// salir

export async function salir(){

  await signOut(auth).then(() => {
  // Sign-out successful.

  }).catch((error) => {
  // An error happened.
  });

}

//esta logeado?
/*
  Detecta el login y si esun usuario o otro para mostrar diferentes paginas
*/
export function useLogeado() {

  const [token, setToken] = useState(0);
  
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


// Listado de Equipos en tiempo real

export function useVerlistadoequipos(coleccion) {

  
  const [listadoequipos, setListaquipos] = useState([]);

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


// listado de jugadores en tiempo real

export function useVerlistadojugadores(coleccion) {

  
  const [listajugadores, setListajugadores]= useState([]);

  console.log("Ingreso al servidor para pedir lista de jugadores")
  
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
          objeto.apellido = item.data().apellido;
          objeto.documento =item.data().documento
          objeto.equipo =item.data().equipo
          objeto.goles =item.data().goles
          objeto.suspendido =item.data().suspendido
          
      
          listado.push(objeto);
            
        })
        //si la lista que trajo es igual de largo que el estado entonces la cambia 
        //si no no se hace render y espera al proximo llamado
      if(listajugadores.length !== listado.length){
      
        setListajugadores(listado)
      }
      
    
    
    });

  });
  
    
      
   
  return listajugadores ;
}


// Agregar equipo

export async function nuevoequipo(categoria, nombre, lista) {

  let texto;
  let equipoid = uuidv4(); //elige un uid automatico 
  let validador = true;

  // detecta si el equipo ya esta en la lista por el nombre
  lista.forEach((item)=>{
  
    if(item.nombre===nombre){
      validador= false;
    }
  });  
    //si no lo esta lo ingresa con los resultados en 0
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

export async function nuevojugador(nombre, apellido, documento, equipo, lista) {
  
    let texto;
    let jugadorid = uuidv4(); //elige un uid automatico
    let validador = true;
  // detecta si el jugador ya esta en la lista por el dni
    lista.forEach((item)=>{
    
      if(item.documento===documento){
        validador= false;
      }
    });  
      //si no lo esta lo agrega con los datos de goles y tarjetas en 0
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
  