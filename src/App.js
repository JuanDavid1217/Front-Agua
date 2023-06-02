import './App.css';
import {Routes, Route} from "react-router-dom"
import Isesion from './components/Isesion.jsx';
import Portada from './components/Portada.jsx'
import Administrador from './components/Administrador.jsx';
import Sucursal from './components/Sucursal.jsx';
import Casa from './components/Casa.jsx'
import Almacenamiento from './components/Almacenamiento';
import Registro from './components/Registro';

import { MyRoutes } from './routers/routes.jsx';

function App() {
  return (
    <MyRoutes />
  )
}

export default App;
