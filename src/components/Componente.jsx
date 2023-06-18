import React from "react";
import './Componente.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const apiurl ="https://fastapi-juandavid1217.cloud.okteto.net/"

function Componente (props) {
    const navigate=useNavigate();
    const {nombre, group_id, navegar, user}=props;

    const navegacion=(e, navegar)=>{
        if(navegar===1){
            displaygroup(e, group_id)
        }else{
            if(navegar===2){
                displayalmacenamientos(e, group_id)
            }
        }
    }
    const displaygroup=(e, group_id)=>{
        e.preventDefault();
        
        axios(
            {
                method: 'GET',
                url: apiurl+"Administrador/Grupo/"+group_id,
            }
        ).then(res=>{
            if(res.status===200){
                navigate('/Admin/Grupos', {state:res.data})
            }
        }).catch(errors=>{
            if(errors.message!=='Network Error'){
                window.alert(errors.response.data['detail'])
            }else{
                console.log("server shutdown")
            } 
        })
    }

    const displayalmacenamientos=(e, group_id)=>{
        e.preventDefault();
        
        axios(
            {
                method: 'GET',
                url: apiurl+"Administrador-Casa/Almacenamiento/"+group_id,
            }
        ).then(res=>{
            if(res.status===200){
                var alma=res.data;
                axios(
                    {
                        method: 'GET',
                        url: apiurl+"Administrador-Casa/Almacenamiento/IoT/"+alma['id_almacenamiento']
                    }
                ).then(res=>{
                    if(res.status===200){
                        const info={'info':alma,
                                    'user':user,
                                    'topico': res.data['dispo_IoT']}
                        navigate('/almacenamientos', {state:info})
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

    return(
        <div className="mainComponente" onClick={(e)=>{navegacion(e, navegar)}}>{nombre}</div>
    );
}

export default Componente;