import React, {  useEffect, useState } from "react";
import { Container, Accordion} from 'react-bootstrap';
import FooterEsteban from "../Components/FooterEsteban/FooterEsteban.js";
import MenuPrivado from "../Components/MenuPrivado.js";
import { Alert, Button, Form, Table } from "react-bootstrap";
import { nuevoequipo, nuevojugador, useVerlistadoequipos, verlistadoequipos, verlistadojugadores} from "./FireBase.js";
import CargarEquipos from "./CargarEquipos.js";
import { collection, getFirestore, onSnapshot, query } from "firebase/firestore";



export default function  ModDatosEquipos() {

  
    const listaequipos = useVerlistadoequipos("equipos");


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


                            </Accordion.Body>
                        </Accordion.Item>
                        
                    </Accordion>

            

                </Container>
                <FooterEsteban/>

                </>
        
        )};