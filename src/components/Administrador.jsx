import React, {useState} from "react";
import './Administrador.css';
import Portada from './Portada.jsx';
import Componente from './Componente.jsx'
import { useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

//const apiurl = "http://127.0.0.1:8000/"
const apiurl = "https://fastapi-juandavid1217.cloud.okteto.net/"//"https://fastapi-juandavid1217.cloud.okteto.net/"

function Administrador() {
    const location = useLocation();
    console.log(location.state);
    const navegar=useNavigate();
    const admin=location.state;
    const opcion=1;
    const [nombre, setNombre]=useState('');

    const ChangeNombre=(e)=>{
        e.preventDefault();
        setNombre({nombre:e.target.value});
    }

    const createGroup=(e, user, nombreg, admin)=>{
        e.preventDefault();
        addGroup(e, user, nombreg, admin);
    }
    const addGroup=(e, user, nombreg, admin)=>{
        e.preventDefault();
        axios(
            {
                method: 'POST',
                url: apiurl+"Administrador-Casa/Grupo/",
                data:{
                    nombre: nombreg,
                    id_usuario:user
                }
            }
        ).then(res=>{
            console.log("Respuesta de guardado (Grupo): "+res.status)
            getGroups(e, user, admin)
        }).catch(errors=>{
        })
    }

    const getGroups=(e, user, admin)=>{
        e.preventDefault();
        axios(
            {
                method: 'GET',
                url: apiurl+"Administrador/Grupos/"+user
            }
        ).then(res=>{
            console.log(res.data)
            admin['grupos']=res.data;
            navegar('/Admin', {state:admin});
        }).catch(errors=>{
        })
    }
    //console.log(info)
    return (
        <div className="mainAdministrador">
            <Portada
                urlPortada='https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
            />
            <div className="contenidoAdministrador">
                <div className="gpoAdministrador">
                    <h1>Mis Grupos</h1>
                    <div className="noRegistros">
                        <p>No. Máximo de Registros:</p>
                        <p>5</p>
                        <p>Registros Actuales:</p>
                        <p>{admin['grupos'].length}</p>
                    </div>
                    <div className="gpoGrupos">
                        {admin['grupos'].map((alm, index)=>(
                            
                            <div key={index}><Componente nombre={alm['nombre']} group_id={alm['id_grupo']} navegar={opcion}/></div>
                            
                        ))}
                        {/*<button className="nuevaSucursal">
                            <box-icon name='folder-plus' color='#456c75' ></box-icon>
                            <p>Crear</p>
                        </button>
                        <Componente
                            nombre = "Sucursal Córdoba"
                        />
                        <Componente
                            nombre = "Sucursal Orizaba"
                        />
                        <Componente
                            nombre = "Sucursal Veracruz"
                        />
                        <Componente
                            nombre = "Sucursal Nogales"
                        />
                        <Componente
                            nombre = "Sucursal Fortin"
                        />*/}
                    </div>
                </div>
                {admin['id_tipo']==1?(<div className="altaGrupo">
                    <h2>Alta de Grupo</h2>
                    <form action="">
                        <label htmlFor="nombreAlta">Nombre</label>
                        <input type="text" onChange={(e)=>{ChangeNombre(e)}}/>
                    </form>
                    <div className="botonesAlta">
                        <button onClick={(e)=>{createGroup(e, admin['id_usuario'], nombre['nombre'], admin)}} disabled={admin['grupos'].length>=5?(true):(false)}>Crear</button>
                    </div>
                </div>):(<></>)}
            </div>
        </div>
    );
}

export default Administrador;