import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

class NavBar extends React.Component{   
    state = {        
        path:{
            route:'/',
            selected:'dash'
        }
    } 
    componentDidMount(){
        this.getPath();
    }
    getPath = async () =>{
        const path = await JSON.parse(localStorage.getItem("path"));
        this.setState({
            path:{
                route:path.route,
                selected:path.selected
            }
        })
    }
    selectRoute = (ruta, selector) =>{
        this.setState({
            path:{
                route:ruta,
                selected:selector
            }
        });       
    }
    
    render(){  
        return (
            <React.Fragment>
                {/* <!-- Main Sidebar Container --> */}            
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    {/*  <!-- Brand Logo --> */}
                    <Link to='#' className="brand-link">
                        <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
                        <span className="brand-text font-weight-light">AdminLTE 3</span>
                    </Link>
                    {/* <!-- Sidebar --> */}
                    <div className="sidebar">
                        {/* <!-- Sidebar user panel (optional) --> */}
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User" />
                            </div>
                            <div className="info">
                                <Link to='#' className="d-block">Alexander Pierce</Link>
                            </div>
                        </div>
                        {/* <!-- Sidebar Menu --> */}
                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            {/* Add icons to the links using the .nav-icon class
                                with font-awesome or any other icon font library */}
                                <li className="nav-item menu-open">

                                    {/* terner encuenta el active para el bacground */}
                                    
                                    <Link to="#" className={this.state.path.selected === 'dash' ? "nav-link active" : "nav-link"}>
                                        <i className="nav-icon fas fa-tachometer-alt" />
                                        <p>
                                            Administrador
                                            <i className="right fas fa-angle-left" />
                                        </p>
                                    </Link>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            {/* para activar y desactivar el bacground es el active */}
                                            <Link 
                                                to="/" 
                                                onClick={() => this.selectRoute('/','dash')}  
                                                className={this.state.path.route === '/' ? "nav-link active":"nav-link"}
                                            >
                                                <i className="far fa-circle nav-icon" />
                                                <p>Dashboard v1</p>
                                            </Link>
                                            <Link 
                                                to="/about" 
                                                onClick={() => this.selectRoute('/about','dash')} 
                                                className={this.state.path.route === '/about' ? "nav-link active":"nav-link"}
                                            >
                                                <i className="far fa-circle nav-icon" />
                                                <p>Dashboard v2</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>

                                <li className="nav-item">
                                    <Link to="#" className={this.state.path.selected === 'med' ? "nav-link active" : "nav-link"}>
                                        <i className="nav-icon fas fa-copy" />
                                        <p>
                                            Medico
                                            <i className="fas fa-angle-left right" />
                                            <span className="badge badge-info right"></span>
                                        </p>
                                    </Link>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link 
                                                to="/consulta" 
                                                onClick={() => this.selectRoute('/consulta','med')} 
                                                className={this.state.path.route === '/consulta' ? "nav-link active":"nav-link"}
                                            >
                                                <i className="far fa-circle nav-icon" />
                                                <p>Cunsulta</p>
                                            </Link>
                                        </li>                                                          
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>

                </aside>
            </React.Fragment>
        );
    }
}

export default NavBar;