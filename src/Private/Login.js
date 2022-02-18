import React, {useState} from "react";
import { Container, Button, Form } from 'react-bootstrap';
import { useNavigate } from "react-router";
import FooterEsteban from "../Components/FooterEsteban/FooterEsteban.js";
import Menu from "../Components/Menu.js";
import {login} from "./FireBase.js";


export default function Login() {
    
    const navegar = useNavigate () 
    
    const [user, setUser] = useState({
        username: "",
        password: "",
    });
    
    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setUser((prevState) => {
            return {
              ...prevState,
            [name]: value,
                
        }});
    };
    
     const  handleSubmit = async (e) => {

        e.preventDefault()
       
        const sesion = await login(user.username, user.password); 

        if ((sesion === 1) || (sesion === 2)){
            navegar('/privada')
        }else if (sesion === 3){
            alert ("El usuario esta desabilitado")
        }else{
            alert("Error pruebe de nuevo o consulte con el técnico");
        }   
    
    }

    return (
    
        <>
    
        <Menu/>
        <Container>            
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Ingrese su Correo</Form.Label>
                    <Form.Control onChange={handleChange}  name="username" type="text" placeholder="Usuario" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Ingrese su Contraseña</Form.Label>
                    <Form.Control onChange={handleChange}  name="password" type="password" placeholder="Contraseña" />
                </Form.Group>
                <Button variant="primary" type="submit" >
                    Enviar
                </Button>
            </Form>
        </Container>
        <FooterEsteban/>
    
        </>
    
    )};
    