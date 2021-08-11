import React from 'react'

function VerConsultaRetorno(props) {
    const dataConsulta = props.consulta;
    if(Object.keys(dataConsulta).length !== 0){
        const data = dataConsulta.createdAt.split('T')[1]
        const hora = data.split('.')[0]
        
        return (
            <>
                {props.loading && 
                    <div className="overlay"><i className="fas fa-3x fa-sync-alt fa-spin" /><div className="text-bold pt-2">Loading...</div></div>
                }
                {props.erro &&
                    <div className="overlay">
                        <div className="alert alert-danger alert-dismissible">
                            <button type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                            <h5><i className="icon fas fa-check"></i>Error!</h5>
                            <h3>No se puede mostrar los datos</h3>
                            erro 400
                        </div>
                    </div>                
                }
                <form>
                    <div className="card-body">
                        
                        <div className="d-flex">
                            <div className="mr-auto p-2">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Paciente</label>
                                    <p>Nombre(s): {props.dataPaciente.nombres}</p>
                                    <p>Apellido(s) {props.dataPaciente.apellidos}</p>
                                </div>
                            </div>
                            <div className="p-2">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Fecha de primera Consulta</label>
                                    <p>Fecha: {dataConsulta.createdAt.split('T')[0]}</p>
                                    <p>Hora:{hora}</p>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Subjetivo:</label>
                            <p>{dataConsulta.subjetivo}</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Objetivo:</label>
                            <p> {dataConsulta.objetivo} </p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Diagnostico:</label>
                            <p> {dataConsulta.diagnostico} </p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Tratamiento</label>
                            <p> {dataConsulta.tratamiento} </p>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail2">T.A. mmHg / Glasgow</label>                                
                                    <p>{dataConsulta.signosVitales.ta}</p>
                                </div>                            
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">F.R. C/min mg% Peso</label>
                                    <p>{dataConsulta.signosVitales.fr}</p>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Aux. Rec. cm  IMC</label>          
                                    <div className="form-group clearfix">
                                        <div className="icheck-primary d-inline">
                                            <input
                                            type="radio" 
                                            
                                            readOnly
                                            value=''
                                            name='check'                                           
                                            checked={dataConsulta.signosVitales.temp.r1 ===  'aux'}
                                             />
                                            <label >
                                                Aux.
                                            </label>
                                        </div>
                                        <div className="icheck-primary d-inline">
                                            <input                                         
                                            type="radio" 
                                            
                                            readOnly
                                            value=''
                                            name='check'                                         
                                            checked={dataConsulta.signosVitales.temp.r1 ===  'rec'}
                                             />
                                            <label>
                                                Rec.
                                            </label>
                                        </div>                                    
                                    </div>
                                      <label>IMC</label>                  
                                    <p>{dataConsulta.signosVitales.temp.imc}</p>
                                    
                                </div>

                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">F.C. lat/min / 15 Glicemia</label>
                                    <p>{dataConsulta.signosVitales.fc}</p>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">SaO2 % Kg Talla</label>
                                    <p>{dataConsulta.signosVitales.sao}</p>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Temp. °C</label>
                                    <p>{dataConsulta.signosVitales.tmp}</p>
                                </div>
                                
                            </div>
                        </div>                    
                    </div>
                    {/* /.card-body */}
                    <div className="d-flex">
                        <div className="mr-auto p-2">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div> 
                </form>
            </>
        );
    }else{
        return(
            <>
                <div className="overlay">
                    <div className="alert alert-danger alert-dismissible">
                        <button type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                        <h5><i className="icon fas fa-check"></i>Error!</h5>
                        <h3>No selecciono Consulta</h3>                        
                    </div>
                </div>
            </>
        );
    }
}

export default VerConsultaRetorno;
