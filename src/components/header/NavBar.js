import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

class NavBar extends React.Component{   
    _isMounted = false;
    state = {        
        path:{
            route:'',
            selected:''
        },
        user:{
            nombres:'',
            apellidos:'',
            
        },
        isPErmit:false
    } 
    componentDidMount(){
        this._isMounted = true;
        this.getPath();
        this.roles();
    }
    getPath = async () =>{
        if(this._isMounted){
            const path = await JSON.parse(localStorage.getItem("path"));
            const user = await JSON.parse(localStorage.getItem("tok"));
            if(path !== null){           
                const parsed = await JSON.stringify({
                    route:path.route,
                    selected:path.selected
                });
                this.setState({
                    path:{
                        route:path.route,
                        selected:path.selected
                    }
                });
                //this.props.history.push(path.route)           
                localStorage.setItem('path',parsed);
            }else{           
                this.setState({
                    path:{
                        route: user.user.role === 'medico' ? '/consulta' : '/',
                        selected:user.user.role === 'medico' ? 'med' : 'dash'
                    },
                })
                const parsed = await JSON.stringify({
                    route:user.user.role === 'medico' ? '/consulta' : '/',
                    selected:user.user.role === 'medico' ? 'med' : 'dash'
                });
                localStorage.setItem('path',parsed);
                
            }
            this.setState({            
                user:{
                    nombres:user.user.nombres,
                    apellidos:user.user.apellidos                
                }
            })
        }
    }
    roles = async () =>{
        if(this._isMounted){
            const user = await JSON.parse(localStorage.getItem("tok"));      
            if(user.user.role === 'admin' || user.user.role === 'usuario'){
                this.setState({
                    isPErmit:true
                })
            }else{
                this.setState({
                    isPErmit:false
                }) 
            }
        }       
    }
    selectRoute = async (ruta, selector) =>{
        const parsed = await JSON.stringify({
            route:ruta,
            selected:selector
        });
        localStorage.setItem('path',parsed);
        this.setState({
            path:{
                route:ruta,
                selected:selector
            }
        });       
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    
    render(){  
        return (
            <div>
                 
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    
                    <Link to='#' className="brand-link">
                        <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
                        <span className="brand-text font-weight-light">AdminLTE 3</span>
                    </Link>
                   
                    <div className="sidebar">
                        
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User" />
                            </div>
                            <div 
                            onClick={() => this.selectRoute('/contacto','contacto')}  
                            className="info">
                                <Link to='/contacto' className="d-block">{this.state.user.nombres} {this.state.user.apellidos}</Link>
                            </div>
                        </div>
                       
                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                           
                                {this.state.isPErmit === true &&
                                    <li className= "nav-item menu-open">

                                        {/* terner encuenta el active para el bacground */}
                                        
                                        <div className={this.state.path.selected === 'dash' ? "nav-link active" : "nav-link"}>
                                            <i className="nav-icon fas fa-tachometer-alt" />
                                            <p>
                                                Administrador
                                                <i className="right fas fa-angle-left" />
                                            </p>
                                        </div>
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
                                                    <p>Medico</p>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    
                                        
                                }

                                <li className="nav-item menu-open">
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
                                                <p>Paciente</p>
                                            </Link>
                                        </li>   
                                        <li className="nav-item">
                                            <Link 
                                                to="/alergias" 
                                                onClick={() => this.selectRoute('/alergias','med')} 
                                                className={this.state.path.route === '/alergias' ? "nav-link active":"nav-link"}
                                            >
                                                <i className="far fa-circle nav-icon" />
                                                <p>Ant. Patologicos</p>
                                            </Link>
                                        </li>                                                        
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>

                </aside>
            </div>
        );
    }
}

export default NavBar;