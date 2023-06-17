//import React from "react";
import {Link, useNavigate} from "react-router-dom"
import axios from "axios";
import React, { useState } from "react";
import '../components/Isesion.css';
import '../App.css';
import { validarUserIniSesion, validarPasswordIniSesion } from "./validations";


const apiurl ="https://fastapi-juandavid1217.cloud.okteto.net/"

function IsesioN(){
    const response=null;
    const navigate = useNavigate();
    const[user, setUser] = useState('');
    const[password, setPassword] = useState('');
    const[tipo, setTipo] = useState(0);
    const[status, setStatus]=useState(0);

    const ChangeUser=(e)=>{
        setUser(e.target.value);
        
    }

    const ChangePassword=(e)=> {
        setPassword(e.target.value);
        
    }

    const iniSesion=(event, user, password)=>{
        var pase1=validarUserIniSesion(user)
        var pase2=validarPasswordIniSesion(password)
        if(pase1['usuario']!==null && pase2['password']!==null){
            
            axios(
            {
                method: 'GET',
                url: apiurl+"General-Users/"+user+"/"+pase2['password'],
            }
            ).then(res=>{
                if (res.status===200){
                    setTipo(res.data['id_tipo']);
                    setStatus(1);
                    const info=res.data;
                    if(info['id_tipo']===1){
                        navigate('/Admin', {state:info});
                    }else{
                        navigate('/Casa', {state:info})
                    }
                }
            }).catch(errors=>{
                if(errors.message!=='Network Error'){
                    window.alert(errors.response.data['detail'])
                }else{
                    console.log("server shutdown")
                } 
            })
        }else{
            window.alert(pase1['mensaje']+" "+pase2['mensaje'])
        }
    }

    const iniVin=(event, user, password)=>{
        var pase1=validarUserIniSesion(user)
        var pase2=validarPasswordIniSesion(password)
        if(pase1['usuario']!==null && pase2['password']!==null){
            
            axios(
            {
                method: 'GET',
                url: apiurl+"Empleado/"+user+"/"+password,
            }
            ).then(res=>{
                if (res.status===200){
                    setStatus(2)
                    const info=res.data;
                    navigate('/Empleado', {state:info});
                }
            }).catch(errors=>{
                //console.log(errors)
                if(errors.message!=='Network Error'){
                    window.alert(errors.response.data['detail'])
                }else{
                    console.log("server shutdown")
                }      
            })
        }else{
            window.alert(pase1['mensaje']+" "+pase2['mensaje'])
        }
    }

    return (
        <main>
                <div className="bienvenido-item">
                    <div className="img-bienvenida"></div>
                        <h1>Bienvenido</h1>
                        <p>Sistema Semiautomático para el Control en el Abastecimiento de Agua.</p>
                    <div className="botones-bienvenida">
                        <Link to= {"/registro"}>
                            <button>Registrarse</button>
                        </Link>
                    </div>
                </div>

                <div className="isesion-item">
                <h2>Iniciar Sesión</h2>
                <form action="">
                    <label htmlFor="nombreUsuario-signin">Nombre de Usuario</label>
                    <input type="text" id="nombreUsuario-signin" onChange={(e)=>{ChangeUser(e)}}/>
                    <label htmlFor="contrasena-signin">Contraseña</label>
                    <input type="password" id="contrasena-signin" onChange={(e)=>{ChangePassword(e)}}/>
                </form>
                <div className="botones-bienvenida">
                <button onClick={(e)=>{iniSesion(e, user, password)}}>Iniciar Sesión</button>
                <button onClick={(e)=>{iniVin(e, user, password)}}>Vinculación</button>
                </div>
                
                
            </div>
        </main>
    );

}
export default IsesioN;
