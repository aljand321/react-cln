import React, { useState } from 'react'
import RoutesAntGncObst from '../../../Routes/AntGncObst';
const form ={
    ritmo:'',
    fum:'',
    gesta:'',
    partos:'',
    cesarea:'',
    abortos:'',
    plfcFamiliar:''
}
function FormAntGncObs(props) {
    const [data, setData] = useState(form);   
    const [err, setErr] = useState(form);
    const [respErr, setRespErr] = useState({erro:''});
    const [load, setLoad] = useState(false);
    const [reps, setReps] = useState(false);

    const onChange = (e) =>{
        const { name,value } = e.target;

        setData({
            ...data,
            [name]:value
        });
        setErr({
            ...err,
            [name]:value.length === 0 ? 'Obligatorio' : ''
        })
        
    }
    
    const onSubmit = async (e) =>{
        e.preventDefault();
        let arr = {}
        for(const d in data){
            if(!data[d]){
                arr[d] = 'Obligatorio'
            }
        }
        
        setErr(arr)
        if(Object.keys(arr).length === 0){           
            setLoad(true);
            const resp = await RoutesAntGncObst.createAntGncObst(data, props.dataPaciente);
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
                                <label>Ritmo {err.ritmo &&<code>{err.ritmo}</code>}</label>
                                <input
                                onChange={onChange}
                                value={data.ritmo}
                                name="ritmo"
                                type="text" className="form-control" placeholder="Ritmo" />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>FUM. {err.fum &&<code>{err.fum}</code>}</label>
                                <input
                                onChange={onChange}
                                value={data.fum}
                                name="fum"
                                type="date" className="form-control" />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Gesta {err.gesta &&<code>{err.gesta}</code>}</label>
                                <input
                                onChange={onChange}
                                value={data.gesta}
                                name="gesta"
                                type="text" className="form-control" placeholder="Gesta" />
                            </div>
                        </div>
                        <div className="col-sm-6">                               
                            <div className="form-group">
                                <label>Partos</label>
                                <input
                                onChange={onChange}
                                value={data.partos}
                                name="partos"
                                type="text" className="form-control" placeholder="Partos" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Cesárea {err.cesarea &&<code>{err.cesarea}</code>}</label>
                                <input
                                onChange={onChange}
                                value={data.cesarea}
                                name="cesarea"
                                type="text" className="form-control" placeholder="Cesárea" />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Abortos {err.abortos &&<code>{err.abortos}</code>}</label>
                                <input
                                onChange={onChange}
                                value={data.abortos}
                                name="abortos"
                                type="text" className="form-control" placeholder="Abortos" />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>Metodos de planificacion familiar {err.plfcFamiliar &&<code>{err.plfcFamiliar}</code>}</label>
                                <input
                                onChange={onChange}
                                value={data.plfcFamiliar}
                                name="plfcFamiliar"
                                type="text" className="form-control" placeholder="Metodos de planificacion familiar" />
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
