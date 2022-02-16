import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import {nuevojugador} from "./FireBase.js";

export default function Suspendidos() {

    const [equipo, setEquipo] = useState({
        nombre: "",
        categoria: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setEquipo((prevState) => {
            return {
              ...prevState,
            [name]: value,
                
        }});
    };

    const  handleSubmit = async (e) => {

        e.preventDefault()

         await nuevojugador(equipo.nombre, equipo.categoria)
        
        //sesion ? navegar('/privada') : alert("Error pruebe de nuevo");
    
    }


    return(

        <>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Ingrese el nombre del Equipo</Form.Label>
            <Form.Control onChange={handleChange} name="nombre" type="text" placeholder="Equipo" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Ingrese la categoría</Form.Label>
            <Form.Control onChange={handleChange} name="categoria" type="text" placeholder="Categoría" />
        </Form.Group>

        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
        </>
    )};

