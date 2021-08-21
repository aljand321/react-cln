import React, {useState,useEffect} from "react";
import ModalLarge from "../ModalLarge";
import FormConsutla from "./Forms/FormConsulta";
import RoutesConsultas from "../../Routes/Consultas";
import VerConsulta from "./VerConsulta";
import FormRetornoConsulta from "./Forms/FormRetornoConsulta";
import VerConsultaRetorno from  "./VerConsultaRetorno";
function DataConsulta(props) {
    const paciente = props.dataPaciente
    const [list, setList] = useState([])
    const [load, setLoad] = useState(false);
    const [erro, setErro] = useState(false)
    const [callList, setCallList] = useState(false);
    

    const [consulta, setConsulta] = useState({});
    const [loadConsulta, setLoadConsulta] = useState(false);
    const [errConsulta, setErrConsulta] = useState(false);
    const [listaR, setListR] = useState([]);    
    const callListF = () =>{
        setCallList(!callList)
    }    
    useEffect(() => {
        let mounted = true;
        async function getList() {
            setLoad(true);          
            const resp = await RoutesConsultas.ListConsultasPaciente(paciente.id,props.identify);          
            if(resp.data.success === false){
                setLoad(false);
                setErro(true)
            }else{
                setLoad(false);
                setList(resp.data.resp);
            }
        }
        if(mounted){
            getList();
        }
        return () => mounted = false;
    }, [paciente,callList,props.identify])
    
    const OneConsulta = async (id_consulta) =>{
        listaRetorno(id_consulta);
        setLoadConsulta(true);
        const resp = await RoutesConsultas.oneConsulta(id_consulta);       
        if(resp.data.success === false){
            setLoadConsulta(false);
            setErrConsulta(true);            
        }else{
            setLoadConsulta(false);
            setConsulta(resp.data.resp);
        }
    }
    useEffect(() => {
        const timeout = setTimeout(()=>setErrConsulta(false), 5000);
        return () => clearTimeout(timeout);
    },[errConsulta]);
    const listaRetorno = async (id_consulta) =>{
        try {
            setLoadConsulta(true);
            const resp = await RoutesConsultas.listRetorno(id_consulta);
            if(resp.data.success === false){
                setLoadConsulta(false);
                setErrConsulta(true);     
            }else{
                setLoadConsulta(false);
                setListR(resp.data.resp)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <>
            {/* /.row */}
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            {props.identify === 'null' &&
                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#conaulta">
                                    Nueva consulta
                                </button>
                            }
                            <div className="card-tools">
                                <div className="input-group input-group-sm" style={{width: 150}}>
                                    {/* <input type="text" name="table_search" className="form-control float-right" placeholder="Search" /> */}
                                    {/* <div className="input-group-append">
                                        <button type="submit" className="btn btn-default">
                                            <i className="fas fa-search" />
                                        </button>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body table-responsive p-0" style={list.length === 0 ? {height: 200} :{height: 500}}>
                            <div className="overlay-wrapper">
                                {load && 
                                    <div className="overlay"><i className="fas fa-3x fa-sync-alt fa-spin" /><div className="text-bold pt-2">Loading...</div></div>
                                }
                                {erro &&
                                    <div className="overlay">
                                        <div className="alert alert-danger alert-dismissible">
                                            <button type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                                            <h5><i className="icon fas fa-check"></i>Error!</h5>
                                            <h3>No se puede mostrar los datos</h3>
                                            erro 500
                                        </div>
                                    </div>
                                }
                                <br/>
                                <div className="col-12" id="accordion">
                                    {list.length === 0 && 
                                        <div className="card-body">
                                            <div className="alert alert-danger alert-dismissible">
                                                <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                                <h5><i className="icon fas fa-ban" /> Alerta!</h5>
                                                No hay pacientes para mostrar. 
                                                Registre nuevos pacientes
                                            </div>
                                        </div>
                                    }

                                    {list.length > 0 &&  list.map((data,key) =>{
                                        return (
                                            <div key={key} className="card card-primary card-outline">
                                                
                                                    <div className="card-header">
                                                        <div className="d-flex">
                                                            <div className="mr-auto p-2">
                                                                <h4 className="card-title w-100">
                                                                    {key+1} Consulta en: {data.createdAt.split('T')[0]} Por: {data.medicoUser.nombres} {data.medicoUser.apellidos}
                                                                </h4>
                                                            
                                                            </div>
                                                            <div className="p-2">
                                                                <div className="row">
                                                                    {/* <div className="col-6">
                                                                        <p>{data.medicoUser.nombres}</p> 

                                                                    </div> */}
                                                                    <div className="col-4">
                                                                        <div className="btn-group btn-group-sm">
                                                                            <a href={`#collapseD${key}`} data-toggle="collapse" className="btn btn-primary"><i className="fas fa-eye" /></a>
                                                                        </div> 

                                                                    </div>
                                                                    <div className="col-4">
                                                                        <button type="button" onClick={()=> OneConsulta(data.id)} className="btn btn-outline-primary btn-sm" data-toggle="modal" data-target="#verConsulta">Ver</button>
                                                                    </div>                                                                    
                                                                </div>

                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                
                                                <div id={`collapseD${key}`} className="collapse" data-parent="#accordion">
                                                    <div className="card-body">
                                                        <strong>Motivo de Consulta:</strong>
                                                        <p>{data.motivo}</p>
                                                    </div>
                                                    <div className="card-body">
                                                        <strong>Historia de la Enfermedad:</strong>
                                                        <p>{data.enfermedadActual}</p>
                                                    </div>
                                                    <div className="card-body">
                                                        <strong>Diagnosticos Presuntivos:</strong>
                                                        <p>{data.diagPresuntivo}</p>
                                                    </div>
                                                    <div className="card-body">
                                                        <strong>Conducta:</strong>
                                                        <p>{data.conducta}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })} 
                                </div>

                            </div>
                        </div>
                        {/* /.card-body */}
                    </div>
                    {/* /.card */}
                </div>
            </div>
            {/* /.row */}
            <ModalLarge title='Registrar consulta' idModal='conaulta'>                
                <div className="overlay-wrapper">
                    <FormConsutla dataPaciente={paciente.id} callList={callListF}/>
                </div>
            </ModalLarge>
            <ModalLarge title='Consulta' idModal='verConsulta' large="xl">
                <div className="col-12">
                    <div className="card card-primary card-outline card-outline-tabs">
                        <div className="card-header p-0 border-bottom-0">
                            <ul className="nav nav-tabs" id="custom-tabs-four-tab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="custom-tabs-four-home-tab" data-toggle="pill" href="#formConsulta" role="tab" aria-controls="custom-tabs-four-home" aria-selected="true">Home</a>
                                </li>
                                {listaR.map((data,key)=>{
                                    return (
                                        <li key={key} className="nav-item">
                                            <a className="nav-link" id="custom-tabs-four-profile-tab" data-toggle="pill" href={`#p${data.id}`} role="tab" aria-controls="custom-tabs-four-profile" aria-selected="false">{data.createdAt.split('T')[0]}</a>
                                        </li>
                                    );
                                })}
                                
                                
                                <li className="nav-item">
                                    <a className="nav-link" id="custom-tabs-four-settings-tab" data-toggle="pill" href="#formRetorno" role="tab" aria-controls="custom-tabs-four-settings" aria-selected="false">Reg retorno</a>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body">
                        <div className="tab-content" id="custom-tabs-four-tabContent">
                            <div className="tab-pane fade show active" id="formConsulta" role="tabpanel" aria-labelledby="custom-tabs-four-home-tab">
                                <div className="overlay-wrapper">
                                    <VerConsulta dataPaciente={paciente} loading={loadConsulta} consulta={consulta} erro={errConsulta}/>
                                </div>
                            </div>
                            {listaR.map((data,key)=>{
                                return (
                                    <div key={key} className="tab-pane fade" id={`p${data.id}`} role="tabpanel" aria-labelledby="custom-tabs-four-profile-tab">
                                        <div className="overlay-wrapper">
                                            <VerConsultaRetorno dataPaciente={paciente} loading={loadConsulta} primeraConsulta={consulta} consulta={data} erro={errConsulta}/>
                                        </div>
                                    </div>
                                );
                            })}
                            
                            
                            <div className="tab-pane fade" id="formRetorno" role="tabpanel" aria-labelledby="custom-tabs-four-settings-tab">
                                <div className="overlay-wrapper">
                                    <FormRetornoConsulta dataPaciente={paciente.id} consulta={consulta} callList={listaRetorno}/>
                                </div>
                            </div>
                        </div>
                        </div>
                        {/* /.card */}
                    </div>
                </div>
                
            </ModalLarge>
        </>
    );
}
export default DataConsulta