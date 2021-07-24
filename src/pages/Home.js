import React from "react";
//import ContHeader from "../components/ContHeader";
//import ListasMedicos from "../components/Home/listasMedicos";
//import { Link } from 'react-router-dom';
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
     
      <h1>esto es l honnnnme</h1>
    );
  }
}
export default Home;
