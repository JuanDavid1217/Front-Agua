import React, {useState} from "react";
import './Administrador.css';
import Portada from './Portada.jsx';
import Componente from './Componente.jsx'
import { useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import Menu from '../menu/menubar.js'
import { validarNombres } from "./validations";

const apiurl = "https://fastapi-juandavid1217.cloud.okteto.net/"

function Administrador() {
    const location = useLocation();
    const navegar=useNavigate();
    const admin=location.state;
    const opcion=1;
    const [nombre, setNombre]=useState('');

    const ChangeNombre=(e)=>{
        e.preventDefault();
        setNombre(e.target.value);
    }

    const createGroup=(e, user, nombreg, admin)=>{
        e.preventDefault();
        var pase1=validarNombres(nombreg)
        if(pase1['nombre']!==null){
            addGroup(e, user, nombreg, admin);
        }else{
            window.alert(pase1['mensaje'])
        }
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
            getGroups(e, user, admin)
        }).catch(errors=>{
            if(errors.message!=='Network Error'){
                window.alert(errors.response.data['detail'])
            }else{
                console.log("server shutdown")
            } 
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
            admin['grupos']=res.data;
            navegar('/Admin', {state:admin, replace:true});
        }).catch(errors=>{
            if(errors.message!=='Network Error'){
                window.alert(errors.response.data['detail'])
            }else{
                console.log("server shutdown")
            } 
        })

    
    }
    
    return (
        <div className="mainAdministrador">
            <Portada
                urlPortada='https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
            />
            <Menu vista={1} tipo={admin['id_tipo']}/>
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
                            
                            <div key={index}><Componente nombre={alm['nombre']} group_id={alm['id_grupo']} navegar={opcion} user={admin['id_usuario']}/></div>
                            
                        ))}
                        
                    </div>
                </div>
                {admin['id_tipo']===1?(<div className="altaGrupo">
                    <h2>Alta de Grupo</h2>
                    <form action="">
                        <label htmlFor="nombreAlta">Nombre</label>
                        <input type="text" onChange={(e)=>{ChangeNombre(e)}}/>
                    </form>
                    <div className="botonesAlta">
                        <button onClick={(e)=>{createGroup(e, admin['id_usuario'], nombre, admin)}} disabled={admin['grupos'].length>=5?(true):(false)}>Crear</button>
                    </div>
                </div>):(<></>)}
            </div>
        </div>
    );
}

export default Administrador;