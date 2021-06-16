import React  from 'react';
import NavBar from './header/NavBar';
import Header from './header/Header';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';
import Layout from './Layout';
import './App.css';
import Token from '../token';
//login form
import Login from '../pages/Login';   
class App extends React.Component{  
    state = {
        showNav: true,
        showBrowser: false
    }
    modalShow =() =>{
        this.setState({
            showNav: !this.state.showNav
        })
    };
    
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
                <BrowserRouter>                
                    <Header
                        clikIcon={this.modalShow}
                    />
                    <NavBar show={this.state.showNav}/>
                    <Layout show={this.state.showNav}>
                        <Switch>
                            <Route path='/' exact={true} component={Home}></Route>
                            <Route path='/about' exact={true} component={About}></Route>
                        </Switch>
                    </Layout>               
                </BrowserRouter>                  
            );
        }
    }
}

export default App;