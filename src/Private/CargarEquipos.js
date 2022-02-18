import React, { useState } from "react";
import { Alert, Button, Form, Table } from "react-bootstrap";
import { nuevoequipo} from "./FireBase.js";
import {validarcategoria, validarnombre} from "../Components/Validadores.js";


export default function  CargarEquipos(props) {
    // muestra un alerta si hay algun error en el servidor como un jugador ya cargado
    const [registroequipos, setRegistroequipos]= useState("");
    
    // estados para validar los campos 
    const [camponombre, setCamponombre] = useState("")
    const [campocategoria, setCampocategoria] = useState("")

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

        //Valida nuevamente los campos antes de enviarlos al servidor (el onblure no detecta si apretas enter)
        const validacionnombre=validarnombre(equipo.nombre)
        setCamponombre(validacionnombre)
        const validacioncategoria=validarcategoria(equipo.categoria)
        setCampocategoria(validacioncategoria)
        
        if ((validacionnombre==="") && (validacioncategoria===""))
        {
            setRegistroequipos(await nuevoequipo(equipo.categoria, equipo.nombre, props.listaequipos));

        }else{
            setRegistroequipos("Deve ingresar los datos correctamente")
        }
  
       
    }

    // muestra la tabla de equipos
    const tablaequipos= ()=>{
        
        if(props.listaequipos !== ""){

            
            return(props.listaequipos.map(item=>
                <tr key={item.id}>
            
                    <td >{item.nombre}</td>
                    <td >{item.categoria}</td>
                    
                </tr>
                
            ))}
            
    }

    //muestra el alert del registro de equipos
    function alertaequipos(){
        if(registroequipos!=="")
        {   
            setTimeout(()=>{setRegistroequipos("")},3000) 

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
            <Form.Control onChange={handleChangeequipos} name="nombre" type="text" placeholder="Equipo" 
            onBlur={()=>setCamponombre(validarnombre(equipo.nombre))}/>
            <p className="text-danger">{camponombre}</p>
        </Form.Group>
        <Form.Label >Ingrese la categoria:</Form.Label>
            <Form.Select aria-label="Default select example" onChange={handleChangeequipos} name="categoria" 
            onClick={()=>setCampocategoria(validarcategoria(equipo.categoria))}>
            <option value="Elegir"> Seleccione una opcion: </option>
            <option value="Senior" > Senior </option>
            <option value="Maxi"> Maxi </option>
            <option value="Master"> Master </option>
            <option value="Libre"> Libre </option>
            
            </Form.Select>
            <p className="text-danger">{campocategoria}</p>

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