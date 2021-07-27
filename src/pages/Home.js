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

class Home extends React.Component {
  _isMounted = false;
  componentDidMount(){
    console.log('home  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
    this._isMounted = true;
    this.location();
  }
  location = async () => {
    if(this._isMounted){
      const path = await JSON.parse(localStorage.getItem("path"));
      const user = await JSON.parse(localStorage.getItem("tok"));
      if(path === null){
          this.props.history.push(user.user.role === 'medico' ? '/consulta' : '/') 
      }
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
    this.setState = (state,callback)=>{
      return;
   };
 }

  render() {
    return (
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
}

export default Home;
