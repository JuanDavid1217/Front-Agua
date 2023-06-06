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
    const[estadoV, setEstadoV]=useState(1)
    const[capacidad, setCapacidad]=useState(0)
    const [ubi, setUbi]=useState("")
    const [nombre, setNombre]=useState("")
    const [usuario, setUsuario]=useState("")
    const [password, setPassword]=useState("")
    //const id_user=null

    const changeEstado = (e) => {
        e.preventDefault();
        if (estado=== 1) {
            setEstado(2 )
            console.log(estado)
        } else {
            setEstado(1)
            console.log(estado)
        }
    }

    const changeCapacidad=(e)=>{
        e.preventDefault()
        setCapacidad(e.target.value)
    }
    const changeUbi=(e)=>{
        e.preventDefault()
        setUbi(e.target.value)
    }
    const changeNombre=(e)=>{
        e.preventDefault()
        setNombre(e.target.value)
    }
    const changeUsuario=(e)=>{
        e.preventDefault()
        setUsuario(e.target.value)
    }
    const changePassword=(e)=>{
        e.preventDefault()
        setPassword(e.target.value)
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
        if(estadoE==1){
            setEstadoE(2)
        }else{
            setEstadoE(1)
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
        if(estadoM==1){
            setEstadoM(2)
        }else{
            setEstadoM(1)
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



    /*----TODO ESTO ES PARA MODIFICAR----*/

    const vinculacion=(e)=>{
        e.preventDefault()
        if(estadoV==1){
            setEstadoV(2)
        }else{
            setEstadoV(1)
        }
    }
    const vincular=(e, u, p)=>{
        e.preventDefault()
        axios(
            {
                method:'POST',
                url: apiurl+"Administrador/",
                data:{
                    usuario_vinculacion: u,
                    id_grupo: id,
                    clave_vinculacion: p
                }
            }
        ).then(res=>{
            vinculacion(e)
            window.alert("usuario vinculado con exito!!")
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
                    estado==2?(
                    <ul class="menu" id="menu" >
                        {nivel==2&&tipo==1?(<li><a onClick={(e)=>{vinculacion(e)}}>Vincular</a></li>):(<></>)}
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
            {estadoE==2?(
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
            {estadoM==2?(
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
                        <button onClick={(e)=>{nivel==2?(modificarGrupo(e, nombre)):(modificarAlma(e, ubi, capacidad ))}}>Confirmar</button>
                        <button onClick={(e)=>{modificar(e)}}>Cancelar</button>
                    </div>
                </div>
            ):(<></>)}

            {/* Esto es lo que tendra la ventana de vinculacion */}
            {estadoV==2?(
                <div class="popupvin">
                    <h2>VINCULACIÓN</h2>
                    <br/>
                    <p>Ingresa un nombre de usuario y  una contraseña para que otra persona tenga acceso a este grupo.</p>
                    <br/>
                    <p><h4>Nota:</h4> El usuario vinculado no podra realizar modificaciones o eliminaciones en tu grupo.</p>
                    <br/>
                    <div>
                        <label htmlFor="user">Usuario: </label>
                        <input type="text" id="user" onChange={(e)=>{changeUsuario(e)}}/>
                        <br/>
                        <label htmlFor="password">Contraseña:  </label>
                        <input type="text" id="password" onChange={(e)=>{changePassword(e)}}/>
                        <br/>
                        <br/>
                        <p class="opciones">La contraseña debe contener contener 1 caracter especial: ! . +</p>
                    </div>
                    <br/>
                    <div>
                        <button onClick={(e)=>{vincular(e, usuario, password)}}>vincular</button>
                        <button onClick={(e)=>{vinculacion(e)}}>Cancelar</button>
                    </div>
                </div>
            ):(<></>)}
        </>
    )
}

export default Menu;