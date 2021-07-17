import React, { useState,useEffect } from 'react'
import ModalLarge from '../../ModalLarge';
import FormExamenFisico from '../Forms/FormExamenFisico';
import RoutesExamenFisico from '../../../Routes/ExamenFisico'
function ExamenFisico(props) {
    const dataPaciente = props.dataPaciente
    const [list, setList] = useState([]);
    const [load, setLoad] = useState(false);
    const [respErr, setRespErr] = useState(false);
    const [callList, setCallList] = useState(false);
    const call = () => {
        setCallList(!callList)
    }
    useEffect(() => {
        const list = async () =>{
            setLoad(true);
            const resp = await RoutesExamenFisico.listExmFisPaciente(dataPaciente.id,props.identify);
            if(resp.data.success === false){
                setLoad(false);
                setRespErr(true);
                setTimeout(() =>setRespErr(false), 3000);
            }else{
                setLoad(false);
                setList(resp.data.resp)
            }
        }
        list();
    },[dataPaciente,callList,props.identify])
    return (
        <>  
            {load && 
                <div className="overlay"><i className="fas fa-3x fa-sync-alt fa-spin" /><div className="text-bold pt-2">Loading...</div></div>
            }
            
            {respErr &&
                <div className="overlay">
                    <div className="alert alert-danger alert-dismissible">
                        <button type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                        <h5><i className="icon fas fa-check"></i>Error!</h5>
                        <h3>No se puede mostrar los datos</h3>
                        erro 500
                    </div>
                </div>
            }
            <div className="card">
                <div className="card-header">
                    <div className="d-flex">
                        <div className="mr-auto p-2">
                            {props.identify === 'null' &&    
                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#ExaFs">
                                    Registrar
                                </button>
                            }    
                        </div>
                        {/* <div className="p-2">
                            
                        </div> */}
                    </div> 
                </div>
                {/* /.card-header */}
                <br/>
                <div className="card-body p-0">

                {list.length === 0 ?
                    <div className="card-body">
                        <div className="alert alert-danger alert-dismissible">
                            <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                            <h5><i className="icon fas fa-ban" /> Alerta!</h5>
                            No se registro examen fisico del paciente
                        </div>
                    </div>
                :   <div className="col-12" id="accordion">
                        {list.map((data,key) =>{
                            return(
                                <div key={key} className="card card-primary card-outline">
                                    <a className="d-block w-100" data-toggle="collapse" href={`#cll${key}`}>
                                        <div className="card-header">
                                            <div className="d-flex">
                                                <div className="mr-auto p-2">
                                                    <h4 className="card-title w-100">
                                                        {key+1} Examen Fisico
                                                    </h4>
                                                    
                                                </div>
                                                <div className="p-2">
                                                    <h5 className="card-title "> Registrado en: {data.createdAt.split('T')[0]}</h5>
                                                </div>
                                            </div> 
                                        </div>
                                    </a>
                                    <div id={`cll${key}`} className="collapse" data-parent="#accordion">
                                        {data.cabeza && 
                                            <div className="card-body">
                                                <strong>Cabeza:</strong>
                                                <p>{data.cabeza}</p>
                                                 
                                            </div>
                                        }
                                        {data.cuello && 
                                            <div className="card-body">
                                                <strong>Cuello:</strong>
                                                <p>{data.cuello}</p>
                                            </div>
                                        }
                                        {data.torax && 
                                            <div className="card-body">
                                               <strong>Torax:</strong>
                                                <p>{data.torax}</p>
                                            </div>
                                        }
                                        {data.pulmones && 
                                            <div className="card-body">
                                               <strong>Pulmones:</strong>
                                                <p>{data.pulmones}</p>
                                            </div>
                                        }
                                        {data.corazon && 
                                            <div className="card-body">
                                                <strong>Corazon:</strong>
                                                <p>{data.corazon}</p>
                                            </div>
                                        }
                                        {data.abdomen && 
                                            <div className="card-body">
                                               <strong>Abdomen:</strong>
                                                <p>{data.abdomen}</p>
                                            </div>
                                        }
                                        {data.ginecoUrinario && 
                                            <div className="card-body">
                                                <strong>Gineco Urinario:</strong>
                                                <p>{data.ginecoUrinario}</p>
                                            </div>
                                        }
                                        {data.locomotor && 
                                            <div className="card-body">
                                                <strong>Locomotor:</strong>
                                                <p>{data.locomotor}</p>
                                            </div>
                                        }
                                        {data.neurologico && 
                                            <div className="card-body">
                                                <strong>Neurologico:</strong>
                                                <p>{data.neurologico}</p>
                                            </div>
                                        }
                                        {data.pielyFaneras && 
                                            <div className="card-body">
                                                <strong>Piel y faneras:</strong>
                                                <p>{data.pielyFaneras}</p>
                                            </div>
                                        }                                        
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                }

                </div>
                {/* /.card-body */}
            </div>
            <ModalLarge title='Examen Fisico' idModal='ExaFs'>
                <div className="overlay-wrapper"> 
                    <FormExamenFisico dataPaciente={props.dataPaciente.id} call={call}/>
                </div>
            </ModalLarge>
            
        </>
    )
}

export default ExamenFisico
