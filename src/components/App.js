import React  from 'react';
import NavBar from './header/NavBar';
import Header from './header/Header';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';
import Consulta from '../pages/Consulta';
import Layout from './Layout';
import UserContac from '../pages/UserContac';

import Token from '../token';
import Alergias from '../pages/Alergias';
//login form
import Login from '../pages/Login';   
class App extends React.Component{  
    state = {        
        showBrowser: false
    }   
    componentDidMount(){
        this.get();
    }
    //esta funcion de llamara desde el componente header
    callApp = () =>{
        localStorage.clear();
        this.setState({
            showBrowser: false
        })
    }    
    get = async () => {
       
        const verifyToken = await Token.validateToken();  
    
        if(verifyToken.success === true){
            this.setState({
                showBrowser: true
            })
        }else{
            this.setState({
                showBrowser: false
            })
        }        
    };  
    callbackFunction = () =>{
        this.setState({
            showBrowser: true
        })
    };
    render(){
        if(this.state.showBrowser === false){
            return(           
                <Login  parentCallback = {this.callbackFunction}/>                   
            );
        }else{
            return (

                <div className='wrapper'>
                    {/* <div className="preloader flex-column justify-content-center align-items-center">
                        <img className="animation__shake" src="dist/img/AdminLTELogo.png" alt="AdminLTELogo" height={60} width={60} />
                    </div> */}
                    <BrowserRouter>                
                        <Header callApp={this.callApp}/>
                        <NavBar/>
                        <Layout>
                            <Switch>
                                <Route exact path='/' component={Home}></Route>
                                <Route exact path='/about' component={About}></Route>
                                <Route exact path='/consulta' component={Consulta}></Route>
                                <Route exact path='/alergias' component={Alergias}></Route>
                                <Route exact path='/contacto' component={UserContac}></Route>
                            </Switch>
                        </Layout>               
                    </BrowserRouter> 
                </div>                
                                 
            );
        }
    }
}

export default App;