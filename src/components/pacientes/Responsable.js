import React, {useState,useEffect,useCallback} from 'react';
import ModalLarge from "../../components/ModalLarge";
import FormPaciente from './formPaciente'
import Pacientes from '../../Routes/Paciente';
function List(props) {  
    
    let item = [];
    for(let i = 0; i < props.number; i++){
        item.push(props.children(i));
    }    
    const data = item.slice(0 + props.num ,5 + props.num );    
    return data
}
const listR = {
    totalItems:0,
    totalPages:0,
    currentPage:0,
    listR:[]
}
const pageData = {
    number:0,
    c:0
}
function Responsable (props){
    const [list, setList] = useState(listR);
    const [buscar, setBuscar] = useState({buscador:''})
    const [pageD, setPageD] = useState(pageData);
    const [limite, setLimite] = useState('')
    const [idResponsable, setIdResponsable] = useState('')
    const [load, setLoad] = useState(false);
    const [error, setError] = useState(false);
    const [msgError, setMsgError] = useState('');
    const [respSucess, setRespSuccess] =  useState(false);
    const [select,setSelect] = useState('')
    const [validate, setValidate] = useState('')
    const [responsables, setResponsables] = useState([]);

    const listResp = async () =>{     
        let data = '';       
        try {
            setLoad(true);
            const resp = await Pacientes.buscarPaciente(data,0,10);
            if(resp.data.success === false){
                setLoad(false);
                setError(true);
            }else{
                setLoad(false);
                setList({
                    totalItems:resp.data.totalItems,
                    totalPages:resp.data.totalPages,
                    currentPage:resp.data.currentPage,
                    listR:resp.data.reps 
                })
            }
        } catch (error) {
            console.log(error)
        }
             
    }    
    useEffect(()=>{
        listResp();        
    },[]);
    const buscarResponsable = async (e) =>{  
        console.log('buscando')
        setPageD({
            number: 0,
            c : 0
        })
        setLimite(10)
        let data = ''   
        if(e){
            const {value,name} = e.target;
            setBuscar({
                ...buscar,
                [name]:value
            })
            data = value
        }
        try {
            setLoad(true);
            const resp = await Pacientes.buscarPaciente(data,0,10);
            if(resp.data.success === false){
                setLoad(false);
                setError(true);
            }else{
                setLoad(false);
                setList({
                    totalItems:resp.data.totalItems,
                    totalPages:resp.data.totalPages,
                    currentPage:resp.data.currentPage,
                    listR:resp.data.reps 
                })
                
            }
        } catch (error) {
            console.log(error)
        }
             
    }
    const changePage = async (page) =>{        
        if(page === 0){           
            setPageD({
                number: 0,
                c : 0
            })
        }else{
            if(page === list.totalPages - 1){
                setPageD({
                    number: list.totalPages - 4,
                    c : list.totalPages - 1
                })
            }else{
                if (page > pageD.c){
                    if(page > 2){                       
                        setPageD({
                            number: (page - 2) * 1,
                            c:page
                        })
                    }else{
                        setPageD({
                            number:pageD.number,
                            c: page
                        })
                    }
                                
                }else {
                    if (page < list.totalPages - 1){
                        if(pageD.number !== 0){
                            setPageD({
                                number: page - 2 < 0 ? 0 : page - 2,
                                c : page 
                            });
                        }
                    }
                    
                }
            }
        }
        try {
            setLoad(true);
            const resp = await Pacientes.buscarPaciente(buscar.buscador,page,limite);
            if(resp.data.success === false){
                setLoad(false);
                setError(true);
            }else{
                setLoad(false);
                setList({
                    totalItems:resp.data.totalItems,
                    totalPages:resp.data.totalPages,
                    currentPage:resp.data.currentPage,
                    listR:resp.data.reps 
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    const changeLimit = async (e)=>{
        const {value} = e.target; 
        setPageD({
            number: 0,
            c : 0
        })
        setLimite(value)
        try {
            setLoad(true);
            const resp = await Pacientes.buscarPaciente(buscar.buscador,0,value);
            if(resp.data.success === false){
                setLoad(false);
                setError(true);
            }else{
                setLoad(false);
                setList({
                    totalItems:resp.data.totalItems,
                    totalPages:resp.data.totalPages,
                    currentPage:resp.data.currentPage,
                    listR:resp.data.reps 
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    const selectREsp = (id_resp) =>{
        setIdResponsable(id_resp)
    }
    const changeSelect =(e)=>{
        const {value} = e.target;
        setSelect(value)
        setValidate(value.length === 0 ? 'Obligatorio' : '')
    }
    const addREsponsable = async () =>{        
        if(select.length !== 0){
            console.log('puedes continuar')
            try {
                const data ={
                    descripcion:select,
                    id_responsable:idResponsable,
                    id_paciente:props.dataPaciente.id
                }
                setLoad(true);                
                const resp = await Pacientes.responsable(data);
                if(resp.data.success === false){
                    setLoad(false);
                    setMsgError(resp.data.msg)
                }else{
                    setLoad(false);
                    setRespSuccess(true);
                    setSelect('');
                    listResponsables();
                }
            } catch (error) {
                setError(true);
                console.log(error);
            }
        }else{
            setValidate('Obligatorio')
        }
        
    }
    const listResponsables = useCallback (async () =>{
        try {
            setLoad(true);
            const resp = await Pacientes.listResponsablesPaciente(props.dataPaciente.id);
            if(resp.data.success === false){
                setLoad(false);
                setError(true);
            }else{
                setLoad(false);
                setResponsables(resp.data.resp)
            }
        } catch (error) {
            console.log(error)
        }
    },[props.dataPaciente.id])
    useEffect(()=>{
        listResponsables();
    },[listResponsables])
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="card">                    
                        <div className="card-header">
                            <h3 className="card-title">Responsables del paciente</h3>
                            <div className="card-tools">
                                <div className="input-group input-group-sm" style={{width: 100}}>
                                    {props.identify === 'null' &&
                                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#resp">
                                            Registrar
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body table-responsive p-0">
                            <div className="overlay-wrapper">
                                {load &&
                                    <div className="overlay"><i className="fas fa-3x fa-sync-alt fa-spin" /><div className="text-bold pt-2">Loading...</div></div>
                                }
                                {error && 
                                    <div className="overlay">
                                        <div className="alert alert-danger alert-dismissible">
                                            <button                                 
                                            type="button" onClick={()=>setError(false)} className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                            <h5><i className="icon fas fa-ban" />Error</h5>
                                            error 500
                                        </div>
                                    </div>
                                }
                                <table className="table table-hover text-nowrap">
                                    <thead>
                                        <tr>
                                            <th>N°</th>
                                            <th>Nombre(s)</th>
                                            <th>Apellido(s)</th>
                                            <th>Descripcion</th>
                                                                                
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {responsables.map((data,key)=>{
                                            return (
                                                <tr key={key}>
                                                    <td>{key+1}</td>
                                                    <td>{data.nombres}</td>
                                                    <td>{data.apellidos}</td>
                                                    <td>{data.descripcion}</td>                                       
                                                </tr>
                                            );
                                        })} 
                                                                                                
                                    </tbody>
                                </table>
                            </div>           
                        </div>
                    </div>
                </div>
            </div>
            <ModalLarge title='Registrar responsable' idModal='resp'>
                <div className="col-12">
                    <div className="card card-primary card-outline card-outline-tabs">
                        <div className="card-header p-0 border-bottom-0">
                            <ul className="nav nav-tabs" id="custom-tabs-four-tab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="custom-tabs-four-home-tab" data-toggle="pill" href="#lst" role="tab" aria-controls="custom-tabs-four-home" aria-selected="true">Lista</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="custom-tabs-four-profile-tab" data-toggle="pill" href="#registrarREs" role="tab" aria-controls="custom-tabs-four-profile" aria-selected="false">Reg. Responsable</a>
                                </li>
                               
                            </ul>
                        </div>
                        <div className="card-body">
                            <div className="tab-content" id="custom-tabs-four-tabContent">
                                <div className="tab-pane fade show active" id="lst" role="tabpanel" aria-labelledby="custom-tabs-four-home-tab">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card">                    
                                                <div className="card-header">
                                                    <h3 className="card-title">Lista</h3>
                                                    <div className="card-tools">
                                                        <div className="input-group input-group-sm" style={{width: 250}}>                                                          
                                                            <input 
                                                            onChange={buscarResponsable}
                                                            value={buscar.buscador}
                                                            name="buscador"
                                                            type="text" className="form-control float-right" placeholder="Buscar" />
                                                            <div className="input-group-append">
                                                                <button type="submit" className="btn btn-default">
                                                                    <i className="fas fa-search" />
                                                                </button>
                                                            </div>                            
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* /.card-header */}
                                                <div className="card-body table-responsive p-0">
                                                    <div className="overlay-wrapper">
                                                        {load &&
                                                            <div className="overlay"><i className="fas fa-3x fa-sync-alt fa-spin" /><div className="text-bold pt-2">Loading...</div></div>
                                                        }
                                                        {error && 
                                                            <div className="overlay">
                                                                <div className="alert alert-danger alert-dismissible">
                                                                    <button                                 
                                                                    type="button" onClick={()=>setError(false)} className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                                                    <h5><i className="icon fas fa-ban" />Error</h5>
                                                                    error 500
                                                                </div>
                                                            </div>
                                                        }
                                                        <table className="table table-hover text-nowrap">
                                                            <thead>
                                                                <tr>
                                                                    <th>N°</th>
                                                                    <th>Nombre(s)</th>
                                                                    <th>Apellido(s)</th>
                                                                    <th>C.I.</th>
                                                                    <th>Telefono</th>
                                                                    <th>Ocupacion</th>
                                                                    <th>Insertar</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>      
                                                                {list.listR.map((data,key)=>{
                                                                    return(
                                                                        <tr key={key}>
                                                                            <td>{key+1}</td>
                                                                            <td>{data.nombres}</td>
                                                                            <td>{data.apellidos}</td>
                                                                            <td>{data.ci}</td>
                                                                            <td>{data.telefono}</td>
                                                                            <td>{data.ocupacion}</td>
                                                                            <td>
                                                                                <button 
                                                                                onClick={()=>selectREsp(data.id)}
                                                                                type="button" className="btn btn-primary" data-toggle="modal" data-target="#selectTipo">
                                                                                    Ins
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                })}                                                                                       
                                                            </tbody>
                                                        </table>
                                                    </div>     
                                                </div>
                                                <div className="card-footer clearfix">
                                                    <ul className="pagination pagination-sm m-0 float-right">
                                                        {pageD.c > 2 && <li  className="page-item" onClick={() =>changePage(0)}><div className="page-link">1</div></li>}
                                                        {pageD.c > 2 && <li  className="page-item active"><div className="page-link">....</div></li>}
                                                        <List number={list.totalPages} num={pageD.number}>
                                                            {(index) => {                                
                                                                    return (
                                                                        <li 
                                                                            key={index} 
                                                                            onClick={() =>changePage(index)}  
                                                                            className={list.currentPage === index ? "page-item active" : "page-item" }
                                                                        >
                                                                            <div className="page-link">{index +1 }</div>
                                                                        </li>
                                                                    );
                                                                }
                                                            
                                                            }
                                                        </List>
                                                        {pageD.c < list.totalPages-3 && <li  className= "page-item active"><div className="page-link">....</div></li>}
                                                        {pageD.c < list.totalPages-3 && <li  className= "page-item" onClick={() =>changePage(list.totalPages-1)}><div className="page-link">{list.totalPages}</div></li>}
                    

                                                        <li className="page-item">                       
                                                            <select name='limite' onChange={changeLimit} value={limite} className="form-control">
                                                                <option value='10'>10</option>
                                                                <option value='25'>25</option>                                                              
                                                                <option value='50'>50</option>
                                                                <option value='100'>100</option>
                                                            </select>                       
                                                        </li>
                                                    </ul>
                                                    
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="registrarREs" role="tabpanel" aria-labelledby="custom-tabs-four-profile-tab">
                                    <FormPaciente handleChange={listResp} desde="responsable"/>
                                </div>                                
                            </div>
                        </div>                       
                    </div>
                </div>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        
                    </div>
                    <div className="p-2">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </ModalLarge>
            <ModalLarge large='sm' title='Selecione' idModal='selectTipo'>
                <div className="overlay-wrapper"> 
                    {load &&
                        <div className="overlay"><i className="fas fa-3x fa-sync-alt fa-spin" /><div className="text-bold pt-2">Loading...</div></div>
                    }
                    {respSucess && 
                        <div className="overlay">
                            <div className="alert alert-success alert-dismissible">
                                <button                                 
                                type="button" onClick={()=>setRespSuccess(false)} className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                <h5><i className="icon fas fa-check" />Genial</h5>
                                Se registro correctamente
                            </div>
                        </div>
                    }
                    {msgError && 
                        <div className="overlay">
                            <div className="alert alert-warning alert-dismissible">
                                <button                                 
                                type="button" onClick={()=>setMsgError('')} className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                <h5><i className="icon fas fa-ban" />Error</h5>
                                {msgError}
                            </div>
                        </div>
                    }
                    {error && 
                        <div className="overlay">
                            <div className="alert alert-danger alert-dismissible">
                                <button                                 
                                type="button" onClick={()=>setError(false)} className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                <h5><i className="icon fas fa-ban" />Error</h5>
                                error 500
                            </div>
                        </div>
                    }
                    <div className="form-group">                
                        <label htmlFor="exampleSelectBorder">Selecione {validate && <code>{validate}</code>}</label>
                        <select
                        name="tipo"
                        onChange={changeSelect}
                        
                        className="custom-select form-control-border" id="exampleSelectBorder">
                            <option value="">SELECCIONE</option>
                            <option value="Padre">Padre</option>
                            <option value="Madre">Madre</option>
                            <option value="Abuelo">Abuelo</option>
                            <option value="Abuela">Abuela</option>
                            <option value="Hijo">Hijo</option>
                            <option value="Hija">Hija</option>
                            <option value="Primo">Primo</option>
                            <option value="Prima">Prima</option>
                            <option value="Tio">Tio</option>
                            <option value="Tia">Tia</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>
                </div>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <button type="submit" onClick={addREsponsable} className="btn btn-primary">Registrar</button>
                    </div>
                    <div className="p-2">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>                        
                    </div>
                </div>

            </ModalLarge>
        </>
    );
}


export default Responsable;