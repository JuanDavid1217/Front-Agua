import { Bar } from 'react-chartjs-2';
import "./graficas.css"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

function Bars(props){
    const {entradasBar, salidasBar, totalEBar, totalSBar}=props
    
    var FHE=Array.from(entradasBar, e=>e['Fecha_Hora'].substring(0,10));
    var E=Array.from(entradasBar, e=>e['cantidad_entrada'])


    var FHS=Array.from(salidasBar, s=>s['Fecha_Hora'].substring(0,10))
    var S=Array.from(salidasBar, s=>s['cantidad_salida'])
    
    
    
    var ED=[]
    var FHED=[]
    var repeat=1;
    for (var i=0; i<FHE.length; i++){
        console.log(i)
        if(i==0){
            FHED.push(FHE[0])
            ED.push(E[0])
        }else{
            if(FHE[i]!=FHE[i-1]){
                FHED.push(FHE[i])
                ED.push(E[i])
                console.log("Son distintos")
            }else{
                ED[i-repeat]+=E[i]
                repeat=repeat+1;
                console.log("repeat:"+repeat)
                console.log("Son iguales")
            }
        }
    }

    var SD=[]
    var FHSD=[]
    var repeat2=1;
    for (var i=0; i<FHE.length; i++){
        console.log(i)
        if(i==0){
            FHSD.push(FHS[0])
            SD.push(S[0])
        }else{
            if(FHS[i]!=FHS[i-1]){
                FHSD.push(FHS[i])
                SD.push(S[i])
                console.log("Son distintos")
            }else{
                SD[i-repeat2]+=S[i]
                repeat2=repeat2+1;
                console.log("repeat:"+repeat2)
                console.log("Son iguales")
            }
        }
    }

    var misoptions = {
        responsive : true,
        animation : true,
        plugins : {
            legend : {
                display : true
            }
        },
        scales : {
            y : {
                min : 0,
                max : 100
            },
            x: {
                ticks: { color: 'rgba(111, 113, 113)'}
            }
        }
    };

    var CE = {
        labels: FHED,
        datasets: [
            {
                label: 'Cantidad Entrada',
                data: ED,
                backgroundColor: 'rgba(107, 167, 181)'
            },
        ]
    };

    var CS ={
        labels: FHSD,
        datasets:[
            {
                label: 'Cantidad Salida',
                data: SD,
                backgroundColor: 'rgba(107, 167, 181)'
            }
        ]
    }

    return(
        <body class="principal">
            <div class="contenedor">
                <h2>Gráficas</h2>
                <div class="graficas">
                    <div>
                        <Bar data={CE} options={misoptions} />
                    </div>
                    <div>
                        <Bar data={CS} opions={misoptions} />
                    </div>
                </div>
                <br></br>
                <text><span>Entrada:</span> {totalEBar} Lt</text>
                <text><span>Salida:</span> {totalSBar} Lt</text>
                <text><span>Diferencia:</span> {totalEBar-totalSBar} Lt</text>
            </div>
        </body>
    ) 
}

export default Bars;