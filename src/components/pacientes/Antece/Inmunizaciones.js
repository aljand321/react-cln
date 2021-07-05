import React, { useState,useEffect } from 'react'
import ModalLarge from '../../ModalLarge';
import FormInmunizaciones from '../Forms/FormInmunizaciones';
import RoutesInmunizacion from '../../../Routes/Inmunizacion';
function Inmunizaciones(props) {
    const [lis, setLis] = useState([]);
    const [load, setLoad] = useState(false);
    const [respErr,setRespErr] = useState(false)
    const [call, setCall] = useState(false);
    const callList = () => {
        setCall(!call)
    }
    useEffect(() => {
        const listVacunas = async () =>{
            setLoad(true)
            const resp = await RoutesInmunizacion.listVacunasPaciente(props.dataPaciente.id);
            if(resp.data.success === false){
                setLoad(false);
                setRespErr(true);
                setTimeout(() => setRespErr(false), 3000)
            }else{
                setLoad(false);
                setLis(resp.data.resp.vacunas)
            }
        }
        listVacunas();
    },[props,call])
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
                        Erro 500
                    </div>
                </div>
            }
            <div className="card">
                <div className="card-header">
                    <div className="d-flex">
                        <div className="mr-auto p-2">
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#inmu">
                                Registrar
                            </button>
                        </div>
                        {/* <div className="p-2">
                            
                        </div> */}
                    </div> 
                </div>
                {/* /.card-header */}
                <br/>
                <div className="col-12" id="accordion">
                    {lis.map((data,key)=>{
                        return(
                            <div key={key} className="card card-primary card-outline">                                
                                <a className="d-block w-100" data-toggle="collapse" href={`#collap${key}`}>                                
                                       
                                    <div className="card-header">
                                        <div className="d-flex">
                                            <div className="mr-auto p-2">
                                                <h4 className="card-title w-100">
                                                    {key+1} {data.nombre}  {data.vacunasPaciente.description}
                                                </h4>
                                               
                                            </div>
                                            <div className="p-2">
                                                <h5 className="card-title "> {data.vacunasPaciente.fecha.split('T')[0]}</h5>
                                            </div>
                                        </div>                                                
                                    </div>
   
                                </a>
                                <div id={`collap${key}`} className="collapse" data-parent="#accordion">
                                    <div className="card-body">
                                        {data.descripcion}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    
                    
                </div>

                {/* /.card-body */}
            </div>
            <ModalLarge title='Inmunizaciones' idModal='inmu'>
                <FormInmunizaciones dataPaciente={props.dataPaciente.id} callList={callList}/>
            </ModalLarge>
        </>
    )
}

export default Inmunizaciones
