import React from "react";
import { Link} from "react-router-dom";
import {Navbar, Container, Nav, Button} from "react-bootstrap";
import { useNavigate } from "react-router";
import { salir } from "../Private/FireBase";

export default function MenuPrivado() {

    const navegar = useNavigate (); 

    const  redirect = async () =>{
        salir()
        navegar('/login')
    }

    return (
        <>

        <Navbar className="fs-5" bg="dark" variant="dark" expand="lg">
        <Container>
           
            <Link className="navbar-brand fs-4" to="#">Liga Veteranos sección para subir información</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
        
            <Nav >
                
                <Button className="espaciobutton" ariant="primary" type="button" size="lg" onClick={redirect}  >
                    Salir
                </Button>

               
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        
        </>
    )};
