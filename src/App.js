import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css' ;
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Comunicados from './Comunicados/Comunicados.js';
import Libre from './Libre/Libre'
import Maxi from './Maxi/Maxi';
import Master from './Master/Master';
import Senior from './Senior/Senior';
import Privada from './Private/Privada.js';
import Login from './Private/Login.js';


export default function App() {
   

    return(
        <React.StrictMode>
            <BrowserRouter >
                <Routes>
                    <Route path="/senior" element={<Senior />} /> 
                    <Route path="/libre" element={<Libre />} />
                    <Route path="/maxi" element={<Maxi />} />
                    <Route path="/master" element={<Master />} />
                    <Route path="/privada" element={ <Privada /> } />
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Comunicados />} />
                    <Route path="*" element={<h1>Error 404</h1> } />
                </Routes>
            </BrowserRouter >
        </React.StrictMode>
    )
};

