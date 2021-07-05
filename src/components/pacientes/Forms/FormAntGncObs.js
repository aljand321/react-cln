import React, { useState } from 'react'
import RoutesAntGncObst from '../../../Routes/AntGncObst';
const form ={
    menarca:'',
    ritmo:'',
    gestaCesaria:'',
    abortos:'',
    nacidoVivos:'',
    mortinatos:'',
    plfcFamiliar:''
}
const formDatas= {
    fmu:'',
    fecha:''
    
}
function FormAntGncObs(props) {
    const [data, setData] = useState(form);
    const [data1, setdata1] = useState(formDatas);
    const [respErr, setRespErr] = useState({erro:''});
    const [load, setLoad] = useState(false);
    const [reps, setReps] = useState(false);

    const onChange = (e) =>{
        const { name,value } = e.target;

        setData({
            ...data,
            [name]:value
        })
    }
    const onchange1 = (e) =>{
        const {name,value}= e.target;
        setdata1({
            ...data1,
            [name]:value
        })
    }
    const onSubmit = async (e) =>{
        e.preventDefault();
        let erro = false;
        for(const d in data){
            if(!data[d]){
                erro=true;
            }
        }
        if(erro === false){
            const body = {
                menarca:data.menarca,
                ritmo:data.ritmo,
                gestaCesaria:data.gestaCesaria,
                abortos:data.abortos,
                nacidoVivos:data.nacidoVivos,
                mortinatos:data.mortinatos,
                plfcFamiliar:data.plfcFamiliar,
                fmu:data1.fmu ? data1.fmu : '----',
                fecha:data1.fecha ? data1.fecha : '----'
            }
            setLoad(true);
            const resp = await RoutesAntGncObst.createAntGncObst(body, props.dataPaciente);
            console.log(resp.data, ' estp es lo que quiero ver')
            if(resp.data.success === false){
                setLoad(false);
                setRespErr({erro:resp.data.msg})
                setTimeout(()=>setRespErr({erro:''}),5000)
            }else{
                setLoad(false);
                setReps(true);
                setData(form);
                props.call();
                setTimeout(()=>setReps(false),3000)
            }
        }
    }
    
    return (
        <>  
            {load && 
                <div className="overlay"><i className="fas fa-3x fa-sync-alt fa-spin" /><div className="text-bold pt-2">Loading...</div></div>
            }
            {reps &&
                <div className="overlay">
                    <div className="alert alert-success alert-dismissible">
                        <button type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                        <h5><i className="icon fas fa-check"></i>Success!</h5>
                        Se enviaron los datos
                    </div>
                </div>
            }
            {respErr.erro &&
                <div className="overlay">
                    <div className="alert alert-danger alert-dismissible">
                        <button type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                        <h5><i className="icon fas fa-check"></i>Error!</h5>
                        <h3>No se pudo enviar los datos</h3>
                        {respErr.erro}
                    </div>
                </div>
            }                                      
            <div className="card-body">
                <form onSubmit={onSubmit}>
                    <div className="row">
                        <div className="col-sm-6">                               
                            <div className="form-group">
                                <label>Menarca {!data.menarca &&<code>Obligatorio</code>}</label>
                                <input
                                onChange={onChange} 
                                value={data.menarca}
                                name="menarca" 
                                type="number" className="form-control" placeholder="......Años" />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Ritmo {!data.ritmo &&<code>Obligatorio</code>}</label>
                                <input
                                onChange={onChange} 
                                value={data.ritmo}
                                name="ritmo"  
                                type="text" className="form-control" placeholder="....../......." />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">                               
                            <div className="form-group">
                                <label>FMU</label>
                                <input
                                onChange={onchange1} 
                                value={data1.fmu}
                                name="fmu"  
                                type="date" className="form-control" placeholder="" />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Gesta para Cesárea {!data.gestaCesaria &&<code>Obligatorio</code>}</label>
                                <input
                                onChange={onChange} 
                                value={data.gestaCesaria}
                                name="gestaCesaria"  
                                type="text" className="form-control" placeholder="" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">                               
                            <div className="form-group">
                                <label>Abortos {!data.abortos &&<code>Obligatorio</code>}</label>
                                <input
                                onChange={onChange} 
                                value={data.abortos}
                                name="abortos"  
                                type="text" className="form-control" placeholder="" />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Nacidos Vivos {!data.nacidoVivos &&<code>Obligatorio</code>}</label>
                                <input
                                onChange={onChange} 
                                value={data.nacidoVivos}
                                name="nacidoVivos"  
                                type="number" className="form-control" placeholder="" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">                               
                            <div className="form-group">
                                <label>Mortinatos {!data.mortinatos &&<code>Obligatorio</code>}</label>
                                <input
                                onChange={onChange} 
                                value={data.mortinatos}
                                name="mortinatos"  
                                type="number" className="form-control" placeholder="" />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Metodos de Planificación Familiar {!data.plfcFamiliar &&<code>Obligatorio</code>}</label>
                                <input
                                onChange={onChange} 
                                value={data.plfcFamiliar}
                                name="plfcFamiliar"  
                                type="text" className="form-control" placeholder="" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">                               
                            <div className="form-group">
                                <label>Fecha</label>
                                <input
                                onChange={onchange1} 
                                value={data1.fecha}
                                name="fecha"  
                                type="date" className="form-control" placeholder="" />
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

export default FormAntGncObs
