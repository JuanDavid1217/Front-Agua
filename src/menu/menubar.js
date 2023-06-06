import './style.css';
import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios";

const apiurl = "https://fastapi-juandavid1217.cloud.okteto.net/";

function Menu(props) {
    const {tipo, nivel, id, grupo, objeto}=props
    const [estado, setEstado] = useState(1)
    const navegar=useNavigate()
    const[estadoE, setEstadoE] = useState(1)
    const[estadoM, setEstadoM]=useState(1)
    const[capacidad, setCapacidad]=useState(0)
    const [ubi, setUbi]=useState("")
    const [nombre, setNombre]=useState("")
    //const id_user=null

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

    const changeCapacidad=(e)=>{
        e.preventDefault()
        setCapacidad({capacidad:e.target.value})
    }
    const changeUbi=(e)=>{
        e.preventDefault()
        setUbi({ubi:e.target.value})
    }
    const changeNombre=(e)=>{
        e.preventDefault()
        setNombre({nombre:e.target.value})
    }
    
    const cerrarsession=(e)=>{
        navegar('/', {state:null, replace:true})
    }

/*---ELIMINACION DE ALMACENAMIENTOS Y/O GRUPOS----*/
    /*---RESTABLECIMIENTO DE DATOS----*/
    const almacenamientosAdmin=(e)=>{
        console.log(grupo)
        axios(
            {
                method: 'GET',
                url: apiurl+"Administrador/Grupo/"+grupo,
            }
        ).then(res=>{
            if(res.status==200){
                navegar('/Admin/Grupos', {state:res.data, replace:true})
            }
        }).catch(errors=>{
            window.alert(errors.response.data['detail'])
        })
    }
    const almacenamientosCasa=(e, u)=>{
        e.preventDefault()
        axios(
            {
                method: 'GET',
                url: apiurl+"General-Users/"+u
            }
        ).then(res=>{
            if(res.status==200){
                navegar('/Casa', {state:res.data, replace:true})
            }
        }).catch(errors=>{
            window.alert(errors.response.data['detail'])
        })
    }
    //posteriormente se obtiene la info del usuario
    const grupos=(e, id_user)=>{
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
                method: 'GET',
                url: apiurl+"Administrador-Casa/"+id
            }
        ).then(res=>{
            const u=res.data
            axios(
                {
                    method: 'DELETE',
                    url: apiurl+"Administrador-Casa/Almacenamiento/"+id
                }
            ).then(res=>{
                if(res.status==200){
                    eliminar(e)
                    if(tipo==1){
                        almacenamientosAdmin(e)
                    }else{
                        almacenamientosCasa(e, u['id_usuario'])
                    }
                }
            }).catch(errors=>{
                window.alert(errors.response.data['detail'])
            })
        }).catch(errors=>{
            window.alert(errors.response.data['detail'])
        })
    }


    const eliminarGrupo=(e)=>{
        e.preventDefault();
        axios(
            {
                method: 'GET',
                url: apiurl+"Administrador/Grupo/"+id
            }
        ).then(res=>{
            //console.log(res.data['id_usuario'])
            //id_user= res.data['id_usuario']
            //console.log(id_user)
            const info=res.data['id_usuario']
            if(info!=null||info!=undefined){
                axios(
                    {
                        method: 'DELETE',
                        url: apiurl+"Administrador-Casa/Grupo/"+id
                    }
                ).then(res=>{
                    eliminar(e)
                    window.alert("Grupo eliminado con exito!")
                    grupos(e, info)
                }).catch(errors=>{
                    window.alert(errors.response.data['detail'])
                })
            }

        }).catch(errors=>{
            window.alert(errors.response.data['detail'])
        })
    }

/*----TODO ESTO ES PARA MODIFICAR----*/

    const modificar=(e)=>{
        e.preventDefault()
        if(estadoM['estadoM']==1){
            setEstadoM({estadoM:2})
        }else{
            setEstadoM({estadoM:1})
        }
    }

    const modificarAlma=(e, ubi, capacidad)=>{
        e.preventDefault();
        axios(
            {
                method: 'GET',
                url: apiurl+"Administrador-Casa/"+id
            }
        ).then(res=>{
            const u=res.data
            axios(
                {
                    method: 'PUT',
                    url: apiurl+"Administrador-Casa/Almacenamiento/"+id,
                    data:{
                        capacidad_maxima:capacidad,
                        ubicacion:ubi,
                        id_grupo:objeto['id_grupo']
                    }
                }
            ).then(res=>{
                if(res.status==200){
                    modificar(e)
                    if(tipo==1){
                        almacenamientosAdmin(e)
                    }else{
                        almacenamientosCasa(e, u['id_usuario'])
                    }
                }
                window.alert("Almacenamiento modificado con exito!!")
            }).catch(errors=>{
                window.alert(errors.response.data['detail'])
            })
        }).catch(errors=>{
            window.alert(errors.response.data['detail'])
        })
    }

    const modificarGrupo=(e, nombre)=>{
        console.log(objeto['id_usuario'])
        e.preventDefault();
        axios(
            {
                method: 'PUT',
                url: apiurl+"Administrador-Casa/Grupo/"+id,
                data:{
                    nombre:nombre
                }
            }
        ).then(res=>{
            modificar(e)
            window.alert("Grupo modificado con exito!")
            grupos(e, objeto['id_usuario'])
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
                            <li><a onClick={(e)=>{modificar(e)}}>Modificar</a></li>
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

            {/* Lo que contendra la ventana de modificacio*/}
            {estadoM['estadoM']==1?(
                <div class="popup">
                    <h2>ACTUALIZACIÓN</h2>
                    <br/>
                    <p>¿Estas seguro de querer modificar el {nivel==2?("Grupo"):("Almacenamiento")} actual?</p>
                    <br/>
                    {nivel==2?(
                        <div>
                        <label htmlFor="capacidadMax">Nombre:  </label>
                        <input type="text" id="ubi" onChange={(e)=>{changeNombre(e)}}/>
                        </div>
                    ):(
                        <>
                        <div>
                        <label htmlFor="capacidadMax">Capacidad:  </label>
                        <input type="text" id="capacidad" onChange={(e)=>{changeCapacidad(e)}}/>
                        </div>
                        <br/>
                        <div>
                        <label htmlFor="ubi">Ubicación:  </label>
                        <input type="text" id="ubi" onChange={(e)=>{changeUbi(e)}}/>
                        </div>
                        </>
                    )}
                    <br/>
                    <div>
                        <button onClick={(e)=>{nivel==2?(modificarGrupo(e, nombre['nombre'])):(modificarAlma(e, ubi['ubi'], capacidad['capacidad'] ))}}>Confirmar</button>
                        <button onClick={(e)=>{modificar(e)}}>Cancelar</button>
                    </div>
                </div>
            ):(<></>)}

        </>
    )
}

export default Menu;