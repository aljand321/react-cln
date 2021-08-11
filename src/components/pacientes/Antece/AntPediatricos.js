import React,{ useState,useEffect } from 'react';
import RoutesAntPediatricos from '../../../Routes/AntPediatricos';
import ModalLarge from '../../ModalLarge';
import FormAntPediatricos from '../Forms/AntPediatricos';
function AntPediatricos (props){
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
            const resp = await RoutesAntPediatricos.listAntPediatricos(dataPaciente.id,props.identify);
            if(resp.data.success === false){
                setLoad(false);
                setRespErr(true);
                //setTimeout(() =>setRespErr(false), 3000);
            }else{
                setLoad(false);
                setList(resp.data.resp)
            }
        }
        list();
    },[dataPaciente,callList,props.identify])
    return (
        <>
            <div className="overlay-wrapper">
                {load && 
                    <div className="overlay"><i className="fas fa-3x fa-sync-alt fa-spin" /><div className="text-bold pt-2">Loading...</div></div>
                }
                
                {respErr &&
                    <div className="overlay">
                        <div className="alert alert-danger alert-dismissible">
                            <button onClick={() => setRespErr(false)} type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
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
                                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#AntPdt">
                                        Registrar
                                    </button>
                                }

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
                                    No se registraron antecedentes pediatricos
                                </div>
                            </div>
                        :   <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{width: 10}}>#</th>
                                        <th>Peso RN:</th>
                                        <th>Tipo de Parto</th>
                                        <th>Obs. Perinatales</th>
                                        <th>Fecha de registro</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {list.map((data,key)=>{
                                        return(
                                            <tr key={key}>
                                                <td>{key+1}</td>
                                                <td>{data.pesoRn}</td>
                                                <td>{data.tipodeParto}</td>
                                                <td>{data.obsPerinatales}</td>                                                
                                                <td>{data.createdAt.split("T")[0]}</td>                                  
                                            </tr>
                                        );
                                    })}
                                    
                                </tbody>
                            </table>
                        }    
                    </div>
                
                </div>    
            </div>
            <ModalLarge title='Antecedentes Pediatricos' idModal='AntPdt'>
                <div className="overlay-wrapper"> 
                    <FormAntPediatricos dataPaciente={dataPaciente.id} call={call}/>
                </div>
            </ModalLarge>
        </>
    );
}

export default AntPediatricos;