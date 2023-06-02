import React from "react";
import './Portada.css';

function Portada (props) {
    return(
        <div className="imagenPortada" style={{ backgroundImage: `url('${props.urlPortada}')` }}></div>
    )
}

export default Portada;