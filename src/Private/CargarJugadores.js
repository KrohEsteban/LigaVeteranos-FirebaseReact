import React, {  useEffect, useState } from "react";
import { Container, Accordion} from 'react-bootstrap';
import FooterEsteban from "../Components/FooterEsteban/FooterEsteban.js";
import MenuPrivado from "../Components/MenuPrivado.js";
import { Alert, Button, Form, Table } from "react-bootstrap";
import { nuevoequipo, nuevojugador, useVerlistadojugadores, verlistadoequipos, verlistadojugadores} from "./FireBase.js";
import CargarEquipos from "./CargarEquipos.js";



export default function  CargarJugadores(props) {

    const [jugador, setJugador] = useState({
        nombre: "",
        apellido: "",
        documento:"",
        equipo:"",
    });

    const listajugadores= useVerlistadojugadores("jugadores");
   
    const [campoequipo, setCampoequipo]= useState()

    const [campocategoria, setCampocategoria]= useState()

    const [camponombrejugador, setCamponombrejugador]= useState("")   

    const [campoapellidojugador, setCampoapellidojugador]= useState("")

    const [campodocumentojugador, setCampodocumentojugador]= useState("")

    const [campoequipojugador, setCampoequipojugador]= useState("")
    
    const [jugadoresdeequipo, setJugadoresdeequipo]= useState();
    
    const [listaequipos, setListaequipos]= useState("");
    
    const [registroequipos, setRegistroequipos]= useState("");

    const [registrojugadores, setRegistrojugadores]= useState("");
    
    const handleChangejugadores = (event) => {
   
        let valor= event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1).toLowerCase();

        setJugador({  
            ...jugador,
            [event.target.name] : valor
        });
        
    };


    const handleSubmitjugadores = async (e)=>{

        e.preventDefault()

        if ((camponombrejugador==="") && (campoapellidojugador==="") && (campodocumentojugador==="") && (campoequipojugador===""))
        {
            setRegistrojugadores(await nuevojugador(jugador.nombre, jugador.apellido, jugador.documento, jugador.equipo, listajugadores));

        }else{
            setRegistrojugadores("Deve ingresar los datos correctamente")
        }

    }

    const equipoaver = (event) =>{

          
        setJugadoresdeequipo(event.target.value)
     
    }


    const tablajugadores = ()=>{

        let listado=[];
       
        if (jugadoresdeequipo!==""){
            
            if(listajugadores !== ""){
    
                    listajugadores.map((item)=>{
                        let objeto=[];
                        if(item.equipo===jugadoresdeequipo){
                            
                            objeto.id = item.id;
                            objeto.nombre = item.nombre;
                            objeto.apellido = item.apellido;
                            objeto.documento =item.documento
                            
                            listado.push(objeto);
                        }
                    })
                
            }
        }
        if(listado !== ""){

            return(listado.map(item=>{

               
                    return(
                        <tr key={item.id}>
                        
                                <td >{item.nombre}</td>
                                <td >{item.apellido}</td>
                                <td >{item.documento}</td>
                            
                        </tr>
                    )
                
                
                })
                    
            )
        }        
            
    }

    const tablaequipos= ()=>{
        if(listaequipos !== ""){

            
            return(listaequipos.map((item)=>
                <tr key={item.id}>
            
                    <td >{item.nombre}</td>
                    <td >{item.categoria}</td>
                    
                </tr>
                
            ))}
            
    }

    const listaselectequipos= ()=>{
        if(props.listaequipos !== ""){

            
           return(props.listaequipos.map((item)=>
                  
                    <option value={item.nombre} key={item.id} > {item.nombre}</option>
        
            ))}
            
    }

    
    function alertajugadores(){
        if(registrojugadores!=="")
        {   
            if(registrojugadores==="El jugador se registro con exito"){
                return(
                <Alert variant="success"> {registrojugadores} </Alert>
                ) 
            }else if (registrojugadores==="Se produjo un error, pruebe de nuevo o llame a su técnico"){
                return(
                    <Alert variant="danger"> {registrojugadores} </Alert>
                    ) 
            }else if((registrojugadores==="El jugador ya esta registrado") || (registrojugadores==="Deve ingresar los datos correctamente")){
                return(
                    <Alert variant="warning"> {registrojugadores} </Alert>
                    ) 
            }
                
        }
        
        
    }

return ( 
<>

               

                            <Form onSubmit={handleSubmitjugadores}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Ingrese el nombre del jugador</Form.Label>
                                <Form.Control 
                                onChange={handleChangejugadores} 
                                name="nombre" 
                                type="text" 
                                placeholder="Jugador"
                                
                            />
                            <p className="text-danger">  {camponombrejugador}</p>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control 
                                onChange={handleChangejugadores} 
                                name="apellido" 
                                type="text" 
                                placeholder="Apellido" 
                               
                            />
                            <p className="text-danger">  {campoapellidojugador}</p>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Ingrese el documento</Form.Label>
                                <Form.Control 
                                onChange={handleChangejugadores} 
                                name="documento" 
                                type="text" 
                                placeholder="Documento" 
                            
                            />
                            <p className="text-danger">  {campodocumentojugador}</p>
                            </Form.Group>

                            <Form.Label>Elegir Equipo</Form.Label>
                                <Form.Select 
                                aria-label="Default select example" 
                                onClick={handleChangejugadores} 
                                name="equipo" 
                                
                                >
                                <option >Seleccione una opcion:</option>
                                {listaselectequipos()}
                                </Form.Select>
                                <p className="text-danger">  {campoequipojugador}</p>
                                <br />

                            <Button variant="primary" type="submit">
                                Enviar
                            </Button>
                            <br />
                            <br />
                            
                                {alertajugadores()}
                            </Form>

                            <br />
                            <div>
                            <Form.Label >Ingresar equipo para ver lista de jugadores:</Form.Label>
                                <Form.Select aria-label="Default select example" onClick={equipoaver} name="equipo" >
                                <option > Seleccione una opcion: </option>
                                {listaselectequipos()}
                                </Form.Select></div>
                                <br />
                            <Table striped bordered hover>
                            <thead>
                                <tr>
                            
                                <th>Nombre del jugador</th>
                                <th>Apellido</th>
                                <th>Documento</th>
                                
                            
                                </tr>
                            </thead>
                            <tbody>

                            {tablajugadores()}   

                            </tbody>
                            </Table>

                            
                </>
        
        )};