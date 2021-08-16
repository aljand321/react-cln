import React,{useState,useEffect} from 'react';
import RoutesConsultas from '../../Routes/Consultas';
import VerConsulta from './VerConsulta';
import VerConsultaRetorno from './VerConsultaRetorno';
import Pacientes from '../../Routes/Paciente';
const dataAntPaciente = {
    paciente:'',
    alergias:[],
    transfuciones:[],
    cirugias:[],
    enfermedades:[],
    vacunas:[],
    antNoPtl:[],
    antFamilires:[],
    exmFisico:[],
    antPediatricos:[],
    antGincoObs:[]
}
function DataHistorial (props){
    const paciente = props.dataPaciente;
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    const fechaHoy = hoy.toLocaleDateString();

    const [dataMedico,setDataMedico] = useState({
        nombre:'',
        apellido:''
    })
    const [list, setList] = useState([]);
    const [listR,setListR] = useState([]);
    const [idPaciente,setIdPaciente] = useState({p:0,id:''})
    const [load, setLoad] = useState(false);
    const [erro, setErro] = useState(false);
    const [dataANtPaciente,setDataAntPaciente] = useState(dataAntPaciente);
    
    const getMedico = async ()=>{
        const token = await JSON.parse(localStorage.getItem("tok"))
        setDataMedico({
            nombre:token.user.nombres,
            apellido:token.user.apellidos
        })
    }
    
    useEffect(() => {
        let mounted = true;        
        async function getList() {
            setLoad(true);          
            const resp = await RoutesConsultas.ListConsultasPaciente(paciente.id,'null');          
            if(resp.data.success === false){
                setLoad(false);
                setErro(true);
            }else{
                setLoad(false);
                setList(resp.data.resp);
                if(resp.data.resp.length !== 0){
                    listaRetorno(0,resp.data.resp[0].id)
                }                
            }
        }
        if(mounted){
            getList();
            getMedico();
        }
        return () => mounted = false;
    }, [paciente])
    const listaRetorno = async (p, id_consulta) =>{
        setIdPaciente({
            p:p,
            id:id_consulta
        })
        if(id_consulta){
            try {
                setLoad(true);
                const resp = await RoutesConsultas.listRetorno(id_consulta);
                if(resp.data.success === false){
                    setLoad(false);
                    setErro(true);     
                }else{
                    setLoad(false);
                    setListR(resp.data.resp)
                }
            } catch (error) {
                console.log(error);
                setLoad(false);
                setErro(true);
            }
        }
        
    }
    
    useEffect(()=>{
        let mounted = true; 
        async  function getDataAntPaciente(){
            try {
                setLoad(true)
                const resp = await Pacientes.antPaciente(paciente.id);
                if(resp.data.success === false){
                    setLoad(false);
                    setErro(true)
                }else{
                    setLoad(false);
                    setDataAntPaciente(resp.data.resp)
                }
            } catch (error) {
                setLoad(false);
                setErro(true);
    
            }
        }
        if(mounted){
           getDataAntPaciente();
        }
        return () => mounted = false;
    },[paciente])
    return(
        <>
            <div className="col-md-12">
                    <div className="card">
                        
                        <div className="card-body">
                            <div className="tab-content">
                                {list.map((data,key)=>{
                                    
                                    return (
                                        <div key={key} className={key === idPaciente.p ? "active tab-pane" : "tab-pane"} id={`con${data.id}`}>                         
                                            <div className="row">
                                                <div className="col-12">
                                                <h4>
                                                    <i className="fas fa-user" /> <strong>Medico:</strong> {dataMedico.nombre} {dataMedico.apellido}
                                                    <small className="float-right">Fecha:{fechaHoy}</small>
                                                </h4>
                                                </div>
                                            
                                            </div>    
                                            <div className="row invoice-info">
                                                <div className="col-sm-4 invoice-col">
                                                    <strong>Paciente</strong>
                                                    <address>
                                                        <strong>Nombre Completo:</strong> {paciente.nombres} {paciente.apellidos}<br />
                                                        <strong>Edad:</strong> {paciente.edad} años<br />
                                                        <strong>Sexo:</strong> {paciente.sexo}<br />                                        
                                                        <strong>Ocupacion:</strong> {paciente.ocupacion}<br />
                                                        <strong>Direccion:</strong> {paciente.direccion}<br />
                                                        <strong>C.I.</strong> {paciente.ci}<br />
                                                        <strong>Phone:</strong> {paciente.telefono}<br />
                                                        <strong>Fecha de ingreso:</strong> {paciente.createdAt.split("T")[0]}<br />

                                                    </address>
                                                </div>
                                            
                                                {/* <div className="col-sm-4 invoice-col">
                                                    <strong>Responsable</strong>
                                                    <address>
                                                        <strong>Juan Rosa Gonzales</strong><br />  
                                                        <strong>Responsable:</strong> Padre <br />

                                                        <strong>Sexo:</strong> M <br />
                                                        <strong>Ocupacion:</strong> Comerciante<br />
                                                        <strong>Direccion:</strong> Caller 255<br />
                                                        <strong>C.I.</strong> 89966<br />
                                                        <strong>Phone:</strong> (804) 123-6966 <br />
                                                    </address>
                                                </div> */}
                                                
                                                {/* <div className="col-sm-4 invoice-col">
                                                    <b>Invoice #007612</b><br />
                                                    <br />
                                                    <b>Order ID:</b> 4F3S8J<br />
                                                    <b>Payment Due:</b> 2/22/2014<br />
                                                    <b>Account:</b> 968-34567
                                                </div> */}                                         
                                                <div className="card-body">
                                                    {/* <h4>Consulstas</h4> */}
                                                    <ul className="nav nav-tabs" id="custom-content-below-tab" role="tablist">
                                                        <li className="nav-item">
                                                            <a 
                                                            className="nav-link active" 
                                                            id="custom-content-below-home-tab" 
                                                            data-toggle="pill" 
                                                            href={`#verConsulta${data.id}`} 
                                                            role="tab" 
                                                            aria-controls="custom-content-below-home" 
                                                            aria-selected="true">Consulta</a>
                                                        </li>
                                                        {listR.map((dataR,keyR)=>{
                                                            return (
                                                                <li key={keyR} className="nav-item">
                                                                    <a 
                                                                    className="nav-link" 
                                                                    id="custom-content-below-profile-tab" 
                                                                    data-toggle="pill" 
                                                                    href={`#verRetorno${data.id}-${dataR.id}`}
                                                                    role="tab" 
                                                                    aria-controls="custom-content-below-profile" 
                                                                    aria-selected="false">C.R. {dataR.createdAt.split('T')[0]}</a>
                                                                </li>
                                                            );
                                                        })}
                                                                                                        
                                                    </ul>
                                                    <div className="tab-content" id="custom-content-below-tabContent">
                                                        <div className="tab-pane fade show active" id={`verConsulta${data.id}`} role="tabpanel" aria-labelledby="custom-content-below-home-tab">
                                                            <VerConsulta dataPaciente={'null'} loading={load} consulta={data} erro={erro}></VerConsulta>
                                                        </div>
                                                        {listR.map((dataR,keyR)=>{
                                                            return(
                                                                <div key={keyR} className="tab-pane fade" id={`verRetorno${data.id}-${dataR.id}`} role="tabpanel" aria-labelledby="custom-content-below-profile-tab">
                                                                    <VerConsultaRetorno dataPaciente='null' loading={load} consulta={dataR} erro={erro}/>
                                                                </div> 
                                                            );
                                                        })}
                                                                                                       
                                                    </div>
                                                </div>
                                            </div>           
                                        </div>
                                    );
                                })}                           
                                                               
                                <div className={(list.length + 1) === idPaciente.p ? "active tab-pane" : "tab-pane" } id="settings">
                                    <div className="row">
                                        <div className="col-12">
                                            <h4>
                                                <i className="fas fa-user" /> <strong>Medico:</strong> {dataMedico.nombre} {dataMedico.apellido}
                                                <small className="float-right">Fecha:{fechaHoy}</small>
                                            </h4>
                                        </div>                                    
                                    </div>                                
                                    <div className="row invoice-info">
                                        <div className="col-sm-4 invoice-col">
                                            <strong>Paciente</strong>
                                            <address>
                                                <strong>Nombre Completo:</strong> {paciente.nombres} {paciente.apellidos}<br />
                                                <strong>Edad:</strong> {paciente.edad} años<br />
                                                <strong>Sexo:</strong> {paciente.sexo}<br />                                        
                                                <strong>Ocupacion:</strong> {paciente.ocupacion}<br />
                                                <strong>Direccion:</strong> {paciente.direccion}<br />
                                                <strong>C.I.</strong> {paciente.ci}<br />
                                                <strong>Phone:</strong> {paciente.telefono}<br />
                                                <strong>Fecha de ingreso:</strong> {paciente.createdAt.split("T")[0]}<br />
                                            </address>
                                        </div>                                        
                                    </div>
                                                                       
                                    <div className="row">
                                        <div className="col-6">
                                            <p className="lead"><strong>Alergias</strong></p>
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <tbody>
                                                        {dataANtPaciente.alergias.map((data,key)=>{
                                                            return (
                                                                <tr key={key}>
                                                                    <th style={{width: '10%'}}>{key+1}</th>
                                                                    <td>{data.alergia}</td>
                                                                </tr>
                                                            );
                                                        })}
                                                                                                            
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        
                                        <div className="col-6">
                                            <p className="lead"><strong>Cirugias</strong></p>
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <tbody>
                                                        {dataANtPaciente.cirugias.map((data,key)=>{
                                                            return (
                                                                <tr key={key}>
                                                                    <th style={{width: '10%'}}>{key+1}</th>
                                                                    <td>{data.cirugia}</td>
                                                                </tr>
                                                            );
                                                        })}
                                                        
                                                        
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>                                        
                                                
                                        <div className="col-6">
                                            <p className="lead"><strong>Transfuciones</strong></p>
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <tbody>
                                                        {dataANtPaciente.transfuciones.map((data,key)=>{
                                                            return (
                                                                <tr key={key}>
                                                                    <th style={{width: '10%'}}>{key+1}</th>
                                                                    <td>{data.transfucion}</td>
                                                                </tr>
                                                            );
                                                        })}                                                        
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div> 

                                        <div className="col-6">
                                            <p className="lead"><strong>Otras enfermedades</strong></p>
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <tbody>
                                                        {dataANtPaciente.enfermedades.map((data,key)=>{
                                                            return (
                                                                <tr key={key}>
                                                                    <th style={{width: '10%'}}>{key+1}</th>
                                                                    <td>{data.otrasEnf}</td>
                                                                </tr>
                                                            );
                                                        })}                                                        
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div> 

                                        <div className="col-6">
                                            <p className="lead"><strong>Inmunizaciones</strong></p>
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Vacuna</th>
                                                            <th>Dosis</th>                                                            
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {dataANtPaciente.vacunas.map((data,key)=>{
                                                            return (
                                                                <tr key={key}>
                                                                    <th style={{width: '10%'}}>{key+1}</th>
                                                                    <td>{data.vacuna}</td>
                                                                    <td>{data.dosis}</td>
                                                                </tr>
                                                            );
                                                        })}                                                         
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>                                        
                                        <div className="col-6">
                                            <p className="lead"><strong>Atecedentes pediatricos</strong></p>
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Peso Rn.</th>
                                                            <th>Parto</th>   
                                                            <th>Obs. Perinatales</th>
                                                            <th>Fecha registro</th>                                                               
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {dataANtPaciente.antPediatricos.map((data,key)=>{
                                                            return (
                                                                <tr key={key}>
                                                                    <th style={{width: '10%'}}>{key+1}</th>
                                                                    <td>{data.pesoRn}</td>
                                                                    <td>{data.tipodeParto}</td>
                                                                    <td>{data.obsPerinatales}</td>
                                                                    <td>{data.createdAt.split('T')[0]}</td>
                                                                </tr>
                                                            );
                                                        })} 
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div> 
                                                                                          
                                    </div>  

                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h3 className="card-title">Antecedentes no patologicos</h3>
                                                    
                                                </div>                                                
                                                <div className="card-body table-responsive p-0">
                                                    <table className="table table-hover text-nowrap">
                                                        <thead>
                                                            <tr>
                                                                <th style={{width: 10}}>#</th>
                                                                <th>Instruccion</th>
                                                                <th>funa</th>
                                                                <th>Cigarrillos por dia</th>
                                                                <th>Desde hace...</th>
                                                                <th>Bebe</th>
                                                                <th>A la semana</th>
                                                                <th>Desde hace...</th>
                                                                <th>Alimentacion</th>
                                                                <th>Fecha de Registro</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {dataANtPaciente.antNoPtl.map((data,key)=>{
                                                                return (
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
                                                </div>                                               
                                            </div>                                            
                                        </div>
                                   
                                        <div className="col-12">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h3 className="card-title">Antecedentes familiares</h3>
                                                    
                                                </div>                                                
                                                <div className="card-body table-responsive p-0">
                                                    <table className="table table-hover text-nowrap">
                                                        <thead>
                                                            <tr>
                                                                <th style={{width: 10}}>#</th>
                                                                <th>Padre</th>
                                                                <th>Est. Salud</th>
                                                                <th>F. Causa</th>
                                                                <th>Madre</th>
                                                                <th>Est. Salud</th>
                                                                <th>F. Causa</th>
                                                                <th>Hnos N°</th>
                                                                <th>Viven</th>
                                                                <th>Fallecidos</th>
                                                                <th>Causa</th>
                                                                <th>Est. de salud</th>
                                                                <th>fecha</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {dataANtPaciente.antFamilires.map((data,key)=>{
                                                                return (
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
                                                </div>                                               
                                            </div>                                            
                                        </div>

                                        {dataANtPaciente.paciente === 'F' && 
                                            <div className="col-12">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h3 className="card-title">Antecedentes gineco obstetricos</h3>
                                                        
                                                    </div>                                                
                                                    <div className="card-body table-responsive p-0">
                                                        <table className="table table-hover text-nowrap">
                                                            <thead>
                                                                <tr>
                                                                    <th style={{width: 10}}>#</th>                                   
                                                                    <th>Rtimo</th>
                                                                    <th>FUM.</th>
                                                                    <th>Gesta</th>
                                                                    <th>Partos</th>
                                                                    <th>Cesárea</th>
                                                                    <th>Abortos</th>
                                                                    <th>Metodos de Planificacion Familiar</th>
                                                                    <th>Fecha</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {dataANtPaciente.antGincoObs.map((data,key)=>{
                                                                    return (
                                                                        <tr key={key}>
                                                                            <td>{key+1}</td>                                           
                                                                            <td>{data.ritmo}</td>
                                                                            <td>{data.fum}</td>
                                                                            <td>{data.gesta}</td>
                                                                            <td>{data.partos}</td>
                                                                            <td>{data.cesarea}</td>
                                                                            <td>{data.abortos}</td>
                                                                            <td>{data.plfcFamiliar}</td>
                                                                            <td>{data.createdAt.split('T')[0]}</td>  
                                                                        </tr>
                                                                    );
                                                                })}                                                  
                                                            </tbody>
                                                        </table>
                                                    </div>                                               
                                                </div>                                            
                                            </div>
                                        }
                                    </div>

                                    <div className="row no-print">
                                        <div className="col-12">
                                            <a href="invoice-print.html" rel="noopener" target="_blank" className="btn btn-default"><i className="fas fa-print" /> Print</a>
                                            <button type="button" className="btn btn-success float-right"><i className="far fa-credit-card" /> Submit
                                                Payment
                                            </button>
                                            <button type="button" className="btn btn-primary float-right" style={{marginRight: 5}}>
                                                <i className="fas fa-download" /> Generate PDF
                                            </button>
                                        </div>
                                    </div>
                                </div>                            
                            </div>                        
                        </div>
                        <div className="card-header p-2">
                            <ul className="nav nav-pills">
                                {list.map((data,key)=>{
                                    return (
                                        <li key={key} 
                                        className="nav-item">
                                            <a className={key === idPaciente.p ? "nav-link active": "nav-link"} href={`#con${data.id}`} onClick={()=>listaRetorno(key,data.id)} data-toggle="tab">C{key+1} {data.createdAt.split('T')[0]}</a>
                                        </li>
                                    );
                                })}                                
                                <li className="nav-item">
                                    <a className={(list.length +1) === idPaciente.p ? "nav-link active" : "nav-link"} href="#settings" onClick={()=>listaRetorno(list.length +1,idPaciente.id)} data-toggle="tab">Antecedented del paciente</a>
                                </li>
                            </ul>
                        </div>
                    </div>                
                </div>
        </>
    );
}
export default DataHistorial;