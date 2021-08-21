import React, { useState,useEffect } from 'react'
import ModalLarge from '../../ModalLarge';
import FormAntNoPatl from '../Forms/FormAntNoPatl';
import RoutesAntNoPtl from '../../../Routes/AntNoPtl';
function AntNoPatologicos(props) {
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
            const resp = await RoutesAntNoPtl.listAntPtl(dataPaciente.id,props.identify);
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
                            {props.identify === 'null' &&
                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#noPatologicos1">
                                    Registrar
                                </button>
                            }
                        </div>
                        {/* <div className="p-2">
                            
                        </div> */}
                    </div> 
                </div>
                {/* /.card-header */}
                <div className="card-body p-0">

                    {list.length === 0 ?
                        <div className="card-body">
                            <div className="alert alert-danger alert-dismissible">
                                <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                <h5><i className="icon fas fa-ban" /> Alerta!</h5>
                                No hay registros de antecedentes no patologicos 
                            </div>
                        </div>
                    :   <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th style={{width: 10}}>#</th>
                                    <th>Instruccion</th>
                                    <th>Fuma</th>
                                    <th>Cigarrillos por dia</th>
                                    <th>Desde hace...</th>
                                    <th>Bebe</th>
                                    <th>A la semana</th>
                                    <th>Desde hace...</th>
                                    <th>Alimentacion</th>
                                    <th>Fecha de Registro</th>
                                    {/* <th style={{width: 40}}>Label</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                
                                {list.map((data,key)=>{
                                    return(
                                        <tr key={key}>
                                            <td>{key+1}</td>
                                            <td>{data.instruccion}</td>
                                            <td>{data.fuma.fuma}</td>
                                            <td>{data.fuma.diaF}</td>
                                            <td>{data.fuma.desdeF}</td>
                                            <td>{data.bebe.bebe}</td>
                                            <td>{data.bebe.diaB}</td>
                                            <td>{data.bebe.desdeB}</td>
                                            <td>{data.alimentacion}</td>        
                                            <td>{data.createdAt.split('T')[0]}</td>                            
                                        </tr>
                                    );
                                })}
                            
                                
                            </tbody>
                        </table>
                    }
                </div>
                {/* /.card-body */}
            </div>
            <ModalLarge title='Antecedente no patologico' idModal='noPatologicos1'>
                <FormAntNoPatl dataPaciente={dataPaciente.id} call={call}/>
            </ModalLarge>
        </div>
    )
}

export default AntNoPatologicos;
