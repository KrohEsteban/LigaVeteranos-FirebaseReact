import React  from "react";
import { Container, Button, Alert} from 'react-bootstrap';
import { useNavigate } from "react-router";




export default  function  ReturnLogin() {
    const navegar = useNavigate (); 

    const redirect = () =>{
        navegar('/login')
    }
return(
    <>
    
        <Container>
            <br />
        <Alert  variant="danger" className="">
            
            <Alert.Heading>No se puede mostrar esta pagina si no inicia sesión</Alert.Heading>
            <hr />
            <div className="d-flex justify-content-end">
            <Button onClick={redirect} variant="outline-success">
                Ir a la pagina de inicio de sesión
            </Button>
            </div>
        </Alert>
        </Container>
    
    </>
)};