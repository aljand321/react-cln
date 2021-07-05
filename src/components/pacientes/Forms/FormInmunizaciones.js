import React, { useState,useEffect, useCallback } from 'react'
import RoutesInmunizacion from '../../../Routes/Inmunizacion';
const form = {
    nombre:'',
    descripcion:''
}
const formBuscador = {
    buscador:''
}
function FormInmunizaciones(props) {
    const [data, setData] = useState(form);
    const [load, setload] = useState(false);
    const [err, setErr] = useState({nombre:''});
    const [respErro, setRespErro] = useState({erro:''});
    const [resp, setResp] = useState(false);
    const [list, setList] = useState([]);
    const [selected, setSelected] = useState([]);
    const [datavacuna, setDatavacuna] = useState({});
    const [dataVerro, setDataVerro] = useState({});

    const [success, setSuccess] = useState([]);
    const [errREsp, setErrREsp] = useState([]);

    const [buscar, setBuscar] = useState(formBuscador);
    
    const handleChange = (e) =>{
        const { name, value } = e.target;
        setData({
            ...data,
            [name]:value
        })
        if(name === 'nombre'){
            setErr(value.length === 0 ? {nombre:'Nombre es obligatorio'}:'')
        }
    }
    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        let arr = {nombre:''}
        if(data.nombre.length === 0){
            arr.nombre='Nombre es obligatorio'
        }
        setErr(arr);
        if(arr.nombre.length === 0){
            setload(true);
            const resp = await RoutesInmunizacion.createInmunizacion(data);
            if(resp.data.success === false){
                if(resp.data.error === '500'){
                    setload(false);
                    setRespErro({erro:resp.data.msg})
                    setTimeout(()=>setRespErro({erro:''}),5000);
                }else{
                    setload(false);
                    setErr({nombre:resp.data.msg});
                }
            }else{
                setload(false);
                setResp(true);
                setData(form);
                getList();
                setTimeout(()=>setResp(false), 3000);
            }
        }
    }
    const getList = useCallback( async()=>{
        setload(true);
        const resp = await RoutesInmunizacion.buscarVacuna('');
        if(resp.data.success === false){
            setload(false);
            setRespErro({erro:resp.data.msg});
            setTimeout(() =>setRespErro({erro:''}),5000);
        }else{
            setload(false);
            setList(resp.data.resp.datas)
        }
        
    },[])
    
    useEffect(() => {
        getList();
    },[getList])
    const buscarAlergia = async (e) => {
        let data = ''    
        if(e){
            const { value,name } = e.target              
            setBuscar({
                ...buscar,
                [name]:value
            })
            data= value 
        }
        setload(true);
        const resp = await RoutesInmunizacion.buscarVacuna(data);
        if(resp.data.success === false){
            setload(false);
            setRespErro({erro:''})            
            setTimeout(() =>{
                setRespErro(false)
            },3000)
            
        }else{
            setload(false);
            setList(resp.data.resp.datas)   
            
        } 
    }
    const check = (id_vacuna,nombre,p) => {
        console.log(id_vacuna,nombre,p);
        let verify = false;
        for (let i = 0; i < selected.length; i++) { 
            if(selected[i].id_vacuna === id_vacuna){
                verify=true
            }           
        }
        if(datavacuna[`dosis${p}`] === undefined || datavacuna[`dosis${p}`] === ''){
            setDataVerro({[`dosis${p}`]:'Selecione'})
        }else{
            if(verify === false){
                setSelected([].concat(selected, 
                    {
                        id_vacuna,
                        nombre,
                        descripcion:datavacuna[`dosis${p}`],
                        fecha:datavacuna[`date${p}`]
                    }
                ))
            }
        }
        console.log(selected,' estp es ')
    }
    const handleChangeList = (e) => {
        const {name,value}= e.target;
        setDatavacuna({
            ...datavacuna,
            [name]:value
        })
        setDataVerro({
            ...dataVerro,
            [name]:value.length === 0 ? 'Selecione' : ''
        })
    }
    function deleteSelect(position) {
        console.log(position)
        var array = [...selected];
        
        array.splice(position, 1);
        setSelected(array);          
    }
    const insertVacunaPaciente = async () => {
        let err = [], success = [];
        if(selected.length === 0){
            setRespErro({erro:'Selecione una vacuna'})
            setTimeout(() =>setRespErro({erro:''}),2000)
        }else{
            setload(true);
            for(var i = 0; i < selected.length; i++) {
                const data = {
                    descripcion:selected[i].descripcion,
                    fecha:selected[i].fecha ? selected[i].fecha : '',
                    id_paciente:props.dataPaciente, 
                    id_vacuna:selected[i].id_vacuna,
                }
                const resp = await RoutesInmunizacion.CreatePacienteVacunas(data);
                console.log(resp.data)
                if(resp.data.success === false){
                    err.push({msg:resp.data.msg})
                }else{
                    success.push({msg:resp.data.msg})
                }
            }
        }
        if(err.length !== 0){
            setload(false);
            setErrREsp(err);
            setTimeout(() =>setErrREsp([]),10000);
            setTimeout(() =>setSelected([]),3000)           
        }
        if(success.length !== 0 ){
            setload(false);
            setSuccess(success);
            setResp(true);
            props.callList();
            setTimeout(() =>setSelected([]),3000)
            setTimeout(() =>setResp(false),3000);
            setTimeout(() =>setSuccess([]),3000);            
            
        }
        
    }
    return (
        <div>
            
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-primary card-tabs">
                        <div className="card-header p-0 pt-1">
                            <ul className="nav nav-tabs" id="custom-tabs-five-tab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="custom-tabs-five-overlay-tab" data-toggle="pill" href="#custom-tabs-five-overlay1" role="tab" aria-controls="custom-tabs-five-overlay" aria-selected="true">Registrar</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="custom-tabs-five-overlay-dark-tab" data-toggle="pill" href="#custom-tabs-five-overlay-dark1" role="tab" aria-controls="custom-tabs-five-overlay-dark" aria-selected="false">Nueva Inmunizacion</a>
                                </li>
                            
                            </ul>
                        </div>
                        <div className="card-body">
                            <div className="tab-content" id="custom-tabs-five-tabContent">
                                <div className="tab-pane fade show active" id="custom-tabs-five-overlay1" role="tabpanel" aria-labelledby="custom-tabs-five-overlay-tab">
                                    <div className="overlay-wrapper">
                                        {/* <div className="overlay"><i className="fas fa-3x fa-sync-alt fa-spin" /><div className="text-bold pt-2">Loading...</div></div> */}
                                        <section className="content">
                                            <div className="container-fluid">                                               
                                                <div className="row">
                                                    <div className="col-md-8 offset-md-2">
                                                        <form action="simple-results.html">
                                                            <div className="input-group">
                                                                <input 
                                                                name='buscador'
                                                                onChange={buscarAlergia}
                                                                type="search" className="form-control form-control-lg" placeholder="Buscar Vacuna" />                                                                
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                        <br/>
                                        {load && 
                                            <div className="overlay"><i className="fas fa-3x fa-sync-alt fa-spin" /><div className="text-bold pt-2">Loading...</div></div>
                                        }
                                        {respErro.erro &&
                                            <div className="overlay">
                                                <div className="alert alert-danger alert-dismissible">
                                                    <button type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                                                    <h5><i className="icon fas fa-check"></i>Error!</h5>
                                                    <h3> {respErro.erro}</h3>
                                                    No se pudo enviar los datos
                                                </div>
                                            </div>
                                        }
                                        <div className="row">    
                                            <div>
                                                {selected.map((data,key)=>{
                                                    return(                                                       
                                                        <div key={key} onClick={() => deleteSelect(key)} className="btn btn-default btn-sm"><i className="fas fa-share" /> {data.nombre} {data.descripcion}</div>
                                                    );
                                                })}                                                
                                            </div>
                                            <div>
                                                {errREsp.map((data,key)=>{
                                                    return(
                                                        <div key={key} className="btn btn-default btn-sm"><p className="text-danger">{data.msg}</p> </div>
                                                    );
                                                })}
                                            </div>
                                            <div>
                                                {success.map((data,key)=>{
                                                    return(
                                                        <div key={key} className="btn btn-default btn-sm"><p className="text-success">{data.msg}</p> </div>
                                                    );
                                                })}
                                            </div>
                                            <div className="col-12" id="accordion">
                                                {list.map((data,key)=>{
                                                    return(
                                                        <div key={key} className="card card-primary card-outline">
                                                            <div className="d-block w-100" data-toggle="collapse" >
                                                                <div className="card-header">    
                                                                
                                                                    <div className="row">
                                                                        <div className="col-3">
                                                                            <h4 className="card-title w-100">
                                                                               {key+1} {data.nombre}
                                                                            </h4> 
                                                                        </div>
                                                                        
                                                                        <div className="col-3">                                                                            
                                                                            <div className="form-group">
                                                                                
                                                                                <select 
                                                                                onChange={handleChangeList} 
                                                                                value={datavacuna[`dosis${key}`]}
                                                                                name={`dosis${key}`}
                                                                                className="custom-select form-control-border border-width-2">
                                                                                    <option value="" >Selecione Dosis</option>
                                                                                    <option value="Primera dosis" >Primera dosis</option>
                                                                                    <option value="Segunda dosis" >Segunda dosis</option>
                                                                                    <option value="Tercera dosis " >Tercera dosis</option>
                                                                                    <option value="Cuarta dosis" >Cuarta dosis</option>
                                                                                </select>
                                                                                {dataVerro[`dosis${key}`] && <code>{dataVerro[`dosis${key}`]}</code>}
                                                                            </div>

                                                                            
                                                                        </div>
                                                                        <div className="col-4">
                                                                            <div className="form-group">
                                                                                <input 
                                                                                onChange={handleChangeList} 
                                                                                value={datavacuna[`date${key}`]}
                                                                                name={`date${key}`}
                                                                                type="date" className="form-control"/>
                                                                            </div> 
                                                                            
                                                                        </div>
                                                                        <div className="col-1">

                                                                            <div className="btn-group btn-group-sm" role="group" aria-label="Third group">
                                                                                <button onClick={()=>check(data.id,data.nombre,key)} type="button" className="btn btn-info">Ins</button>
                                                                            </div>

                                                                        </div>
                                                                        <div className="col-1">
                                                                            <div className="btn-group btn-group-sm">
                                                                                <a href={`#li${key}`} data-toggle="collapse" className="btn btn-primary"><i className="fas fa-eye" /></a>
                                                                            </div> 
                                                                        </div>
                                                                    </div>  
                                                                                                                    
                                                                    
                                                                </div>  
                                                                
                                                            </div>
                                                            <div id={`li${key}`} className="collapse " data-parent="#accordion">
                                                                <div className="card-body">
                                                                    {data.descripcion}
                                                                </div>
                                                            </div>
                                                        </div>
                                                
                                                    );
                                                })}
                                                
                                            </div>  
                                        </div>
                                     
                                    </div>
                                    <div className="d-flex">
                                        <div className="mr-auto p-2">
                                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                        </div>
                                        <div className="p-2">
                                            <button type="button" onClick={insertVacunaPaciente} className="btn btn-primary">Registrar</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="custom-tabs-five-overlay-dark1" role="tabpanel" aria-labelledby="custom-tabs-five-overlay-dark-tab">
                                    <div className="overlay-wrapper">
                                        {/* <div className="overlay"><i className="fas fa-3x fa-sync-alt fa-spin" /><div className="text-bold pt-2">Loading...</div></div> */}
                                        
                                            {load && 
                                                <div className="overlay"><i className="fas fa-3x fa-sync-alt fa-spin" /><div className="text-bold pt-2">Loading...</div></div>
                                            }
                                            {resp &&
                                                <div className="overlay">
                                                    <div className="alert alert-success alert-dismissible">
                                                        <button type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                                                        <h5><i className="icon fas fa-check"></i>Success!</h5>
                                                        Se enviaron los datos
                                                    </div>
                                                </div>
                                            }
                                            {respErro.erro &&
                                                <div className="overlay">
                                                    <div className="alert alert-danger alert-dismissible">
                                                        <button type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                                                        <h5><i className="icon fas fa-check"></i>Error!</h5>
                                                        <h3>No se pudo enviar los datos</h3>
                                                        {respErro.erro}
                                                    </div>
                                                </div>
                                            }
                                           
                                            <form onSubmit={handleSubmit}>                
                                                <div className="card-body">                                                              
                                                    <div className="form-group">
                                                        <label>Nombre {err.nombre && <code>{err.nombre}</code>}</label>
                                                        <input 
                                                        onChange={handleChange}
                                                        value={data.nombre}
                                                        name="nombre"
                                                        type="text" className="form-control" placeholder="Enter ..." />
                                                    </div>

                                                    <div className="form-group">
                                                        <label>Descripcion  {err.descripcion && <code>{err.descripcion}</code>}</label>
                                                        <textarea 
                                                        onChange={handleChange}
                                                        value={data.descripcion}
                                                        name="descripcion"
                                                        className="form-control" rows="3" placeholder="Enter ..."></textarea>
                                                    </div>
                                                </div> 
                                                <div className="d-flex">
                                                    <div className="mr-auto p-2">
                                                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                                    </div>
                                                    <div className="p-2">
                                                        <button type="submit" className="btn btn-primary">Registrar</button>
                                                    </div>
                                                </div> 
                                            </form>
                                      

                                    </div>
                                </div>
                            
                            </div>
                        </div>
                        {/* /.card */}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default FormInmunizaciones

