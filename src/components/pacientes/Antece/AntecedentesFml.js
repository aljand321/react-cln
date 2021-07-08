import React, { useState,useEffect } from 'react'
import ModalLarge from '../../ModalLarge';
import FormAntFml from '../Forms/FormAntFml';
import RoutesAntFamiliares from '../../../Routes/AntFamilares';

function AntecedentesFml(props) {
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
            const resp = await RoutesAntFamiliares.listAntfml(dataPaciente.id);
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
    },[dataPaciente,callList])
    return (
       
        <div className="overlay-wrapper">            
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
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#AntFml">
                                Registrar
                            </button>
                        </div>
                        {/* <div className="p-2">
                            
                        </div> */}
                    </div> 
                </div>
               
                <div className="card-body p-0">
                    {list.length === 0 ?
                        <div className="card-body">
                            <div className="alert alert-danger alert-dismissible">
                                <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                <h5><i className="icon fas fa-ban" /> Alerta!</h5>
                                No se registro antecedentes familiares del paciente
                            </div>
                        </div>
                    :   <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th style={{width: 10}}>#</th>
                                    <th>Padre</th>
                                    <th>Est. Salud</th>
                                    <th>Fallecio causa</th>
                                    <th>Madre</th>
                                    <th>Est. Salud</th>
                                    <th>Fallecio causa</th>
                                    <th>Hnos N°</th>
                                    <th>Viven</th>
                                    <th>Fallecidos</th>
                                    <th>Causa</th>
                                    <th>Estado de salud</th>
                                    <th>Fecha de registro</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((data,key)=>{
                                    return(
                                        <tr key={key}>
                                            <td>{key+1}</td>
                                            <td>{data.padre.viveP}</td>
                                            <td>{data.padre.estSaludP}</td>
                                            <td>{data.padre.causaP}</td>
                                            <td>{data.madre.viveM}</td>
                                            <td>{data.madre.estSaludM}</td>
                                            <td>{data.madre.causaM}</td>                                        
                                            <td>{data.hnos.numeros}</td>
                                            <td>{data.hnos.viven}</td>
                                            <td>{data.hnos.fallecidos}</td>
                                            <td>{data.hnos.causa}</td>     
                                            <td>{data.hnos.estadoSalud}</td>   
                                            <td>{data.createdAt.split("T")[0]}</td>                                  
                                        </tr>
                                    );
                                })}
                                
                            </tbody>
                        </table>
                    }    
                </div>
               
            </div>
            <ModalLarge title='Antecedentes Familiares' idModal='AntFml'>
                <div className="overlay-wrapper"> 
                    <FormAntFml dataPaciente={dataPaciente.id} call={call}/>
                </div>
            </ModalLarge>
        </div>
    )
}

export default AntecedentesFml
