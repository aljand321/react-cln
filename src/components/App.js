import React  from 'react';
import NavBar from './header/NavBar';
import Header from './header/Header';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';
import Consulta from '../pages/Consulta';
import Layout from './Layout';
import './App.css';
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
    get = async () => {
        console.log('esto es get')
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
        const path = await JSON.parse(localStorage.getItem("path"))
        if(path){
            const parsed = await JSON.stringify({
                route:path.route,
                selected:path.selected
            });
            localStorage.setItem('path',parsed);
        }else{
            const parsed = await JSON.stringify({
                route:'/',
                selected:'dash'
            });
            localStorage.setItem('path',parsed);
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
                        <Header/>
                        <NavBar/>
                        <Layout>
                            <Switch>
                                <Route path='/' exact={true} component={Home}></Route>
                                <Route path='/about' exact={true} component={About}></Route>
                                <Route path='/consulta' exact={true} component={Consulta}></Route>
                                <Route path='/alergias' exact={true} component={Alergias}></Route>
                            </Switch>
                        </Layout>               
                    </BrowserRouter> 
                </div>                
                                 
            );
        }
    }
}

export default App;