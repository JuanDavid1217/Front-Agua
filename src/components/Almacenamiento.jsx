import React, {useEffect, useState} from "react";
import Portada from "./Portada";
import './Almacenamiento.css'
import Menu from '../menu/menubar.js'
import { useLocation } from "react-router-dom";
import mqtt from 'mqtt'
import axios from "axios";
import Bars from "../graficas/BarsChart";
const apiurl = "https://fastapi-juandavid1217.cloud.okteto.net/"

function Almacenamiento() {
    const data=useLocation()
    const dataAlma=data.state['info']
    const user=data.state['user']
    const topico=data.state['topico']
    var [mensaje, setMensaje]=useState("")
    var [porcentaje, setPorcentaje]=useState(0)
    var [boyas, setBoyas] = useState("")
    var [bomba, setBomba]=useState("")
    var [entradas, setEntradas]=useState("")
    var [salidas, setSalidas]=useState("")
    var [totalE, setTotalE]=useState(0)
    var[totalS, setTotalS]=useState(0)
    var dataAnalisis="";
    var fechaini="";
    var fechafin="";
    //var [bomba, setBomba]=useState(false)
    
    const options = {
        clean: true, // retain session
    connectTimeout: 4000, // Timeout period
    // Authentication information
    clientId: topico+user,
    username: 'emqx_test',
    password: 'emqx_test',
    }
    
    const connectUrl = 'http://localhost:8083/mqtt'
    var client=null;
    console.log("Estoy en el almacenaiento del user_id: "+user)
    console.log("Estoy en el almacenaiento del grupo: "+dataAlma['id_grupo'])
    
    useEffect(() => {
        if (client==null) {
          // Si no está conectado, se establece la conexión MQTT
          conectarMQTT();
        }
    
        // Función de retorno para desconectar MQTT cuando el componente se desmonta
        return () => {
          desconectarMQTT();
          
        };
      }, []);

    const conectarMQTT=()=>{
        client=mqtt.connect(connectUrl, options)
        client.on('connect', function () {
            client.subscribe(topico+"/#", function (err) {
              if (err) {
                //client.publish('presence', 'Hello mqtt')
                console.log(err)
                //console.log(topico)
              }
            })
          })
          
        client.on('message', function (topic, message) {
            // message is Buffer
            var data=message.toString()
            data=JSON.parse(data)
            if (topic==topico+"/boyas"){
                setBoyas(data)
                setPorcentaje((data.nivel/dataAlma['capacidad_maxima'])*100)
            }else{
                if (topic==topico+"/bomba"){
                    setBomba(data)
                }
            }
            //console.log(data)
            //setMensaje(data)
            //setPorcentaje((data.nivel/dataAlma['capacidad_maxima'])*100)
            //client.end()
        })
    }

    const desconectarMQTT=()=>{
        if(client!=null){
            client.end()
            console.log("cliente desconectado")
            client=null;
        }
    }
    const onoffBomba=(e)=>{
        e.preventDefault()
        var onoff=" ";
        if(client==null){
            client = mqtt.connect(connectUrl, options)

            client.on('reconnect', (error) => {
            })

            
        }
        if(bomba.bomba==false){
            onoff="prender"
        }else{
            onoff="apagar"
        }
        client.publish(topico+"/action", `{"opcion":"${onoff}"}`)
    }

    const changeFechaini=(e)=>{
        e.preventDefault()
        fechaini=e.target.value.toString()
        console.log(fechaini)
    }
    const changeFechafin=(e)=>{
        e.preventDefault()
        fechafin=e.target.value.toString()
        console.log(fechafin)
    }
    const analizar=(e)=>{
        e.preventDefault()
        if(fechaini!=""&&fechafin!=""){
            var diaini=parseInt(fechaini.substring(8,10))
            var diafin=parseInt(fechafin.substring(8,10))

            if(diafin-diaini<=6){
                axios(
                    {
                        method: 'GET',
                        url: apiurl+"IoT/analisis/"+dataAlma['id_almacenamiento']+"/"+fechaini+"/"+fechafin
                    }
                ).then(res=>{
                    if (res.status==200){
                        dataAnalisis=res.data
                        separar(e, dataAnalisis)
                    }
                }).catch(errors=>{
                    window.alert(errors.response.data['detail'])
                })
            }else{
                window.alert("El rango máximo de días permitidos es 7")
            }
        }else{
            window.alert("Tienes campos fecha vacios.")
        }
    }
    const separar=(e, info)=>{
        e.preventDefault()
        setEntradas(info['entradas'])
        setSalidas(info['salidas'])
        setTotalE(info['TotalE'])
        setTotalS(info['TotalS'])
    }
    return (
        <div className="mainAlmacenamiento">
            <Portada
                urlPortada='https://images.unsplash.com/photo-1509041172795-d4869fe4a9eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1254&q=80'
            />
            <Menu nivel={3} tipo={user} id={dataAlma['id_almacenamiento']} grupo={dataAlma['id_grupo']} objeto={dataAlma}/>
            <div className="contenidoAlmacenamiento">
                <h1>Almacenamiento: <span>{dataAlma['ubicacion']}</span></h1>
                <div className="historialConsumo">
                    <h2>Historial de Consumo</h2>
                    <form action="">
                        <label htmlFor="fechaInicio">Fecha de Inicio</label>
                        <input type="date" id="fechaInicio" onChange={(e)=>{changeFechaini(e)}}/>
                        <label htmlFor="fechaFin">Ficha de Fin</label>
                        <input type="date" id="fechaFin" onChange={(e)=>{changeFechafin(e)}}/>
                    </form>
                    <button onClick={(e)=>{analizar(e)}}>Calcular</button>
                    {/*console.log(dataAnalisis)*/}
                </div>
                <div className="estadoActual">
                    <h2>Estado Actual</h2>
                    <div className="estadoActualDatos">
                        <p>Capacidad máxima</p>
                        <p>{dataAlma['capacidad_maxima']} Lts</p>
                        <div>Nivel actual</div>
                        <div>{porcentaje.toFixed(2)} %</div>
                        {user!=1?(
                            <div>
                                <button onClick={(e)=>{onoffBomba(e)}}>On/Off</button>
                            </div>   
                        ):(<></>)}
                    </div>
                    <div class="barra">
                        <div class="relleno" id="rellenoBarra" style={{"width":`${porcentaje}%`}}></div>
                    </div>

                    {/*<div className="nivelGrafico">
                        <div className="nivel" id="nivel1"></div>
                        <div className="nivel" id="nivel2"></div>
                        <div className="nivel" id="nivel3"></div>
                    </div>*/}
                    <div className="estado">
                        <div class="acomodo">
                        <p class="texto">Estado Bomba:</p>
                        <div class="foquitoBomba" id="foquito1" style={{"backgroundColor":`${bomba.bomba==true?("green"):("red")}`}}></div>
                        <div class="texto">{mensaje.bomba==true?("Encendida"):("Apagada")}</div>
                        </div>
                        <div class="acomodo">
                        <p class="texto">Boya 1:</p>
                        <div class="foquito1" id="foquito1" style={{"backgroundColor":`${boyas.boya1==true?("green"):("red")}`}}></div>
                        <div class="texto">{boyas.boya1==true?("Activa"):("Desactivada")}</div>
                        </div>
                        <div class="acomodo">
                        <p class="texto">Boya 2:</p>
                        <div class="foquito2" id="foquito1" style={{"backgroundColor":`${boyas.boya2==true?("green"):("red")}`}}></div>
                        <div class="texto">{boyas.boya2==true?("Activa"):("Desactivada")}</div>
                        </div>
                        <div class="acomodo">
                        <p class="texto">Boya 3:</p>
                        <div class="foquito3" id="foquito1" style={{"backgroundColor":`${boyas.boya3==true?("green"):("red")}`}}></div>
                        <div class="texto">{boyas.boya3==true?("Activa"):("Desactivada")}</div>
                        </div >
                        <div class="acomodo">
                        <p class="texto">Boya Principal:</p>
                        <div class="foquitoPrincipal" id="foquito1" style={{"backgroundColor":`${boyas.BP==true?("green"):("red")}`}}></div>
                        <div class="texto">{boyas.BP==true?("Activa"):("Desactivada")}</div>
                        </div>
                    </div>
                    
                </div>
                
                {/*<div className="tablaConsumo">
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
                </div>*/}
            </div>
            <div>
                    <Bars entradasBar={entradas} salidasBar={salidas} totalEBar={totalE} totalSBar={totalS}></Bars>
            </div>
        </div>
    );
}

export default Almacenamiento;

