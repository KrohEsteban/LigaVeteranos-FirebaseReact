import React, { useState } from "react";
import { Alert, Button, Form, Table } from "react-bootstrap";
import {nuevojugador} from "./FireBase.js";
import { validarapellido, validardocumento, validarequipo, validarnombre } from "../Components/Validadores.js";



export default function  CargarJugadores(props) {

    const [jugador, setJugador] = useState({
        nombre: "",
        apellido: "",
        documento:"",
        equipo:"",
    });
    // estado para mostrar el texto al validar los campos en el onblur

    const [camponombrejugador, setCamponombrejugador]= useState("")   

    const [campoapellidojugador, setCampoapellidojugador]= useState("")

    const [campodocumentojugador, setCampodocumentojugador]= useState("")

    const [campoequipojugador, setCampoequipojugador]= useState("")

    //almasena el equipo del que se quiere mostrar la lista de jugadores

    const [jugadoresdeequipo, setJugadoresdeequipo]= useState();

    // estado para mostrar el mensaje de alerta si no se almasena el jugador en el servidor
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


        // vuelve a validar los datos xq el on blur no detecta cuando presionas enter
        const validacionnombre=validarnombre(jugador.nombre)
        setCamponombrejugador(validacionnombre)
        const validacionapellido=validarapellido(jugador.apellido)
        setCampoapellidojugador(validacionapellido)
        const validaciondocumento=validardocumento(jugador.documento)
        setCampodocumentojugador(validaciondocumento)
        const validacionequipo=validarequipo(jugador.equipo)
        setCampoequipojugador(validacionequipo)

        if ((validacionnombre==="") && (validacionapellido==="") && (validaciondocumento==="") && (validacionequipo===""))
        {
            setRegistrojugadores(await nuevojugador(jugador.nombre, jugador.apellido, jugador.documento, jugador.equipo, props.listajugadores));

        }else{
            setRegistrojugadores("Deve ingresar los datos correctamente")
        }

    }


    // evento para detectar el equipo del cual queremos ver la lista de jugadores
    const equipoaver = (event) =>{

          
        setJugadoresdeequipo(event.target.value)
     
    }

    //muestra la lista de jugadores

    const tablajugadores = ()=>{

        let listado=[];
       
        if (jugadoresdeequipo!==""){
            
            if(props.listajugadores !== ""){
    
                    props.listajugadores.forEach((item)=>{
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


    //muestra la lista e equipos para las opciones del select
    const listaselectequipos= ()=>{
        if(props.listaequipos !== ""){

            
           return(props.listaequipos.map((item)=>
                  
                    <option value={item.nombre} key={item.id} > {item.nombre}</option>
        
            ))}
            
    }

    // alerta del registro de equipos
    function alertajugadores(){
        if(registrojugadores!=="")
        {   
            setTimeout(()=>{setRegistrojugadores("")},3000) 
            
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
                                onBlur={()=>setCamponombrejugador( validarnombre(jugador.nombre)) }
                                
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
                                onBlur={()=>setCampoapellidojugador( validarapellido(jugador.apellido)) }
                               
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
                                onBlur={()=>setCampodocumentojugador( validardocumento(jugador.documento)) }
                            
                            />
                            <p className="text-danger">  {campodocumentojugador}</p>
                            </Form.Group>

                            <Form.Label>Elegir Equipo</Form.Label>
                                <Form.Select 
                                aria-label="Default select example" 
                                onChange={handleChangejugadores} 
                                name="equipo" 
                                onClick={()=>setCampoequipojugador( validarequipo(jugador.equipo))}
                                >
                                <option value="Elegir">Seleccione una opcion:</option>
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