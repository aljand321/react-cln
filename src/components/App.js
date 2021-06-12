import {React, useState} from 'react';
import NavBar from './header/NavBar';
import { GiHamburgerMenu } from 'react-icons/gi'; 
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';
import Layout from './Layout';
import './App.css';

function App(){
    const [showNav, setShowNav] = useState(true);
     function modalShow(){
        setShowNav(!showNav)
    }
    var esto = false;
    if(esto === true){
        return(
            <h1>formulario de login</h1>
        );
    }else{
        return (
            <BrowserRouter>                
                <header>
                    <GiHamburgerMenu onClick={modalShow}/>
                </header>
                <NavBar show={showNav}/>
                <Layout show={showNav}>
                    <Switch>
                        <Route path='/' exact={true} component={Home}></Route>
                        <Route path='/about' exact={true} component={About}></Route>
                    </Switch>
                </Layout>               
            </BrowserRouter>            
        );
    }
}

export default App;