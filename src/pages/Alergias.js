import React from 'react';
import Datas from '../components/pacientes/alergias';
class Alergias extends React.Component{
    state={
        datas:{
            msg:"holas"
        }
    }
    render(){
        return(
            <React.Fragment>
                <Datas datas={this.state.datas}>
                    <h3>hola esto es el padre</h3>
                </Datas>
            </React.Fragment>        
            
        );
    }
}
export default Alergias;