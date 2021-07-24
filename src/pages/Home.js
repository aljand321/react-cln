import React from "react";
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
//import ContHeader from "../components/ContHeader";
//import ListasMedicos from "../components/Home/listasMedicos";
//import { Link } from 'react-router-dom';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

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

function Home(props){
  const classes= usesStyle();
  return(
    <div className={classes.root}>
      <Grid container spacing={3}>

          {/* <Grid item xs={12}>
              <Navbar/>
          </Grid> */}

          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>

          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>

          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>

          </Grid>
      </Grid>

    </div>
  );
}
export default Home;
