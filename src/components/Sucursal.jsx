import React, {useState} from "react";
import Portada from "./Portada";
import Componente from "./Componente";
import './Sucursal.css';
import { useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import Menu from '../menu/menubar.js'
import { validarNombres, validarCantidad } from "./validations";


const apiurl = "https://fastapi-juandavid1217.cloud.okteto.net/"

function Sucursal(props) {
    const location = useLocation();
    const navegar=useNavigate();
    const grupos=location.state;
    const opcion=2;
    const {tipo}=props;
    const[capacidad, setCapacidad]=useState(0);
    const[ubicacion, setUbicacion]=useState('');

    const ChangeCapacidad=(e)=>{
        setCapacidad(e.target.value)
    }

    const ChangeUbicacion=(e)=>{
        setUbicacion(e.target.value)
    }

    const createAlma=(e, capacidad, ubicacion, id_grupo, grupos)=>{
        e.preventDefault();
        var pase1=validarNombres(ubicacion)
        var pase2=validarCantidad(capacidad)
        if(pase1['nombre']!==null && pase2['cantidad']!==null){
            addAlma(e, capacidad, ubicacion, id_grupo, grupos);
        }else{
            window.alert(pase1['mensaje']+" "+pase2['mensaje'])
        }
    }
    const addAlma=(e, capacidad, ubicacion, id_grupo, grupos)=>{
        e.preventDefault();
        var IoT;
        var almacenamiento;
        
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
            if(res.status===200){
                almacenamiento=res.data;
                axios(
                    {
                        method: 'GET',
                        url: apiurl+"Administrador-Casa/Grupo/"+id_grupo
                    }
                ).then(res=>{
                    if(res.status===200){
                        IoT=res.data;
                        axios(
                            {
                                method: 'POST',
                                url: apiurl+"Administrador-Casa/Almacenamiento/IoT/",
                                data:{
                                    dispo_IoT: `${IoT['usuario']}/${IoT['grupo']}/${ubicacion}`,
                                    id_almacenamiento: almacenamiento['id_almacenamiento']
                                }
                            }
                        ).then(res=>{
                            if(res.status===200){
                                //console.log(res.data)
                            }
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
            console.log("Respuesta de guardado (Almacenamiento): "+res.status)
            getAlmas(e, id_grupo, grupos)
        }).catch(errors=>{
            if(errors.message!=='Network Error'){
                window.alert(errors.response.data['detail'])
            }else{
                console.log("server shutdown")
            } 
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
            if(res.status===200){
                grupos['almacenamientos']=res.data;
                navegar('/Admin/Grupos', {state:grupos, replace:true})
            }
        }).catch(errors=>{
            if(errors.message!=='Network Error'){
                window.alert(errors.response.data['detail'])
            }else{
                console.log("server shutdown")
            } 
        })
    }

    return (
        <div className="mainSucursal">
            <Portada
                urlPortada="https://images.unsplash.com/photo-1533077162801-86490c593afb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
            />
            <Menu nivel={tipo===3?(1):(2)} tipo={tipo} id={grupos['id_grupo']} objeto={grupos}/>
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
                        
                    </div>
                </div>
                {tipo===1?(
                <div className="altaAlmacenamiento">
                    <h2>Alta de Almacenamiento</h2>
                    <form action="">
                        <label htmlFor="capacidadMax">Capacidad Máxima</label>
                        <input type="number" id="capacidadax" onChange={(e)=>{ChangeCapacidad(e)}}/>
                        <label htmlFor="ubicacionAlmacenamiento">Ubicación</label>
                        <input type="text" id="ubicacionAlmacenamiento" onChange={(e)=>{ChangeUbicacion(e)}}/>
                    </form>
                    <div className="botonesAlta">
                        <button onClick={(e)=>{createAlma(e, capacidad, ubicacion, grupos['id_grupo'], grupos)}} disabled={grupos['almacenamientos'].length>=5?(true):(false)}>Crear</button>
                    </div>
                </div>):(<></>)}
            </div>
        </div>
    );
}

export default Sucursal;