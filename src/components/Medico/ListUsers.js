import React, { useState } from 'react'

class List extends React.Component{
    render(){
        return(
            <React.Fragment>                
                <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column">
                    <div className="card bg-light d-flex flex-fill">
                        <div className="card-header text-muted border-bottom-0">
                            Medico
                        </div>
                        <div className="card-body pt-0">
                            <div className="row">
                                <div className="col-7">
                                    <h2 className="lead"><b>{this.props.list.nombres} {this.props.list.apellidos}</b></h2>
                                    <p className="text-muted text-sm"><b>Especialidad: </b> {this.props.list.especialidad} </p>
                                    <ul className="ml-4 mb-0 fa-ul text-muted">
                                        <li className="small"><span className="fa-li"><i className="fas fa-lg fa-building" /></span> Direccion: {this.props.list.direccion}</li>
                                        <br></br>
                                        <li className="small"><span className="fa-li"><i className="fas fa-lg fa-phone" /></span> Telefono: {this.props.list.telefono}</li>
                                        <br></br>
                                        <li className="small"><span className="fa-li"><i className="fas fa-lg fa-user" /></span> Telefono: {this.props.list.ci}</li>
                                    </ul>
                                </div>
                                <div className="col-5 text-center">
                                    <img src="../../dist/img/user1-128x128.jpg" alt="user-avatar" className="img-circle img-fluid" />
                                </div>
                            </div>
                        </div>
                        <div className="card-footer" >                                        
                            <div className="text-right">                                            
                                <div className="btn btn-sm btn-primary">
                                    <i className="fas fa-user" /> View Profile
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                      
            </React.Fragment>
        );
    }
}

function ListUsers(props) {
    const users =  props.listUsers;
    const {buscar,setBuscar,filter} = Buscar(users);
    /* function data(id_medico){
        props.idMedico(id_medico);
    } */
    if(!users){        
        return (
            <div>
                <h3>no hay nada que mostrar</h3>
            </div>
        );
    }else{    
        return(  
            <>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-8 offset-md-2">
                                
                                <div className="input-group">
                                    <input 
                                        type="search" 
                                        className="form-control form-control-lg" 
                                        placeholder="Buscar medico" 
                                        onChange={e => {
                                            setBuscar(e.target.value);
                                        }}
                                        value={buscar}
                                    />                                    
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </section>  
                <br></br>   
                {filter[0].length === 0 && 
                    <div className="alert alert-info alert-dismissible">
                        <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                        <h5><i className="icon fas fa-info" /> No hay resultados!</h5>
                        No existe ese medico
                    </div>
                }    
                <div className="row">
                    {filter[0].map((datas,key) =>{
                        return (                           
                            <List  key={key} list={datas} />                             
                        );
                    })}              
                </div>  
            </>                         
        );
    }
}

const Buscar = (users) =>{
    const [buscar, setBuscar] = useState('');
    const filter = []
    var filtrador = users.filter((item) => {       
        return  item.nombres.toLowerCase().includes(buscar.toLowerCase()) ||
                item.apellidos.toLowerCase().includes(buscar.toLowerCase()) ||
                item.especialidad.toLowerCase().includes(buscar.toLowerCase()) ||
                item.ci.includes(buscar) || 
                item.telefono.toString().includes(buscar)
    });    
    filter.push(filtrador);
    
    return {buscar,setBuscar,filter};
}

export default ListUsers
