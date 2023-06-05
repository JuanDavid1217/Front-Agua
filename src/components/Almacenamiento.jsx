import React from "react";
import Portada from "./Portada";
import './Almacenamiento.css'
import Menu from '../menu/menubar.js'
import { useLocation } from "react-router-dom";

function Almacenamiento() {
    const data=useLocation()
    const dataAlma=data.state['info']
    const user=data.state['user']
    console.log("Estoy en el almacenaiento del user_id: "+user)
    return (
        <div className="mainAlmacenamiento">
            <Portada
                urlPortada='https://images.unsplash.com/photo-1509041172795-d4869fe4a9eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1254&q=80'
            />
            <Menu nivel={3} tipo={user} id={dataAlma['id_almacenamiento']}/>
            <div className="contenidoAlmacenamiento">
                <h1>Tinaco 1 <span>Almacenamiento</span></h1>
                <div className="historialConsumo">
                    <h2>Historial de Consumo</h2>
                    <form action="">
                        <label htmlFor="fechaInicio">Fecha de Inicio</label>
                        <input type="date" id="fechaInicio" />
                        <label htmlFor="fechaFin">Ficha de Fin</label>
                        <input type="date" id="fechaFin" />
                    </form>
                    <button>Calcular</button>
                </div>
                <div className="estadoActual">
                    <h2>Estado Actual</h2>
                    <div className="estadoActualDatos">
                        <p>Capacidad máxima</p>
                        <p>100 lts</p>
                        <div>Nivel actual</div>
                        <div>2/3</div>
                    </div>
                    <div className="nivelGrafico">
                        <div className="nivel" id="nivel1"></div>
                        <div className="nivel" id="nivel2"></div>
                        <div className="nivel" id="nivel3"></div>
                    </div>
                    <div className="estado">
                        <p>Estado</p>
                        <form action="">
                            <input type="radio" id="estadoEncendido" />
                            <label htmlFor="estadoEncendido">Encendido</label>
                            <input type="radio" id="estadoApagado" />
                            <label htmlFor="estadoApagado">Apagado</label>
                        </form>
                    </div>
                </div>
                <div className="tablaConsumo">
                    <table>
                        <tr className="num1">
                            <td>Fecha</td>
                            <td>Hora</td>
                            <td>Nivel</td>
                        </tr>
                        <tr className="">
                            <td>21 de mayo</td>
                            <td>14:52</td>
                            <td>2/3</td>
                        </tr>
                        <tr className="num1">
                            <td>21 de mayo</td>
                            <td>14:10</td>
                            <td>2/3</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Almacenamiento;

