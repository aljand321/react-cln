import React from 'react'
import { BorderColor } from '@material-ui/icons';
import {Line} from 'react-chartjs-2';
import './css/Graphics.css';

 function Graphics(props) {
    const data={
        labels:["Marzo", "Abril", "Mayo", "Junio", "Julio","Agosto", "Septiembre"],
        datasets:[
            {
            label:"Horas de Visualizacion por Mes",
            fill: false,
            backgroundColor: 'rgba(73,155,234,1)',
            BorderColor: 'rgba(73,155,234,1)',
            pointBorderColor: 'rgba(73,155,234,1)',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(73,155,234,1)',
            pointHoverBorderColor: 'rgba(73,155,234,1)',
            pointHitRadius: 10,
            data:[.17, 19, 156, 357, 565, 1149]
        }
        ]
    }
    return (
        <div>
            <Line data = {data}/>
            
        </div>
    );
}

export default Graphics;