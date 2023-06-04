import '../App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Isesion from '../components/Isesion.jsx';
import Portada from '../components/Portada.jsx'
import Administrador from '../components/Administrador.jsx';
import Sucursal from '../components/Sucursal.jsx';
import Casa from '../components/Casa.jsx'
import Almacenamiento from '../components/Almacenamiento';
import Registro from '../components/Registro';

export function MyRoutes(){
    return (
      <BrowserRouter>
      <Routes>
            <Route path="registro" element={<Registro/>}/>
            <Route path="/" element={<Isesion/>}/>
            <Route path={"Admin"} element={<Administrador/>}/>
            <Route path={"Casa"} element={<Casa/>}/>
            <Route path={"Empleado"} element={<Sucursal tipo={1} vista={1}/>}/>
            <Route path={"Admin/Grupos"} element={<Sucursal tipo={2} vista={2}/>}/>
            <Route path={"almacenamientos"} element={<Almacenamiento/>}/>
      </Routes>
      </BrowserRouter>
    )
}