import React, { useState } from 'react';
import RoutesAntNoPtl from '../../../Routes/AntNoPtl';
const form = {
    instruccion:'',
    fuma:'',  

    bebe:'',
    alimentacion:''

}
const dataF ={
    diaF:'',
    desdeF:'',
}
const dataB ={
    diaB:'',
    desdeB:'',
}
function FormAntNoPatl(props) {
    const [data, setData] = useState(form);
    const [err, setErr] = useState({});
    const [f, setf] = useState(dataF);
    const [b, setB] = useState(dataB);
    const [errF, seterrF] = useState({});
    const [errB, seterrB] = useState({})
    const [load, setLoad] = useState(false);    
    const [erroResp, setErroResp] = useState({erro:''})
    const [resp, setResp] = useState(false);
    
    const handleChange1 = (e) => {        
        const {value, name} = e.target;
        setData({
            ...data,
            [name]:value
        })  
        setErr({
            ...err,
            [name]:value.length === 0 ? 'Obligatorio' : ''
        })             
    }
    const changeF =(e) =>{
        const {value, name} = e.target;        
        setf({
            ...f,
            [name]:value
        }) 
        seterrF({
            ...errF,
            [name]:value.length === 0 ? 'Obligatorio' : ''
        });
    }
    const changeb =(e) =>{
        const {value, name} = e.target;      
        setB({
            ...b,
            [name]:value
        }) 
        seterrB({
            ...errB,
            [name]:value.length === 0 ? 'Obligatorio' : ''
        })
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        let obj = {}
        for(const p in data){
            if(!data[p]){
                obj[p] = `obligatorio`
            }
        }
        setTimeout(() => setErr(obj),100);
                
        if(Object.keys(obj).length === 0){
            
            if (data.fuma === 'si'){
                const respF = await validateF()                
                if(respF === false) return;
            }
            if(data.bebe === 'si'){                
                const respB = await validateB();
                if (!respB)return;
            }
            const form1 = {
                instruccion:data.instruccion,
                fuma:{
                    fuma:data.fuma,
                    diaF:data.fuma === 'si' ? f.diaF : '',
                    desdeF:data.fuma === 'si' ? f.desdeF:''
                },
                bebe:{
                    bebe:data.bebe,
                    diaB:data.bebe === 'si' ? b.diaB : '',
                    desdeB:data.bebe === 'si' ? b.desdeB : ''
                },
                alimentacion:data.alimentacion
            } 
            setLoad(true);
            const resp = await RoutesAntNoPtl.createAntNoPatologicos(form1,props.dataPaciente)
          
            if(resp.data.success === false){
                setLoad(false);
                setErroResp({erro:resp.data.msg});
                setTimeout(()=> setErroResp({}), 5000)
            }else{
                setLoad(false);
                setResp(true);
                setData(form);
                setf(dataF);
                setB(dataB);
                setTimeout(()=>setResp(false), 3000);
                props.call();
            }
        }
        

    } 
    
    const validateF = () => {       
        let objF = {}
        for(const p in f){
            if(!f[p]){
                objF[p] = `obligatorio`
            }
        }
        setTimeout(() => seterrF(objF),100);
        if(Object.keys(objF).length === 0){
            return true
        }
        console.log(objF,'sdf')
        return false
    }
    function validateB() {
        let obj = {}
        for(const p in b){
            if(!b[p]){
                obj[p] = `obligatorio`
            }
        }
        setTimeout(() => seterrB(obj),100);
        if(Object.keys(obj).length === 0){
            return true
        }
        return false
    }
    return (
        <>
            <div className="card card-primary">
                <div className="card-header">
                    <h3 className="card-title">Registrar Antecedente no patologico</h3>
                </div>
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
                <form onSubmit={handleSubmit}>                
                    <div className="card-body">                    
                        <label htmlFor="radioPrimary1">Instrucción  {err.instruccion && <label htmlFor="exampleInputBorder"><code>{err.instruccion}</code></label>}</label>
                        <div className="form-group clearfix">
                           
                                <div className="form-check d-inline">
                                <input
                                     
                                    className="form-check-input"
                                    onChange={handleChange1} 
                                    id="radioPrimary3" 
                                    type="radio" 
                                    checked={data.instruccion === 'primaria'}  
                                    name="instruccion" 
                                    value="primaria"
                                    
                                    />
                            
                                    <label htmlFor="radioPrimary1">Primaria
                                    </label>
                                </div>
                                <div className="form-check d-inline">
                                    <input 
                                      
                                    className="form-check-input"  
                                    id="flexRadioDefault2" onChange={handleChange1}    
                                    type="radio" checked={data.instruccion === 'secundaria'} name="instruccion" value="secundaria"/>
                                    <label htmlFor="radioPrimary2">Secundaria
                                    </label>
                                </div>
                                <div className="form-check d-inline">
                                    <input 
                                      
                                    className="form-check-input"  
                                    id="flexRadioDefault3" 
                                    onChange={handleChange1} type="radio" checked={data.instruccion === 'tecnico'} name="instruccion" value="tecnico" />
                                    <label htmlFor="radioPrimary2">Tecnico
                                    </label>
                                </div>
                                <div className="form-check d-inline">
                                    <input   
                                    className="form-check-input"  id="flexRadioDefault4" onChange={handleChange1}  type="radio" checked={data.instruccion === 'profecional'} name="instruccion" value="profecional"/>
                                    <label htmlFor="radioPrimary2">Profecional
                                    </label>
                                </div>
                        </div>                   
                         
                        <div className="row">
                            <div className="col-sm-4">                            
                                <label htmlFor="radioPrimary1"> Fuma {err.fuma && <label htmlFor="exampleInputBorder"><code>{err.fuma}</code></label>} </label>                         
                                <div className="form-group clearfix">                                
                                                        
                                    <div className="form-check d-inline">
                                        <input 
                                         
                                        onChange={handleChange1}
                                        value="si"
                                        name="fuma"
                                        checked={data.fuma === 'si'}
                                        className="form-check-input" type="radio"/>
                                        <label htmlFor="radioPrimary1"> Si
                                        </label>
                                    </div>
                                    <div className="form-check d-inline">
                                        <input 
                                         
                                        onChange={handleChange1}
                                        value="no"
                                        name="fuma"
                                        checked={data.fuma === 'no'}
                                        className="form-check-input" type="radio"  />
                                        <label htmlFor="radioPrimary2">No
                                        </label>
                                    </div>                                
                                </div>
                            </div>
                            
                            {data.fuma === 'si' && 
                                <div className="col-4">
                                    <label htmlFor="radioPrimary1"> Dia {errF.diaF && <label htmlFor="exampleInputBorder"><code>{errF.diaF}</code></label>} </label>
                                    <input  
                                                             
                                    onChange={changeF}
                                    name="diaF" 
                                    value={f.diaF}
                                    type="text" className="form-control" placeholder="Cigarrillos por dia" />                            
                                </div>
                            }
                            {data.fuma === 'si' && 
                                <div className="col-4">
                                    <label htmlFor="radioPrimary1"> Desde hace {errF.desdeF && <label htmlFor="exampleInputBorder"><code>{errF.desdeF}</code></label>} </label>
                                    <input  
                                                                 
                                    onChange={changeF}
                                    name="desdeF" 
                                    value={f.desdeF}                                
                                    type="text" className="form-control" placeholder="Durante cuantos años" />

                                </div>
                            }
                            
                        </div>
                        <div className="row">
                            <div className="col-sm-4">
                            
                                <label htmlFor="radioPrimary1"> Bebe {err.bebe && <label htmlFor="exampleInputBorder"><code>{err.bebe}</code></label>} </label>                         
                                <div className="form-group clearfix">                                
                                                        
                                    <div className="form-check d-inline">
                                        <input 
                                         
                                        onChange={handleChange1}
                                        value="si"
                                        name="bebe"
                                        checked={data.bebe === 'si'}
                                        className="form-check-input" type="radio" />
                                        <label htmlFor="radioPrimary1"> Si
                                        </label>
                                    </div>
                                    <div className="form-check d-inline">
                                        <input 
                                         
                                        onChange={handleChange1}
                                        value="no"
                                        name="bebe"
                                        checked={data.bebe === 'no'}
                                        className="form-check-input" type="radio" />
                                        <label htmlFor="radioPrimary2">No
                                        </label>
                                    </div>                                
                                </div>
                            </div>
                            {data.bebe === 'si' && 
                                <div className="col-4">
                                    <label htmlFor="radioPrimary1"> Dias {errB.diaB && <label htmlFor="exampleInputBorder"><code>{errB.diaB}</code></label>}  </label>
                                    <input 
                                       
                                    onChange={changeb}
                                    name="diaB" 
                                    value={b.diaB}
                                    type="text" className="form-control" placeholder="A la semana" />                            
                                </div>
                            }
                            {data.bebe === 'si' && 
                                <div className="col-4">
                                    <label htmlFor="radioPrimary1"> Desde hace {errB.desdeB && <label htmlFor="exampleInputBorder"><code>{errB.desdeB}</code></label>} </label>
                                    <input 
                                   
                                    onChange={changeb}
                                    name="desdeB" 
                                    value={b.desdeB}
                                    type="text" className="form-control" placeholder="Durante cuantos años" />
                                </div>
                            }
                        </div>
                        <label htmlFor="radioPrimary1">Alimentacion {err.alimentacion && <label htmlFor="exampleInputBorder"><code>{err.alimentacion}</code></label>}</label>
                        <div className="form-group clearfix">
                            
                            <div className="form-check d-inline">
                                <input 
                                 
                                onChange={handleChange1}
                                value="mala"
                                name="alimentacion"
                                checked={data.alimentacion === 'mala'}
                                className="form-check-input" type="radio"   />
                                <label htmlFor="radioPrimary1">Mala
                                </label>
                            </div>
                            <div className="form-check d-inline">
                                <input 
                                 
                                onChange={handleChange1}
                                value="regular"
                                name="alimentacion"
                                checked={data.alimentacion === 'regular'}
                                className="form-check-input" type="radio" />
                                <label htmlFor="radioPrimary2">Regular
                                </label>
                            </div>
                            <div className="form-check d-inline">
                                <input
                                 
                                onChange={handleChange1}
                                value="buena"
                                name="alimentacion"
                                checked={data.alimentacion === 'buena'} 
                                className="form-check-input" type="radio" />
                                <label htmlFor="radioPrimary2">Buena
                                </label>
                            </div>
                            <div className="form-check d-inline">
                                <input 
                                 
                                onChange={handleChange1}
                                value="exelente"
                                name="alimentacion"
                                checked={data.alimentacion === 'exelente'}
                                className="form-check-input" type="radio" />
                                <label htmlFor="radioPrimary2">Exelente
                                </label>
                            </div>
                            
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

        </>
    )
}

export default FormAntNoPatl;
