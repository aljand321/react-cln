import React, { useState } from 'react';
import RoutesAntFamiliares from '../../../Routes/AntFamilares';
const form ={
    viveP:'',
    estSaludP:'',
    causaP:'',

    viveM:'',
    estSaludM:'',
    causaM:'',

    hnos:'',
    numeros:'',
    viven:'',
    fallecidos:'',
    causa:'',
    estadoSalud:''
}

const validate = (data) =>{
    let err = {}
    if(!data.viveP){
        err.viveP = 'Selecione'
    }
    if(!data.viveM){
        err.viveM = 'Selecione'
    }
    if(!data.hnos){
        err.hnos = 'Selecione'
    }
    if(data.viveP === 'si'){       
        if(!data.estSaludP){
            err.estSaludP = 'Selecione'
        }
    }else{        
        if(!data.causaP){
            err.causaP = 'Obligatorio'
        }
    }
    if(data.viveM === 'si'){       
        if(!data.estSaludM){
            err.estSaludM = 'Selecione'
        }
    }else{        
        if(!data.causaM){
            err.causaM = 'Obligatorio'
        }
    }
    return err
}
function FormAntFml(props) {
    const [data, setData] = useState(form);
    const [err, setErr] = useState({});
    const [load, setLoad] = useState(false);    
    const [erroResp, setErroResp] = useState({erro:''})
    const [resp, setResp] = useState(false);
    
    const handleChange = (e) =>{
        const {value,name}= e.target;
        setData({
            ...data,
            [name]:value
        }) 
        if(name === 'numeros'){
            if(value.length === 0){
                setErr({numeros:"obligatorio"})
            }else{
                setErr({})   
                if(value <= 0){
                    setErr({numeros:"No puede ser menor a 0 o igual 0"})
                } else if(isNaN(value)){
                    setErr({numeros:'Solo se puede insertar numero'})
                }            
            }            
        }
        if(name === 'viven'){
            if(value.length === 0){
                setErr({viven:"obligatorio"})
            }else{                
                setErr({}) 
                if(value <= 0){
                    setErr({viven:"No puede ser menor a 0 o igual 0"})
                } else if(isNaN(value)){
                    setErr({viven:'Solo se puede insertar numero'})
                }else if(data['numeros'] < value){                
                    setErr({viven:'Hnos no puede ser menos a los que vien'})
                }            
            }  
        }             
          
    }
    const ondata = (e) =>{
        handleChange(e);
        setErr(validate(data))
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        let obj = {}

        if(!data.viveP){
            obj['viveP'] ='Selecione'
        }
        if(!data.viveM){
            obj['viveM'] ='Selecione'
        }
        if(!data.hnos){
            obj['hnos'] ='Selecione'
        }
       setErr(obj)

        if(Object.keys(obj).length === 0){
            let state = false
            if(data.viveP === 'si'){     
                if(data.estSaludP.length === 0) {
                    setErr({estSaludP:'Selecione'})   
                } 
                state = data.estSaludP.length === 0 ? true : false          
                
            }else{   
                if(data.causaP.length === 0){
                    setErr({causaP:'Obligatorio'})
                }               
                state= data.causaP.length === 0 ? true : false
            }

            if(data.viveM === 'si'){ 
                if(data.estSaludM.length === 0){
                    setErr({estSaludM:'Selecione'})  
                }                  
                state = data.estSaludM.length === 0 ? true : false
            }else{ 
                if(data.causaM.length === 0)  {
                    setErr({causaM:'Obligatorio'})
                }            
                state = data.causaM.length === 0 ? true : false
            }
            if(data.hnos === 'si'){
                const resp = validateHnos()
                console.log(resp,'resp')
                if(resp === false) {
                    state = true
                }else{
                    state = false
                }   
                
            }
            console.log(err)
            if(!state){
                console.log('se enviaron los datos')
                const body1 = {
                    padre:{
                        viveP:data.viveP,
                        estSaludP:data.viveP === 'si' ? data.estSaludP : '',
                        causaP:data.viveP === 'no' ? data.causaP : ''                         
                    },
                    madre:{ 
                        viveM:data.viveM,
                        estSaludM:data.viveM === 'si' ? data.estSaludM : '',
                        causaM:data.viveM === 'no' ? data.causaM : '',
                    },
                    hnos:{
                        hnos:data.hnos,
                        numeros:data.hnos === 'si' ? data.numeros : '',
                        viven:data.hnos === 'si' ? data.viven : '',
                        fallecidos:data.numeros > data.viven && data.hnos === 'si' ? data.numeros - data.viven : '',
                        causa:data.numeros > data.viven && data.hnos === 'si' ? data.causa : '',
                        estadoSalud:data.numeros === data.viven && data.viven && data.hnos === 'si' ? data.estadoSalud : ''
                    }
                }
                console.log(body1)
                setLoad(true);
                const resp = await RoutesAntFamiliares.createAntFml(body1,props.dataPaciente);
                console.log(resp.data,'me estoy tardando')
                if(resp.data.success === false){
                    setLoad(false);
                    setErroResp({erro:resp.data.msg});
                    setTimeout(()=>setErroResp({erro:''}), 5000);
                }else{
                    setLoad(false);
                    setResp(true);
                    setData(form);
                    props.call();
                    setTimeout(()=>setResp(false),5000);
                }
            }
            
        }
        
        
    }
    function validateHnos() {
        if(!data.numeros || !data.viven){
            if(!data.numeros){
                setErr({numeros:'Es obligatorio'})
            }else
            if(!data.viven){
                setErr({viven:'Es obligatorio'})
            }
            return false;
        }else{  
            if (data.numeros > data.viven){
                if (!data.causa){
                    setErr({causa:'Es obligatorio'})
                    return false;
                }
                setErr({})
                return true;
            } 
            if(data.numeros === data.viven){
                if(!data.estadoSalud){
                    setErr({estadoSalud:'Seleccione'})
                    return false;
                }
                setErr({})
                return true;
            }        
            
        }
        if(data.numeros < data.viven){
            setErr({viven:'Hnos no puede ser menos a los que vien'})
            
            return false;
        }        
        setErr({})
        return true
    }
    return (
        <>
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
            {erroResp.erro &&
                <div className="overlay">
                    <div className="alert alert-danger alert-dismissible">
                        <button type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                        <h5><i className="icon fas fa-check"></i>Error!</h5>
                        <h3>No se pudo enviar los datos</h3>
                        {erroResp.erro}
                    </div>
                </div>
            }
            <div className="card card-primary">
                <div className="card-header">
                    <h3 className="card-title">Registrar Antecedente Familiares</h3>
                </div>
                <form onSubmit={handleSubmit}>                
                    <div className="card-body">   
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="radioPrimary1">Padre Vive {err.viveP && <label htmlFor="exampleInputBorder"><code>{err.viveP}</code></label>}</label>
                                <div className="form-group clearfix">                            
                                    <div className="form-check d-inline">
                                        <input 
                                        onBlur={ondata}
                                        onChange={handleChange} 
                                        checked={data.viveP === 'si'} 
                                        value="si"
                                        className="form-check-input" type="radio"  name="viveP" />
                                        <label htmlFor="radioPrimary1">Si
                                        </label>
                                    </div>
                                    <div className="form-check d-inline">
                                        <input 
                                        onBlur={ondata}
                                        onChange={handleChange} 
                                        checked={data.viveP === 'no'} 
                                        value="no"
                                        className="form-check-input" type="radio" name="viveP" />
                                        <label htmlFor="radioPrimary2">No
                                        </label>
                                    </div>
                                    
                                </div>  
                            </div>
                            {data.viveP === 'si' && 
                                <div className="col-6">        
                                    <label htmlFor="radioPrimary1">Estado de salud {err.estSaludP && <label htmlFor="exampleInputBorder"><code>{err.estSaludP}</code></label>}</label>
                                    <div className="form-group clearfix">                            
                                        <div className="form-check d-inline">
                                            <input 
                                            onBlur={ondata}
                                            onChange={handleChange} 
                                            checked={data.estSaludP === 'bueno'} 
                                            value="bueno"
                                            className="form-check-input" 
                                            type="radio"  name="estSaludP" />
                                            <label htmlFor="radioPrimary1">Bueno
                                            </label>
                                        </div>
                                        <div className="form-check d-inline">
                                            <input 
                                            onBlur={ondata}
                                            onChange={handleChange} 
                                            checked={data.estSaludP === 'regular'} 
                                            value="regular"
                                            className="form-check-input" type="radio" name="estSaludP" />
                                            <label htmlFor="radioPrimary2">Regular
                                            </label>
                                        </div>
                                        <div className="form-check d-inline">
                                            <input 
                                            onBlur={ondata}
                                            onChange={handleChange} 
                                            checked={data.estSaludP === 'malo'} 
                                            value="malo"
                                            className="form-check-input" type="radio"  name="estSaludP" />
                                            <label htmlFor="radioPrimary2">Malo
                                            </label>
                                        </div>                            
                                    </div> 
                                </div> 
                            }
                                  
                        </div>
                        {data.viveP === 'no' &&
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Fallecio Causa: {err.causaP && <label htmlFor="exampleInputBorder"><code>{err.causaP}</code></label>}</label>
                                <input 
                                onBlur={ondata}
                                onChange={handleChange}                            
                                value={data.causaP}
                                name='causaP' type="text" className="form-control"/>
                            </div>
                        }               
                        
                        <div className="row">
                            <div className="col-6">
                                <label htmlFor="radioPrimary1">Madre Vive {err.viveM && <label htmlFor="exampleInputBorder"><code>{err.viveM}</code></label>}</label>
                                <div className="form-group clearfix">                            
                                    <div className="form-check d-inline">
                                        <input 
                                        onBlur={ondata}
                                        onChange={handleChange} 
                                        checked={data.viveM === 'si'} 
                                        value="si"
                                        className="form-check-input" type="radio"  name="viveM" />
                                        <label htmlFor="radioPrimary1">Si
                                        </label>
                                    </div>
                                    <div className="form-check d-inline">
                                        <input 
                                        onBlur={ondata}
                                        onChange={handleChange} 
                                        checked={data.viveM === 'no'} 
                                        value="no"
                                        className="form-check-input" type="radio" name="viveM" />
                                        <label htmlFor="radioPrimary2">No
                                        </label>
                                    </div>
                                    
                                </div>  
                            </div>
                            {data.viveM === 'si' && 
                                <div className="col-6">
                                    <label htmlFor="radioPrimary1">Estado de salud {err.estSaludM && <label htmlFor="exampleInputBorder"><code>{err.estSaludM}</code></label>}</label>
                                    <div className="form-group clearfix">                            
                                        <div className="form-check d-inline">
                                            <input 
                                            onBlur={ondata}
                                            onChange={handleChange} 
                                            checked={data.estSaludM === 'bueno'} 
                                            value="bueno"
                                            className="form-check-input" type="radio"  name="estSaludM" />
                                            <label htmlFor="radioPrimary1">Bueno
                                            </label>
                                        </div>
                                        <div className="form-check d-inline">
                                            <input 
                                            onBlur={ondata}
                                            onChange={handleChange} 
                                            checked={data.estSaludM === 'regular'} 
                                            value="regular"
                                            className="form-check-input" type="radio" name="estSaludM" />
                                            <label htmlFor="radioPrimary2">Regular
                                            </label>
                                        </div>
                                        <div className="form-check d-inline">
                                            <input 
                                            onBlur={ondata}
                                            onChange={handleChange} 
                                            checked={data.estSaludM === 'malo'} 
                                            value="malo"className="form-check-input" type="radio"  name="estSaludM" />
                                            <label htmlFor="radioPrimary2">Malo
                                            </label>
                                        </div>                            
                                    </div>  
                                </div>
                            }
                            
                        </div>
                        {data.viveM === 'no' &&
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Fallecio Causa: {err.causaM && <label htmlFor="exampleInputBorder"><code>{err.causaM}</code></label>}</label>
                                <input
                                onBlur={ondata}
                                onChange={handleChange}                            
                                value={data.causaM}
                                name="causaM"
                                type="text" className="form-control"   />
                            </div>
                        }                        

                        <div className="row">
                            <div className="col-12">
                                <label htmlFor="radioPrimary1">Hnos. {err.hnos && <label htmlFor="exampleInputBorder"><code>{err.hnos}</code></label>}</label>
                                <div className="form-group clearfix">                            
                                    <div className="form-check d-inline">
                                        <input 
                                        onBlur={ondata}
                                        onChange={handleChange} 
                                        checked={data.hnos === 'si'} 
                                        value="si"
                                        className="form-check-input" type="radio"  name="hnos" />
                                        <label htmlFor="radioPrimary1">Si
                                        </label>
                                    </div>
                                    <div className="form-check d-inline">
                                        <input 
                                        onBlur={ondata}
                                        onChange={handleChange} 
                                        checked={data.hnos === 'no'} 
                                        value="no"
                                        className="form-check-input" type="radio" name="hnos" />
                                        <label htmlFor="radioPrimary2">No
                                        </label>
                                    </div>
                                    
                                </div>  
                            </div>
                            {data.hnos === 'si' && 
                                <>
                                    <div className="col-3">
                                        <label htmlFor="exampleInputEmail1"> Hnos N° {err.numeros && <label htmlFor="exampleInputBorder"><code>{err.numeros}</code></label>}</label>
                                        <input                                        
                                        onChange={handleChange}
                                        value={data.numeros}
                                        name="numeros"
                                        type="text" className="form-control" placeholder=".col-3" />
                                    </div>
                                    {data.numeros && 
                                        <div className="col-3">
                                            <label htmlFor="exampleInputEmail1"> Viven: {err.viven && <label htmlFor="exampleInputBorder"><code>{err.viven}</code></label>}</label>
                                            <input                                             
                                            onChange={handleChange}
                                            value={data.viven}
                                            name="viven"
                                            type="text" className="form-control" placeholder=".col-4" />
                                        </div>
                                    }
                                    {data.numeros > data.viven &&
                                        <>
                                            <div className="col-3">
                                                <label htmlFor="exampleInputEmail1"> Fallecidos:</label>
                                                <input                                                
                                                value={data.numeros - data.viven}
                                                type="text" className="form-control" placeholder=".col-5" disabled/>
                                            </div>
                                            <div className="col-3">
                                                <label htmlFor="exampleInputEmail1"> Causa: {err.causa && <label htmlFor="exampleInputBorder"><code>{err.causa}</code></label>}</label>
                                                <input                                             
                                                onChange={handleChange}
                                                value={data.causa}
                                                name="causa"
                                                type="text" className="form-control" placeholder=".col-5" />
                                            </div>
                                        </>
                                    }
                                </>
                            }
                        </div>                   
                        {data.numeros === data.viven && data.viven && data.hnos === 'si' && 
                            <>
                                <label htmlFor="radioPrimary1">Estado de salud {err.estadoSalud && <label htmlFor="exampleInputBorder"><code>{err.estadoSalud}</code></label>}</label>
                                <div className="form-group clearfix">
                                    
                                    <div className="form-check d-inline">
                                        <input 
                                        
                                        onChange={handleChange} 
                                        checked={data.estadoSalud === 'bueno'} 
                                        value="bueno"
                                        className="form-check-input" type="radio"  name="estadoSalud" />
                                        <label htmlFor="radioPrimary1">Bueno
                                        </label>
                                    </div>
                                    <div className="form-check d-inline">
                                        <input 
                                        
                                        onChange={handleChange} 
                                        checked={data.estadoSalud === 'regular'} 
                                        value="regular"
                                        className="form-check-input" type="radio" name="estadoSalud" />
                                        <label htmlFor="radioPrimary2">Regular
                                        </label>
                                    </div>
                                    <div className="form-check d-inline">
                                        <input 
                                        
                                        onChange={handleChange} 
                                        checked={data.estadoSalud === 'mala'} 
                                        value="mala"
                                        className="form-check-input" type="radio"  name="estadoSalud" />
                                        <label htmlFor="radioPrimary2">Mala
                                        </label>
                                    </div>                            
                                </div>
                            </> 
                        }
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
        </>
    )
}

export default FormAntFml
