//import React from "react";
import {Link, Navigate, useNavigate, Routes, Route, BrowserRouter} from "react-router-dom"
import axios from "axios";
import React, { Component, useState } from "react";
import '../components/Isesion.css';
import Administrador from '../components/Administrador.jsx';
import Casa from '../components/Casa.jsx';
import '../App.css';

//const apiurl = "http://127.0.0.1:8000/"
const apiurl ="https://fastapi-juandavid1217.cloud.okteto.net/"

function IsesioN(){
    const navigate = useNavigate();
    const[user, setUser] = useState('');
    const[password, setPassword] = useState('');
    const[tipo, setTipo] = useState(0);
    const[status, setStatus]=useState(0);

    const ChangeUser=(e)=>{
        setUser({user: e.target.value});
        
    }

    const ChangePassword=(e)=> {
        setPassword({password: e.target.value});
        
    }

    const iniSesion=(event, user, password)=>{
        console.log(user)
        axios(
        {
            method: 'GET',
            url: apiurl+"General-Users/"+user+"/"+password,
        }
        ).then(res=>{
            if (res.status==200){
                setTipo({tipo: res.data.id_tipo});
                setStatus({status: 1});
                const info=res.data;
                if(status['status']==1){
                    if(tipo['tipo']==1){
                        navigate('/Admin', {state:info});
                    }else{
                        navigate('/Casa', {state:info})
                    }
                }
            }
        }).catch(errors=>{
        })
    }

    const iniVin=(event, user, password)=>{
        
        axios(
        {
            method: 'GET',
            url: apiurl+"Empleado/"+user+"/"+password,
        }
        ).then(res=>{
            if (res.status==200){
                setStatus({status: 2})
                const info=res.data;
                if(status['status']==2){
                    navigate('/Empleado', {state:info});
                }
            }
        }).catch(errors=>{
        })
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
                <button onClick={(e)=>{iniSesion(e, user['user'], password['password'])}}>Iniciar Sesión</button>
                <button onClick={(e)=>{iniVin(e, user['user'], password['password'])}}>Vinculación</button>
                </div>
                {/*<Routes>
                    <Route path={"/perfil"} element={<Administrador/>}/>
    </Routes>*/}
                {/*{status['status']==1?(tipo['tipo']==1?(<Navigate to={"/Admin"}></Navigate>):(<Navigate to={"/Casa"}></Navigate>)):(status['status']==2?(<Navigate to={"/Empleado"}></Navigate>):(console.log("user not found")))}*/}
                
            </div>
        </main>
    );

}
export default IsesioN;
{/*export default class Isesion extends Component {
    constructor(props) {
        super(props);
        this.state = {user: '',
                      password: '',
                      tipo:0,
                      status: 0};
    
        this.ChangeUser = this.ChangeUser.bind(this);
        this.ChangePassword = this.ChangePassword.bind(this);
        this.iniSesion = this.iniSesion.bind(this);
        this.iniVin = this.iniVin.bind(this);
    }
    
    ChangeUser(event) {
        this.setState({user: event.target.value});
        event.preventDefault();
    }
    ChangePassword(event) {
        this.setState({password: event.target.value});
        event.preventDefault();
    }
    iniSesion(event, user, password){
        event.preventDefault();
        axios(
        {
            method: 'GET',
            url: apiurl+"General-Users/"+user+"/"+password,
        }
        ).then(res=>{
            if (res.status==200){
                this.setState({
                    tipo: res.data.id_tipo,
                    status: 1})
            }
        }).catch(errors=>{
        })
    }
    iniVin(event, user, password){
        event.preventDefault();
        axios(
        {
            method: 'GET',
            url: apiurl+"Empleado/"+user+"/"+password,
        }
        ).then(res=>{
            if (res.status==200){
                this.setState({
                    status: 2})
            }
        }).catch(errors=>{
        })
    }
render () {
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
                    <input type="text" id="nombreUsuario-signin" onChange={this.ChangeUser}/>
                    <label htmlFor="contrasena-signin">Contraseña</label>
                    <input type="password" id="contrasena-signin" onChange={this.ChangePassword}/>
                </form>
                <div className="botones-bienvenida">
                <button onClick={(e)=>{this.iniSesion(e, this.state.user, this.state.password)}}>Iniciar Sesión</button>
                <button onClick={(e)=>{this.iniVin(e, this.state.user, this.state.password)}}>Vinculación</button>
                </div>
                {/*<Routes>
                    <Route path={"/perfil"} element={<Administrador/>}/>
    </Routes>
                {this.state.status==1?(this.state.tipo==1?(<Navigate to={"/Admin"}></Navigate>):(<Navigate to={"/Casa"}></Navigate>)):(this.state.status==2?(<Navigate to={"/Empleado"}></Navigate>):(console.log("user not found")))}
                
            </div>
        </main>
    );
}

}*/}