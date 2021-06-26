import DataConsulta from "./Consultas";
import Patologicos from "./Antece/AntPatologicos";
function  DataPaciente(props){
    
    if(props.dataPaciente !== undefined){
        const dataPaciente = props.dataPaciente.data;
        let hoy = new Date();
        let fechaNacimiento = new Date(dataPaciente.edad)
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        return(
            <>
                <section className="content">
                   
                    <div className="row">

                        <div className="col-md-2">
                        {/* Profile Image */}
                            <div className="card card-primary card-outline">
                                <div className="card-body box-profile">                            
                                    <h3 className="profile-username text-center">{dataPaciente.nombres}</h3>
                                    <p className="text-muted text-center">{dataPaciente.apellidos}</p>
                                    <ul className="list-group list-group-unbordered mb-3">
                                        <li className="list-group-item">
                                            <b>Direccion</b> <div className="float-right">{dataPaciente.direccion}</div>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Edad</b> <div className="float-right">{edad}</div>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Ocupacion</b> <div className="float-right">{dataPaciente.ocupacion}</div>
                                        </li>
                                    </ul>
                                </div>
                                {/* /.card-body */}
                            </div>
                        </div>                        
                        {/* /.col */}
                        <div className="col-md-10">
                            <div className="card">
                                <div className="card-header p-2">
                                    <ul className="nav nav-pills">
                                        <li className="nav-item"><a className="nav-link active" href="#consultas" data-toggle="tab">Consultas</a></li>
                                        <li className="nav-item"><a className="nav-link" href="#patologicos" data-toggle="tab">Antecedentes Patologicos</a></li>
                                        <li className="nav-item"><a className="nav-link" href="#noPatologicos" data-toggle="tab">No patologicos</a></li>
                                        <li className="nav-item"><a className="nav-link" href="#inmunizaciones" data-toggle="tab">Inmunizaciones</a></li>
                                        <li className="nav-item"><a className="nav-link" href="#antFamiliares" data-toggle="tab">Ant. Familiares</a></li>
                                        <li className="nav-item"><a className="nav-link" href="#ginecoObstetricos" data-toggle="tab">Gineco Obstetricos</a></li>
                                        <li className="nav-item"><a className="nav-link" href="#examenFisico" data-toggle="tab">Examen Fisico</a></li>
                                    </ul>
                                </div>{/* /.card-header */}
                                <div className="card-body">
                                    <div className="tab-content">
                                        <div className="active tab-pane" id="consultas">
                                            <div className="overlay-wrapper">
                                               {/*  <div className="overlay"><i className="fas fa-3x fa-sync-alt fa-spin" /><div className="text-bold pt-2">Loading...</div></div> */}
                                                <DataConsulta/>
                                            </div>
                                        </div>
                                        {/* /.tab-pane */}
                                        <div className="tab-pane" id="patologicos">
                                            <div className="overlay-wrapper">
                                                <Patologicos dataPaciente={dataPaciente}/>
                                            </div>
                                        </div>
                                        {/* /.tab-pane */}
                                        <div className="tab-pane" id="noPatologicos">
                                            <h1>antecedentes no patologicos</h1>
                                        </div>
                                        <div className="tab-pane" id="inmunizaciones">
                                            <h1>inmunizaciones</h1>
                                        </div>
                                        <div className="tab-pane" id="antFamiliares">
                                            <h1>Antecedentes familiares</h1>
                                        </div>
                                        <div className="tab-pane" id="ginecoObstetricos">
                                            <h1>Antecedentes gineco obstetricos</h1>
                                        </div>
                                        <div className="tab-pane" id="examenFisico">
                                            <h1>examen fisico</h1>
                                        </div>
                                        {/* /.tab-pane */}
                                    </div>
                                    {/* /.tab-content */}
                                </div>{/* /.card-body */}
                            </div>
                            {/* /.card */}
                        </div>
                        {/* /.col */}

                        
                    </div>
                   
                </section>


            </>
        );
    }else{
        return (
            <>
                <div>nada que mostrar</div>
            </>
        );
    }
    
}
export default DataPaciente;