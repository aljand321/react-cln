import React from 'react';
import Datas from '../components/pacientes/alergias';
import {CardHeader, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
// import '../components/Dashboard/Dashboard.css'
import ListAltIcon from '@material-ui/icons/ListAlt';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import CardsHeader from '../components/Dashboard/CardsHeader';

const usesStyle = makeStyles(()=>({
    root:{
        flexGrow: 1
    },
    iconos:{
        color: 'white'
    },
    container:{
        paddingTop:'40px',
        alignItems: 'center'
    },
    containerGrafica:{
        marginTop: '40px'
    },
    containerTabla:{
        marginTop: '40px'
    }
}));

function Alergias(props){
    const classes = usesStyle();
    return(
        <div className={classes.root}>
            <Grid container spacing={3}>

                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <CardsHeader icono={<ListAltIcon className={classes.iconos}/>} titulo="LISTA" texto="mm" color="rgba(248,80,50,1)" font="white"/>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <CardsHeader icono={<AssignmentIcon className={classes.iconos}/>} titulo="LISTA" texto="mm" color="rgba(248,80,50,1)" font="white"/>
                </Grid>
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                <CardsHeader icono={<AssignmentIndIcon className={classes.iconos}/>} titulo="LISTA" texto="mm" color="rgba(248,80,50,1)" font="white"/>
                </Grid>

                
            </Grid>
        </div>
    );
}
export default Alergias;