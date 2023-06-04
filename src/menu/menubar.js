import './style.css';
import React, { useState } from "react";

function Menu() {
    const [estado, setEstado] = useState()
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
                        <li><a href="#">Vincular</a></li>
                        <li><a href="#">Modificar</a></li>
                        <li><a href="#">Eliminar</a></li>
                        <li><a href="#">Cerrar Sesión</a></li>
                    </ul>
                    ):(<> </>)
                }
            </div>

        </>
    )
}

export default Menu();