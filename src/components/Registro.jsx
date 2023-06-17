import axios from "axios";
import React, { useState } from "react";
import '../components/Isesion.css';
import { useNavigate } from "react-router-dom";
import {validarUserRegister, validarPasswordRegister} from "./validations";


const apiurl ="https://fastapi-juandavid1217.cloud.okteto.net/"


function Registro(){
    const navigate = useNavigate();
    const [user, setUser]=useState('');
    const [password, setPassword]=useState('');
    const [confirmp, setConfirmp]=useState('');
    const [tipo, setTipo]=useState(1);
    const [status, setStatus]=useState(0);

    const handleChange=(event)=> {
        setTipo(event.target.value);
        console.log(event.target.value);
    }

    const ChangeUser=(event)=> {
        setUser(event.target.value);
    }

    const ChangePassword=(event)=> {
        setPassword(event.target.value);
    }

    const ChangeConfirmp=(event)=> {
        setConfirmp(event.target.value);
    }

    const Registro=(event, user, upassword, utipo)=>{
        var pase=validarUserRegister(user)
        var pase2=validarPasswordRegister(password)
        if((pase['usuario']!==null)&&(pase2['password']!==null)){
            
            axios(
            {
                method: 'POST',
                url: apiurl+"General-Users/",
                data:{
                    usuario:user,
                    password:upassword,
                    id_tipo: utipo
                }
            }
            ).then(res=>{
                if (res.status===200){
                    setStatus(1)
                    const info=res.data;
                    if(utipo===1){
                        navigate('/Admin', {state: info});
                    }else{
                        axios({
                            method:'POST',
                            url: apiurl+"Administrador-Casa/Grupo/",
                            data:{
                                nombre:"Mi Hogar",
                                id_usuario:info['id_usuario']
                            }
                        }).then(res2=>{
                            if(res2.status===200){
                                axios(
                                    {
                                        method: 'GET',
                                        url: apiurl+"General-Users/"+user+"/"+upassword,
                                    }
                                ).then(res=>{
                                    navigate('/Casa', {state: res.data})
                                }).catch(errors=>{
                                    if(errors.message!=='Network Error'){
                                        window.alert(errors.response.data['detail'])
                                    }else{
                                        console.log("server shutdown")
                                    } 
                                })
                            }
                        }).catch(errors=>{
                            if(errors.message!=='Network Error'){
                                window.alert(errors.response.data['detail'])
                            }else{
                                console.log("server shutdown")
                            } 
                        })
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
            window.alert(pase['mensaje']+" "+pase2['mensaje'])
        }
    }

    return (
        <main>
                <div className="registrarse-item">
                    <h2>Registrarse</h2>
                    <form action="">
                        <label htmlFor="nombreUsuario-login">Nombre de Usuario</label>
                        <input type="text" id="nombreUsuario" onChange={(e)=>{ChangeUser(e)}}/>
                        <label htmlFor="contrasena">Contraseña</label>
                        <input type="password" id="contrasena" onChange={(e)=>{ChangePassword(e)}}/>
                        <label htmlFor="confContrasena">Confirmar Contrasea</label>
                        <input type="password" id="confContrasena" onChange={(e)=>{ChangeConfirmp(e)}}/>
                        <label htmlFor="tipo-usuario">Tipo</label>
                        <select id="selection" className="styleofButtom" onClick={(e)=>{handleChange(e)}}>
                            <option value='1' >Administrador</option>
                            <option value='2' >Casa</option>
                        </select>
                    </form>
                    <button onClick={(e)=>{password===confirmp?(Registro(e, user, password, tipo)):(window.alert("Las contraseñas no son iguales."))}}>Registrarse</button>
                    
                </div>
            
        </main>
    );

}


export default Registro;