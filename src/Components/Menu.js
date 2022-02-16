import React from "react";
import { Link} from "react-router-dom";
import {Navbar, Container, NavDropdown, Nav} from "react-bootstrap";

export default function Menu() {

    return (
        <>

        <Navbar className="fs-5" bg="dark" variant="dark" expand="lg">
        <Container>
           
            <Link className="navbar-brand fs-4" to="/">Liga Veteranos</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
        
            <Nav >
                
                <Link className="nav-link active" aria-current="page" to="/">Comunicados</Link>
   
                <NavDropdown title="Categorías" id="collasible-nav-dropdown" className="nav-item dropdown">
                    <Link className="dropdown-item" to="/libre">Libre</Link>
                    <Link className="dropdown-item" to="/senior">Seniors</Link>
                    <Link className="dropdown-item" to="/maxi">Maxi</Link>
                    <Link className="dropdown-item" to="/master">Master</Link>
                </NavDropdown>

               
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
        
        </>
    )};
