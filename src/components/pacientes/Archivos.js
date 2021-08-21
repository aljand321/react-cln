import React, {useState,useEffect} from 'react';
import ModalLarge from '../ModalLarge';
import FormArchivos from './Forms/FormsArchivos';
import Pacientes from '../../Routes/Paciente';
function ArchivosPaciente (props){   
    const [list,setList] = useState([]);
    const [oneArchivo, setOneArchivo] = useState({})
    const [load,setLoad] = useState(false);
    const [respErroMsg,setErroMsg] = useState('')
    const [respErro,setRespErro] = useState(false);
    const [call,setCall] = useState(false);
    
    const callList = () =>{
        setCall(!call);
    }
    useEffect(()=>{
        async function getListFiles(){
            try {
                setLoad(true);
                const resp = await Pacientes.listArchivosPaciente(props.dataPaciente.id);
                if(resp.data.success === false){
                    setLoad(false);
                    setErroMsg(resp.data.msg);
                }else{
                    setLoad(false);
                    setList(resp.data.resp)
                }
            } catch (error) {
                setLoad(false);
                setRespErro(true)
            }
        }
        getListFiles();
    },[call,props.dataPaciente.id]);
    useEffect(() => {
        const timeout = setTimeout(() =>{
            setErroMsg('')
        },5000);
        return () => clearTimeout(timeout);
    },[respErroMsg])
    const verArchivo = (p) =>{
        let arr = {}
        for(var i = 0; i < list.length; i++){
            if(p === i){
                arr = list[i]
            }
        }
        console.log(arr, 'esto es el archivo');
        setOneArchivo(arr);
    }
    return (
        <>
            {load && 
                <div className="overlay"><i className="fas fa-3x fa-sync-alt fa-spin" /><div className="text-bold pt-2">Loading...</div></div>
            }
            {respErroMsg && 
                <div className="overlay">
                    <div className="alert alert-danger alert-dismissible">
                        <button onClick={()=>setErroMsg('')} type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                        <h5><i className="icon fas fa-ban" />No se pudo mostrar los datos!</h5>
                        {respErroMsg}
                    </div>
                </div>
            }
            {respErro && 
                <div className="overlay">
                    <div className="alert alert-danger alert-dismissible">
                        <button onClick={()=>setRespErro(false)} type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                        <h5><i className="icon fas fa-ban" />Error 500!</h5>
                        No hay coneccion con la base de datos
                    </div>
                </div>
            }
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Archivos del Paciente</h3>
                            <div className="card-tools">
                                <div className="input-group input-group-sm" style={{width: 150}}>
                                    {props.identify === 'null' &&
                                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#archivosData">
                                            Registrar
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                        
                        <div className="card-body table-responsive p-0">
                            <table className="table table-hover text-nowrap">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Descripcion</th>
                                        <th>fecha</th>
                                        <th>ver</th>
                                                                                
                                    </tr>
                                </thead>
                                <tbody>
                                    {list.map((data,key)=>{
                                        return (
                                            <tr key={key}>
                                                <td>{key + 1}</td>
                                                <td>{data.descripcion}</td>
                                                <td>{data.createdAt.split("T")[0]}</td>  
                                                <td>
                                                    <div onClick={()=>verArchivo(key)} className="btn-group btn-group-sm">
                                                        <div data-toggle="modal" data-target="#verArchivo" className="btn btn-primary"><i className="fas fa-eye" /></div>
                                                    </div>
                                                </td>

                                            </tr> 
                                        );
                                    })}
                                                                 
                                </tbody>
                            </table>
                        </div>
                  
                    </div>
                   
                </div>
            </div>
            <ModalLarge title='Adjuntar Archivo' idModal='archivosData'>
                <div className="overlay-wrapper"> 
                    <FormArchivos dataPaciente={props.dataPaciente.id} callList={callList}/>
                </div>
            </ModalLarge>
             {/* <object
                data={`http://localhost:3001/${oneArchivo.archivo}`}
                type='application/pdf'
                width="100%"
                height="100%"
            /> */}
            {/* <iframe src={`http://192.168.1.179:3001/${oneArchivo.archivo}`}
            type='application/pdf'
            width="100%" height="680px" /> */}
            <ModalLarge title='Estudio del paciente' idModal='verArchivo'>
                <div className="overlay-wrapper"> 
                   {Object.keys(oneArchivo).length !== 0 && 
                        <div className="row">
                            <label>Descripcion del Archivo</label>
                            <p>{oneArchivo.descripcion}</p>
                            <br/>
                            {oneArchivo.archivo.split('.')[1] === 'pdf' ?         
                               <embed src={`http://192.168.1.179:3001/${oneArchivo.archivo}`} 
                               type="application/pdf" width="100%" height="600px" />             
                            :                             
                                <div className="col-12">
                                    <img alt="img" style={{width:'100%',height:'100%'}} src={`http://192.168.1.179:3001/${oneArchivo.archivo}`}></img>
                                </div>
                            }    
                        </div>
                    }
                </div>
            </ModalLarge>
        </>
    );
}

export default ArchivosPaciente;