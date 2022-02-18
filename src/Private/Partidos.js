import React, { useEffect, useState } from "react";
import { Button, Form, Table} from "react-bootstrap";
import InputSpinner from 'react-bootstrap-input-spinner' 


export default function Partidos() {

    const [lista, setLista]= useState("");

    const obtenerequipos = async ()=>{
        let resultado;
       
        if (lista===""){ 
            
            //resultado = await verlistadoequipos('equipos');
            
            setLista(resultado)
            
        }
       
    }

    useEffect(() => { 
        
        obtenerequipos();
 
         
    })  

    const tabla= ()=>{
        if(lista !== ""){

            
           return( lista.map((item)=>
                  
                    <option key={item.id} value={item.id} >{item.nombre}</option>
        
            ))}
            
    }

    return(

        <>
        <Form >
        <Table striped bordered hover>
        <thead>
            <tr>
        
            <th>
                <Form.Label>Elegir Equipo</Form.Label>
                <Form.Select aria-label="Default select example" >
                {tabla()}
                </Form.Select>
                <br />
                <Form.Label>Elegir Resultado</Form.Label>
                <InputSpinner
                    type={'int'}
                    className="justify-content-center"
                    precision={0}
                    max={50}
                    min={0}
                    step={1}
                    value
                    onChange={num=>console.log(num)}
                    variant={'dark'}
                    size="sm"
                    editable = {false}
                />
            </th>

            <th>
                 <Form.Label>Elegir Equipo</Form.Label>
                <Form.Select aria-label="Default select example">
            
                {tabla()}
                </Form.Select>
                <br />
                <Form.Label>Elegir Resultado</Form.Label>
                <InputSpinner
                    type={'int'}
                    className="justify-content-center"
                    precision={0}
                    max={50}
                    min={0}
                    step={1}
                    value
                    onChange={num=>console.log(num)}
                    variant={'dark'}
                    size="sm"
                    editable = {false}
                />
            </th>
               
            </tr>
        </thead>
        </Table>
        
        <br /> <br />

        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
        </>
    )};

