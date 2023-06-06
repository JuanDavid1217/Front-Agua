import React from "react";
import './Componente.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
//const apiurl = "http://127.0.0.1:8000/"
const apiurl ="https://fastapi-juandavid1217.cloud.okteto.net/"//https://fastapi-juandavid1217.cloud.okteto.net/"

function Componente (props) {
    const navigate=useNavigate();
    const {nombre, group_id, navegar, user}=props;

    const navegacion=(e, navegar)=>{
        if(navegar==1){
            displaygroup(e, group_id)
        }else{
            if(navegar==2){
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
            if(res.status==200){
                navigate('/Admin/Grupos', {state:res.data})
            }
        }).catch(errors=>{
            window.alert(errors.response.data['detail'])
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
            if(res.status==200){
                const info={'info':res.data,
                      'user':user}
                navigate('/almacenamientos', {state:info})
            }
        }).catch(errors=>{
            window.alert(errors.response.data['detail'])
        })
    }

    return(
        <div className="mainComponente" onClick={(e)=>{navegacion(e, navegar)}}>{nombre}</div>
    );
}

export default Componente;