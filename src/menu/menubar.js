import './style.css';
import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";

const apiurl = "https://fastapi-juandavid1217.cloud.okteto.net/";

function Menu(props) {
    const {tipo, nivel, id}=props
    const [estado, setEstado] = useState(1)
    const navegar=useNavigate()
    const[estadoE, setEstadoE] = useState(1)
    var id_user=-1

    const changeEstado = (e) => {
        e.preventDefault();
        if (estado['estado'] === 1) {
            setEstado({ estado: 2 })
            console.log(estado['estado'])
        } else {
            setEstado({ estado: 1 })
            console.log(estado['estado'])
        }
    }
    
    const cerrarsession=(e)=>{
        navegar('/', {state:null, replace:true})
    }
    /*---RESTABLECIMIENTO DE DATOS----*/
    //primero se necesia conseguir el id_del usuario
    const getid=(e)=>{
        e.preventDefault()
        axios(
            {
                method: 'GET',
                url: apiurl+"Administrador/Grupo/"+id
            }
        ).then(res=>{
            if(res.status==200){
                const data1=res.data;
                console.log(data1['id_usuario'])
                return data1['id_usuario']
            }
        }).catch(errors=>{
            window.alert(errors.response.data['detail'])
        })
    }
    //posteriormente se obtiene la info del usuario
    const grupos=(e)=>{
        e.preventDefault()
        axios(
            {
                method: 'GET',
                url: apiurl+"General-Users/"+id_user
            }
        ).then(res=>{
            if(res.status==200){
                navegar("/Admin", {state:res.data, replace:true})
            }
        }).catch(errors=>{
            window.alert(errors.response.data['detail'])
        })
    }

    /*---ELIMINACION DE ALMACENAMIENTOS Y/O GRUPOS----*/

    const eliminar=(e)=>{
        e.preventDefault()
        if(estadoE['estadoE']==1){
            setEstadoE({estadoE:2})
        }else{
            setEstadoE({estadoE:1})
        }
    }

    const eliminarAlma=(e)=>{
        e.preventDefault();
        axios(
            {
                method: 'DELETE',
                url: apiurl+"Administrador-Casa/Almacenamiento/"+id
            }
        ).then(res=>{
            eliminar(e)
            window.alert("Almacenamiento eliminado con exito!")
        }).catch(errors=>{
            eliminar(e)
            window.alert(errors.response.data['detail'])
        })
    }
    const modificarAlma=(e, ubi, capacidad)=>{
        e.preventDefault();
        axios(
            {
                method: 'UPDATE',
                url: apiurl+"Administrador-Casa/Almacenamiento/"+id,
                data:{
                    capacidad_maxima:capacidad,
                    ubicacion:ubi
                }
            }
        ).then(res=>{
            //Vlida aqui si se actualizo o no
        }).catch(errors=>{
            window.alert(errors.response.data['detail'])
        })
    }

    const eliminarGrupo=(e)=>{
        e.preventDefault();
        id_user=getid(e)
        console.log(id_user)
        axios(
            {
                method: 'DELETE',
                url: apiurl+"Administrador-Casa/Grupo/"+id
            }
        ).then(res=>{
            eliminar(e)
            window.alert("Grupo eliminado con exito!")
            grupos(e)
        }).catch(errors=>{
            eliminar(e)
            window.alert(errors.response.data['detail'])
        })
    }
    const modificarGrupo=(e, nombre)=>{
        e.preventDefault();
        axios(
            {
                method: 'UPDATE',
                url: apiurl+"Administrador-Casa/Grupo/"+id,
                data:{
                    nombre:nombre
                }
            }
        ).then(res=>{
            //Vlida aqui si se actualizo o no
        }).catch(errors=>{
            window.alert(errors.response.data['detail'])
        })
    }
    //const {vista}=props
    {/*tipo
     1: Empleado (Vinculacion)
     2: Administrador
     3: Casa*/}
    {/*vista
     1: solo cerrar sesion
     2: cerrar sesion, eliminar, modificar o vncular (a nivel de grupo)
     3: cerrar sesion, eliminar, modificar (a nivel de almacenamiento)*/}

    return (
        <>

            <div class="navbar">
                <div class="navbar-toggle" onClick={(e) => { changeEstado(e) }}>
                    <div class="bar"></div>
                    <div class="bar"></div>
                    <div class="bar"></div>
                </div>
                {
                    estado['estado']==2?(
                    <ul class="menu" id="menu" >
                        {nivel==2&&tipo==1?(<li><a href="#">Vincular</a></li>):(<></>)}
                        {(nivel==2||nivel==3)&&(tipo==2||tipo==1)?(
                            <>
                            <li><a href="#">Modificar</a></li>
                            <li><a onClick={(e)=>{eliminar(e)}}>Eliminar</a></li>
                            </>):(<></>)}
                        <li><a onClick={(e)=>{cerrarsession(e)}}>Cerrar Sesión</a></li>
                    </ul>
                    ):(<> </>)
                }
            </div>

            {/* Lo que contendra la ventana de eliminacion*/}
            {estadoE['estadoE']==1?(
                <div class="popup">
                    <h2>ELIMINACION</h2>
                    <br/>
                    <p>Estas seguro de querer eliminar el {nivel==2?("Grupo"):("Almacenamiento")} actual?, Los datos eliminados
                    no podran recuperarse.</p>
                    <br/>
                    <div>
                        <button onClick={(e)=>{nivel==2?(eliminarGrupo(e)):(eliminarAlma(e))}}>Confirmar</button>
                        <button onClick={(e)=>{eliminar(e)}}>Cancelar</button>
                    </div>
                </div>
            ):(<></>)}

        </>
    )
}

export default Menu;