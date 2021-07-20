import React from 'react';
import Datas from '../components/pacientes/alergias';
class Alergias extends React.Component{    
    _isMounted = false;
    state={
        datas:{
            msg:"holas"
        }
    }
    componentDidMount(){
        console.log('alergias <<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
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