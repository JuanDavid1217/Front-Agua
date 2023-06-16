import axios from "axios";
import React, { Component, useState } from "react";
import '../components/Isesion.css';
import Administrador from '../components/Administrador.jsx';
import '../App.css';
import { useNavigate } from "react-router-dom";
import {validarUserRegister, validarPasswordRegister} from "./validations";


//const apiurl = "http://127.0.0.1:8000/"
const apiurl ="https://fastapi-juandavid1217.cloud.okteto.net/"//https://fastapi-juandavid1217.cloud.okteto.net/"
function Registrarse(e, usuario, upassword){
    e.preventDefault();
    axios(
        {
            method: 'GET',
            url: apiurl+"General-Users/"+usuario+"/"+upassword,
        }
    ).then(res=>{
        console.log(res.status)
    }).catch(errors=>{
    })
}

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
        if((pase['usuario']!=null)&&(pase2['password']!=null)){
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
                if (res.status==200){
                    setStatus(1)
                    const info=res.data;
                        if(utipo==1){
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
                                if(res2.status==200){
                                    //navigate('/Casa', {state: res2.data})
                                    axios(
                                        {
                                            method: 'GET',
                                            url: apiurl+"General-Users/"+user+"/"+upassword,
                                        }
                                    ).then(res=>{
                                        navigate('/Casa', {state: res.data})
                                    }).catch(errors=>{
                                        window.alert(errors.response.data['detail'])
                                    })
                                }
                            }).catch(errors=>{
                                window.alert(errors.response.data['detail'])
                            })
                        }
                
                }
            }).catch(errors=>{
                window.alert(errors.response.data['detail'])
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
                    <button onClick={(e)=>{if(password==confirmp){Registro(e, user, password, tipo)}else{console.log('Las contraseñas no son iguales')}}}>Registrarse</button>
                    {/*this.state.status==1?(this.state.tipo==1?(<Navigate to={"/Admin"}></Navigate>):(<Navigate to={"/Casa"}></Navigate>)):(console.log("User not found"))*/}
                </div>
            
        </main>
    );

}

{/*export default class Registro extends Component {
    constructor(props) {
        super(props);
        this.state = {user: '',
                      password: '',
                      confirmp: '',
                      tipo: 1,
                      status: 0};
    
        this.ChangeUser = this.ChangeUser.bind(this);
        this.ChangePassword = this.ChangePassword.bind(this);
        this.ChangeConfirmp = this.ChangeConfirmp.bind(this);
        this.Registro = this.Registro.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({tipo: event.target.value});
        console.log(event.target.value)
        event.preventDefault();
    }

    ChangeUser(event) {
        this.setState({user: event.target.value});
        event.preventDefault();
    }
    ChangePassword(event) {
        this.setState({password: event.target.value});
        event.preventDefault();
    }
    ChangeConfirmp(event) {
        this.setState({confirmp: event.target.value});
        event.preventDefault();
    }
    Registro(event, user, upassword, utipo){
        event.preventDefault();
        axios(
        {
            method: 'POST',
            url: apiurl+"General-Users",
            data:{
                usuario:user,
                password:upassword,
                id_tipo: utipo
            }
        }
        ).then(res=>{
            if (res.status==200){
                this.setState({status: 1})
            }
        }).catch(errors=>{
        })
    }
render () {
    return (
        <main>
                <div className="registrarse-item">
                    <h2>Registrarse</h2>
                    <form action="">
                        <label htmlFor="nombreUsuario-login">Nombre de Usuario</label>
                        <input type="text" id="nombreUsuario" onChange={this.ChangeUser}/>
                        <label htmlFor="contrasena">Contraseña</label>
                        <input type="password" id="contrasena" onChange={this.ChangePassword}/>
                        <label htmlFor="confContrasena">Confirmar Contrasea</label>
                        <input type="password" id="confContrasena" onChange={this.ChangeConfirmp}/>
                        <label htmlFor="tipo-usuario">Tipo</label>
                        <select id="selection" className="styleofButtom" value={this.state.value} onChange={this.handleChange}>
                            <option value='1' >Administrador</option>
                            <option value='2' >Casa</option>
                        </select>
                    </form>
                    <button onClick={(e)=>{if(this.state.password==this.state.confirmp){this.Registro(e, this.state.user, this.state.password, this.state.tipo)}}}>Registrarse</button>
                    {this.state.status==1?(this.state.tipo==1?(<Navigate to={"/Admin"}></Navigate>):(<Navigate to={"/Casa"}></Navigate>)):(console.log("User not found"))}
                </div>
            
        </main>
    );
}

*/}
export default Registro;