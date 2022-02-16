import React, {  useEffect, useState } from "react";
import { Container, Accordion} from 'react-bootstrap';
import FooterEsteban from "../Components/FooterEsteban/FooterEsteban.js";
import MenuPrivado from "../Components/MenuPrivado.js";
import { Alert, Button, Form, Table } from "react-bootstrap";
import { nuevoequipo, nuevojugador, verlistadoequipos, verlistadojugadores} from "./FireBase.js";
import CargarEquipos from "./CargarEquipos.js";



export default function  ModDatosEquipos() {

    const [equipo, setEquipo] = useState({
        nombre: "",
        categoria: "",
    });

    const [jugador, setJugador] = useState({
        nombre: "",
        apellido: "",
        documento:"",
        equipo:"",
    });

    const [campoequipo, setCampoequipo]= useState()

    const [campocategoria, setCampocategoria]= useState()

    const [camponombrejugador, setCamponombrejugador]= useState()   

    const [campoapellidojugador, setCampoapellidojugador]= useState()

    const [campodocumentojugador, setCampodocumentojugador]= useState()

    const [campoequipojugador, setCampoequipojugador]= useState()
    
    const [jugadoresdeequipo, setJugadoresdeequipo]= useState();
    
    const [listajugadores, setListajugadores]= useState("");
    
    const [listaequipos, setListaequipos]= useState("");
    
    const [registroequipos, setRegistroequipos]= useState("");

    const [registrojugadores, setRegistrojugadores]= useState("");
    
    const handleChangejugadores = (event) => {
   
        let valor= event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1).toLowerCase();

        if(event.target.name==="nombre"){
            setCamponombrejugador("");
        }

        if(event.target.name==="apellido"){
            setCampoapellidojugador("");
        }

        if(event.target.name==="documento"){
            setCampodocumentojugador("");
        }

        if(event.target.name==="equipo"){
            setCampoequipojugador("");
        }

        setJugador({  
            ...jugador,
            [event.target.name] : valor
        });
        
    };

    

    const handleSubmitjugadores = async (e)=>{

        e.preventDefault()

        if ((camponombrejugador==="") && (campoapellidojugador==="") && (campodocumentojugador==="") && (campoequipojugador===""))
        {
            setRegistrojugadores(await nuevojugador(jugador.nombre, jugador.apellido, jugador.documento, jugador.equipo));

        }else{
            setRegistrojugadores("Deve ingresar los datos correctamente")
        }

        setListajugadores("");
        equipoaver();
    }

    


    

    const obtenerjugadores = async ()=>{
        let resultado;
       
        if (listajugadores===""){ 
            
            resultado = await verlistadojugadores('jugadores');
            
            setListajugadores(resultado)
            
        }
       
    }

    const obtenerequipos = async ()=>{
        let resultado;
            
        resultado = await verlistadoequipos('equipos');
            
        setListaequipos(resultado)
            
        
       
    }

    useEffect(() => { 
        
        obtenerjugadores();
        obtenerequipos();
 
         
    })  

    const equipoaver = (event) =>{

          
        setJugadoresdeequipo(event.target.value)
     
    }


    const tablajugadores = ()=>{

        let listado=[];
       
        if (jugadoresdeequipo!==""){
            
            if(listajugadores !== ""){
    
                    listajugadores.forEach((item)=>{
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
        if(listaequipos !== ""){

            
           return(listaequipos.map((item)=>
                  
                    <option value={item.nombre} key={item.id} > {item.nombre}</option>
        
            ))}
            
    }

    function alertaequipos(){
        if(registroequipos!=="")
        {   
            if(registroequipos==="El equipo se registro con exito"){
                return(
                <Alert variant="success"> {registroequipos} </Alert>
                ) 
            }else if (registroequipos==="Se produjo un error, pruebe de nuevo o llame a su técnico"){
                return(
                    <Alert variant="danger"> {registroequipos} </Alert>
                    ) 
            }else if((registroequipos==="El equipo ya esta registrado") || (registroequipos==="Deve ingresar los datos correctamente")){
                return(
                    <Alert variant="warning"> {registroequipos} </Alert>
                    ) 
            }
                
        }
        
        
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

                <MenuPrivado/>
                <Container>
                
                    <br />
                    <br />
                    <h1>Seccion privada para cambios</h1>
                    <br />
                    <br />
                    <Accordion  defaultActiveKey="0">
                        
                        <Accordion.Item eventKey="1">
                            <Accordion.Header> <h1>Agregar Equipo</h1> </Accordion.Header>
                            <Accordion.Body>
                                <CargarEquipos listaequipos={listaequipos}/>
                            </Accordion.Body>
                        </Accordion.Item>
                        
                        <Accordion.Item eventKey="2" >
                            <Accordion.Header> <h1>Agregar Jugadores</h1> </Accordion.Header>
                            <Accordion.Body >

                            <Form onSubmit={handleSubmitjugadores}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Ingrese el nombre del jugador</Form.Label>
                                <Form.Control 
                                onChange={handleChangejugadores} 
                                name="nombre" 
                                type="text" 
                                placeholder="Jugador"
                                onBlur={(e)=>{
                                        
                                    let regex = /^[a-zA-Z ]{1,40}$/;

                                    setCamponombrejugador("");

                                    if(jugador.nombre!==""){

                                        if ( !regex.test(jugador.nombre)) { 
                                            setCamponombrejugador("Solo se aceptan letras.")     
                                            }     
                                    }
                                    
                                }}
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
                                onBlur={(e)=>{
                                        
                                    let regex = /^[a-zA-Z ]{1,40}$/;

                                    setCampoapellidojugador("");

                                    if(jugador.apellido!==""){

                                        if ( !regex.test(jugador.apellido)) { 
                                            setCampoapellidojugador("Solo se aceptan letras.")     
                                            }     
                                    }
                                    
                                }}
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
                                onBlur={(e)=>{
                                        
                                    let regex = /^[0-9]*$/;        
                                    let expresionregular = /^[0-9 ]{7,8}$/;
                                    setCampodocumentojugador("");

                                    if(jugador.documento!==""){

                                        if ( !regex.test(jugador.documento)) { 
                                            setCampodocumentojugador("Solo se aceptan numeros.")     
                                        } else 
                                            if( !expresionregular.test(jugador.documento)) {
                                            setCampodocumentojugador("El documento tiene un tamaño de 7 o 8 numeros.")
                                        }  
                                    }

                                    
                                }}
                            />
                            <p className="text-danger">  {campodocumentojugador}</p>
                            </Form.Group>

                            <Form.Label>Elegir Equipo</Form.Label>
                                <Form.Select 
                                aria-label="Default select example" 
                                onClick={handleChangejugadores} 
                                name="equipo" 
                                onBlur={(e)=>{
                                
                                    setCampoequipojugador("");

                                    if(jugador.equipo!==""){

                                        if (jugador.equipo==="Seleccione una opcion:") { 
                                            setCampoequipojugador("Seleccione una opcion")     
                                        } 
                                    } 
                                }}
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

                            </Accordion.Body>
                        </Accordion.Item>
                        
                    </Accordion>

            

                </Container>
                <FooterEsteban/>

                </>
        
        )};