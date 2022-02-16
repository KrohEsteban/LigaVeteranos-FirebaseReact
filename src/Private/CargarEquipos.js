import React, {  useEffect, useState } from "react";
import { Container, Accordion} from 'react-bootstrap';
import FooterEsteban from "../Components/FooterEsteban/FooterEsteban.js";
import MenuPrivado from "../Components/MenuPrivado.js";
import { Alert, Button, Form, Table } from "react-bootstrap";
import { nuevoequipo, nuevojugador, verlistadoequipos, verlistadojugadores} from "./FireBase.js";


export default function  CargarEquipos(props) {

    const [registroequipos, setRegistroequipos]= useState("");

    const [equipo, setEquipo] = useState({
        nombre: "",
        categoria: "",
    });

    const handleChangeequipos = (event) => {

        let valor= event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1).toLowerCase();

        setEquipo({  
            ...equipo,
            [event.target.name] : valor
        });
    };

    const handleSubmitequipos = async (e)=>{

        e.preventDefault()
        
        if (true)
        {
            setRegistroequipos(await nuevoequipo(equipo.categoria, equipo.nombre, props.listaequipos));

        }else{
            setRegistroequipos("Deve ingresar los datos correctamente")
        }
  
       
    }


    const tablaequipos= ()=>{
        
        if(props.listaequipos !== ""){

            
            return(props.listaequipos.map(item=>
                <tr key={item.id}>
            
                    <td >{item.nombre}</td>
                    <td >{item.categoria}</td>
                    
                </tr>
                
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


    return(
        <>
        
        <Form onSubmit={handleSubmitequipos}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Ingrese el nombre del Equipo</Form.Label>
            <Form.Control onChange={handleChangeequipos} name="nombre" type="text" placeholder="Equipo" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Ingrese la categoría</Form.Label>
            <Form.Control onChange={handleChangeequipos} name="categoria" type="text" placeholder="Categoría"/>
        </Form.Group>

        <Button variant="primary" type="submit">
            Enviar
        </Button>
        <br />
        <br />
        
            {alertaequipos()}
        </Form>

        <br />
        
        <Table striped bordered hover>
        <thead>
            <tr>
        
            <th>Nombre del equipo</th>
            <th>Categoria</th>
        
            </tr>
        </thead>
        <tbody>
        
        {tablaequipos()}
            
        </tbody>
        </Table>

        </>
    )
}