import React, {useState} from "react";
import Portada from "./Portada";
import Componente from "./Componente";
import './Sucursal.css';
import { useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import Menu from '../menu/menubar.js'

//const apiurl = "http://127.0.0.1:8000/"
const apiurl = "https://fastapi-juandavid1217.cloud.okteto.net/"//https://fastapi-juandavid1217.cloud.okteto.net/"

function Sucursal(props) {
    const location = useLocation();
    const navegar=useNavigate();
    console.log(location.state);
    const grupos=location.state;
    const opcion=2;
    const {tipo}=props;
    const[capacidad, setCapacidad]=useState(0);
    const[ubicacion, setUbicacion]=useState('');

    const ChangeCapacidad=(e)=>{
        setCapacidad({capacidad:e.target.value})
    }

    const ChangeUbicacion=(e)=>{
        setUbicacion({ubicacion:e.target.value})
    }

    const createAlma=(e, capacidad, ubicacion, id_grupo, grupos)=>{
        e.preventDefault();
        addAlma(e, capacidad, ubicacion, id_grupo, grupos);
    }
    const addAlma=(e, capacidad, ubicacion, id_grupo, grupos)=>{
        e.preventDefault();
        axios(
            {
                method: 'POST',
                url: apiurl+"Administrador-Casa/Almacenamiento/",
                data:{
                    capacidad_maxima: capacidad,
                    ubicacion:ubicacion,
                    id_grupo: id_grupo
                }
            }
        ).then(res=>{
            console.log("Respuesta de guardado (Almacenamiento): "+res.status)
            getAlmas(e, id_grupo, grupos)
        }).catch(errors=>{
            window.alert(errors.response.data['detail'])
        })
    }

    const getAlmas=(e, id_grupo, grupos)=>{
        e.preventDefault();
        axios(
            {
                method: 'GET',
                url: apiurl+"Administrador-Casa/Almacenamientos/"+id_grupo
            }
        ).then(res=>{
            if(res.status==200){
                grupos['almacenamientos']=res.data;
                navegar('/Admin/Grupos', {state:grupos, replace:true})
            }
        }).catch(errors=>{
            window.alert(errors.response.data['detail'])
        })
    }

    return (
        <div className="mainSucursal">
            <Portada
                urlPortada="https://images.unsplash.com/photo-1533077162801-86490c593afb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
            />
            <Menu nivel={tipo==3?(1):(2)} tipo={tipo} id={grupos['id_grupo']} objeto={grupos}/>
            <div className="contenidoSucursal">
                <div className="gpoSucursal">
                    <h1>{grupos['nombre']}</h1>
                    <div className="noRegistros">
                        <p>No. Máximo de Registros:</p>
                        <p>5</p>
                        <p>Registros Actuales:</p>
                        <p>{grupos['almacenamientos'].length}</p>
                    </div>
                    <div className="gpoAlmacenamientos">
                        {grupos['almacenamientos'].map((alm, index)=>(
                            
                            <div key={index}><Componente nombre={alm['ubicacion']} group_id={alm['id_almacenamiento']} navegar={opcion} user={tipo}/></div>
                            
                        ))}
                        {/*<button className="nuevoAlmacenamiento">
                            <box-icon name='folder-plus' color='#456c75' ></box-icon>
                            <p>Crear</p>
                        </button>
                        <Componente
                            nombre="Tinaco Uno"
                        />
                        <Componente
                            nombre="Tinaco Dos"
                        />
                        <Componente
                            nombre="Tinaco Tres"
                        />
                        <Componente
                            nombre="Tinaco Cuatro"
                        />
                        <Componente
                            nombre="Tinaco Cinco"
                        />*/}
                    </div>
                </div>
                {tipo==1?(
                <div className="altaAlmacenamiento">
                    <h2>Alta de Almacenamiento</h2>
                    <form action="">
                        {/*<label htmlFor="nombreAlmacenamiento">Nombre</label>
                        <input type="text" id="nombreAlmacenamiento" />*/}
                        <label htmlFor="capacidadMax">Capacidad Máxima</label>
                        <input type="number" id="capacidadax" onChange={(e)=>{ChangeCapacidad(e)}}/>
                        <label htmlFor="ubicacionAlmacenamiento">Ubicación</label>
                        <input type="text" id="ubicacionAlmacenamiento" onChange={(e)=>{ChangeUbicacion(e)}}/>
                    </form>
                    <div className="botonesAlta">
                        <button onClick={(e)=>{createAlma(e, capacidad['capacidad'], ubicacion['ubicacion'], grupos['id_grupo'], grupos)}} disabled={grupos['almacenamientos'].length>=5?(true):(false)}>Crear</button>
                    </div>
                </div>):(<></>)}
            </div>
        </div>
    );
}

export default Sucursal;