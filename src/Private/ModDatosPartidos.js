import React  from "react";
import { Container, Accordion} from 'react-bootstrap';
import FooterEsteban from "../Components/FooterEsteban/FooterEsteban.js";
import MenuPrivado from "../Components/MenuPrivado.js";
import Partidos from "./Partidos.js";
import Suspendidos from "./Suspendidos.js";


export default function  ModDatosPartidos() {

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
                            <Accordion.Header> <h1>Agregar partido</h1> </Accordion.Header>
                            <Accordion.Body>

                            <Partidos/>

                            </Accordion.Body>
                        </Accordion.Item>
                        
                        <Accordion.Item eventKey="2">
                            <Accordion.Header> <h1>Jugadores Suspendidos</h1> </Accordion.Header>
                            <Accordion.Body>

                            <Suspendidos/>

                            </Accordion.Body>
                        </Accordion.Item>
                        
                    </Accordion>

            

                </Container>
                <FooterEsteban/>

                </>
        
        )};