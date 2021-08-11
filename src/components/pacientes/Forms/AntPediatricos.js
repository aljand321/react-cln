import React,{ useState } from 'react';
import RoutesAntPediatricos from '../../../Routes/AntPediatricos';
const form = {
    pesoRn:'',
    tipodeParto:'',
    obsPerinatales:''
}
function FormAntPediatricos(props){
    const [data, setData] = useState(form);
    const [err, setErr] = useState(form);
    const [load, setLoad] = useState(false);    
    const [erroResp, setErroResp] = useState({erro:''})
    const [resp, setResp] = useState(false);
    
    const onChangeData =(e)=>{
        const {name,value} = e.target;
        setData({
            ...data,
            [name]:value
        });
        setErr({
            ...err,
            [name]:value.length === 0 ? 'Obligatorio' : ''
        })
    }
    const handelSubmit = async (e)=>{
        e.preventDefault();
        let arr = {}
        for(const i in data){
            if(!data[i]){
                arr[i] = 'Obligatorio'
            }
        }
        setErr(arr)
        if(Object.keys(arr).length === 0){
            try {
                setLoad(true)
                const resp = await RoutesAntPediatricos.createAntPadiatricos(data,props.dataPaciente);                
                if(resp.data.success === false){
                    setLoad(false);
                    setErroResp({msg:resp.data.msg})
                }else{
                    setLoad(false);
                    setResp(true);
                    setData(form);
                    props.call();
                    setTimeout(()=>{
                        setResp(false);
                    },1000);
                }
            } catch (error) {
                setErroResp({erro:'No se puede enviar los datos'})
            }
        }
    }
    return (
        <>
            {load && 
                <div className="overlay"><i className="fas fa-3x fa-sync-alt fa-spin" /><div className="text-bold pt-2">Loading...</div></div>
            }
            {resp &&
                <div className="overlay">
                    <div className="alert alert-success alert-dismissible">
                        <button type="button" onClick={()=> setResp(false)} className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                        <h5><i className="icon fas fa-check"></i>Success!</h5>
                        Se enviaron los datos
                    </div>
                </div>
            }
            {erroResp.erro &&
                <div className="overlay">
                    <div className="alert alert-danger alert-dismissible">
                        <button type="button" onClick={()=> setErroResp(false)} className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                        <h5><i className="icon fas fa-check"></i>Error!</h5>
                        <h3>No se pudo enviar los datos</h3>
                        {erroResp.erro}
                    </div>
                </div>
            }
            <div className="card card-primary">
                <div className="card-header">
                    <h3 className="card-title">Registrar Antecedente Pediatrico del paciente</h3>
                </div>               
                <form onSubmit={handelSubmit}>
                    <div className="card-body">                        
                        <div className="form-group">
                            <label htmlFor="exampleInputBorder">Peso RN. {err.pesoRn && <code>{err.pesoRn}</code>}</label>
                            <input
                            name="pesoRn" 
                            onChange={onChangeData}
                            value={data.pesoRn}
                            type="text" className="form-control form-control-border"  placeholder="Peso RN" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputBorderWidth2">Tipo de parto{err.tipodeParto && <code>{err.tipodeParto}</code>}</label>
                            <input 
                            name="tipodeParto"
                            onChange={onChangeData}
                            value={data.tipodeParto}
                            type="text" className="form-control form-control-border border-width-2"  placeholder="Tipo de parto" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputBorderWidth2">Observaciones Prenatales {err.obsPerinatales && <code>{err.obsPerinatales}</code>}</label>
                            <input 
                            name="obsPerinatales"
                            onChange={onChangeData}
                            value={data.obsPerinatales}
                            type="text" className="form-control form-control-border border-width-2"  placeholder="Obs. Prenatales" />
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
    );
}

export default FormAntPediatricos;