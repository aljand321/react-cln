//import { Link } from 'react-router-dom';
import ListaPacientesDocotor from '../pacientes/Medico/ListaPacientes.js'
import ConsultaMedico from '../pacientes/Medico/consultaMedico.js';
function MedicoDatas (props){
    const medico = props.medico
    if (Object.keys(medico).length === 0){    
        return (
            <div>
                <h1>Cargando.......</h1>
            </div>
        );
    }
    let hoy = new Date();
    let fechaNacimiento = new Date(medico.edad)
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    return(
        <>
            <div className="row">
                <div className="col-md-3">
                    <div className="card card-primary card-outline">
                        <div className="card-body box-profile">
                            <div className="text-center">
                                <img className="profile-user-img img-fluid img-circle" src="../../dist/img/user4-128x128.jpg" alt="User profile" />
                            </div>
                            <h3 className="profile-username text-center">{medico.nombres}</h3>
                            <h4 className="profile-username text-center">{medico.apellidos}</h4>
                            <p className="text-muted text-center">Especilaidad {medico.especialidad}</p>
                            <ul className="list-group list-group-unbordered mb-3">

                                <li className="list-group-item">
                                    <b>Email</b> <div className="float-right">{medico.email}</div>
                                </li>
                                <li className="list-group-item">
                                    <b>Direccion</b> <div className="float-right">{medico.direccion}</div>
                                </li>
                                <li className="list-group-item">
                                    <b>Fecha nacimiento</b> <div className="float-right">{edad}</div>
                                </li>
                                <li className="list-group-item">
                                    <b>C.I.</b> <div className="float-right">{medico.ci}</div>
                                </li>
                                
                                <li className="list-group-item">
                                    <b>Telefono</b> <div className="float-right">{medico.telefono}</div>
                                </li>
                                
                                <li className="list-group-item">
                                    <b>Rol</b> <div className="float-right">{medico.role}</div>
                                </li>
                                
                            </ul>                            
                        </div>
                        {/* /.card-body */}
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="card">
                        <div className="card-header p-2">
                            <ul className="nav nav-pills">
                                <li className="nav-item"><a className="nav-link active" href="#activity" data-toggle="tab">Pacientes Registrados</a></li>    
                                <li className="nav-item"><a className="nav-link " href="#consulta" data-toggle="tab">Pacientes Consultados</a></li>                             
                            </ul>
                            
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <div className="tab-content">
                                <div className="active tab-pane" id="activity">    
                                    <div className="overlay-wrapper">                                    
                                        <ListaPacientesDocotor id_medico={medico.id}/> 
                                    </div>                          
                                </div> 
                                <div className=" tab-pane" id="consulta">    
                                    <div className="overlay-wrapper">                                    
                                        <ConsultaMedico id_medico={medico.id}/>
                                    </div>                          
                                </div>                               
                            </div>
                            {/* /.tab-content */}
                        </div>
                        {/* /.card-body */}

                    </div>
                </div>
            </div>
        </>
    );
    
}

export default MedicoDatas;