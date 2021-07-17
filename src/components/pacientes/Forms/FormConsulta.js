/* import {useForm} from 'react-hook-form'; */
import React, { useState } from 'react';
import RoutesConsultas from '../../../Routes/Consultas';
const form = {
    motivo:'',
    historiaDeLaEnf:''        
}
const form1 ={
    ta:'',
    fc:'',
    fr:'',
    sao:'',
    temp:'',
    r1:''
} 
function FormConsutla(props) {
    /* const { register, handleSubmit, reset, formState: { errors } } = useForm(); */
    const [data, setData] = useState(form);
    const [data1, setData1] = useState(form1);

    const [load, setLoad] = useState(false);
    const [err, setErr] = useState(form);
    const [erroResp, setErroResp] = useState({erro:''})
    const [resp, setResp] = useState(false);
    
    const handleChange = (e) => {
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
    const handleChange1 = (e) => {
        const {value, name} = e.target;
        setData1({
            ...data1,
            [name]:value
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
            setLoad(true);
            const datas = {
                motivo:data.motivo,
                enfermedadActual:data.historiaDeLaEnf,
                signosVitales:{
                    ta:data1.ta,
                    fc:data1.fc,
                    fr:data1.fr,
                    sao:data1.sao,
                    temp:{
                        temp:data1.temp,
                        r1:data1.r1
                    }                    
                }
            }
            const resp = await RoutesConsultas.CreateConsulta(datas, props.dataPaciente);            
            if(resp.data.success === false){
                setLoad(false);
                setErroResp({erro:resp.data.msg})
                setTimeout(()=>setErroResp({}), 5000)
            }else{
                setLoad(false);
                setResp(true);
                setData(form);
                setData1(form1);
                props.callList();
                setTimeout(()=>setResp(false), 5000)
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
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Motivo de Consulta {err.motivo && <code>{err.motivo}</code>}</label>
                        <textarea 
                        name="motivo" 
                        onChange={handleChange}                        
                        className="form-control" 
                        placeholder='Motivo de consulta' 
                        rows="5"
                        value={data.motivo}
                        ></textarea>
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Historia de la enfermedad actual {err.historiaDeLaEnf && <code>{err.historiaDeLaEnf}</code>}</label>
                        <textarea 
                        name="historiaDeLaEnf"
                        onChange={handleChange}                       
                        className="form-control"  
                        rows="5"
                        placeholder='Motivo de consulta' 
                        value={data.historiaDeLaEnf}
                        ></textarea>        
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail2">T.A. mmHg / Glasgow</label>                                
                                <textarea 
                                name="ta" 
                                onChange={handleChange1}
                                className="form-control"  
                                rows="2" 
                                value={data1.ta}
                                placeholder=" mmHg / Glasgow"></textarea>
                            </div>                            
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">F.R. C/min mg% Peso</label>
                                <textarea 
                                name="fr"
                                onChange={handleChange1}
                                className="form-control"  
                                rows="2" 
                                value={data1.fr}
                                placeholder="F.R. C/min mg% Peso"></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Temp. °C Aux. Rec. cm  IMC</label>          
                                <div className="form-group clearfix">
                                    <div className="icheck-primary d-inline">
                                        <input onChange={handleChange1} 
                                        type="radio" 
                                        id="radioPrimary1" 
                                        name="r1" 
                                        checked={data1.r1 ===  'aux'}
                                        value="aux" />
                                        <label htmlFor="radioPrimary1">
                                            Aux.
                                        </label>
                                    </div>
                                    <div className="icheck-primary d-inline">
                                        <input 
                                        onChange={handleChange1}
                                        type="radio" 
                                        id="radioPrimary2" 
                                        name="r1" 
                                        checked={data1.r1 ===  'rec'}
                                        value="rec" />
                                        <label htmlFor="radioPrimary2">
                                            Rec.
                                        </label>
                                    </div>                                    
                                </div>
                                                     
                                <textarea 
                                className="form-control" 
                                rows="2" 
                                onChange={handleChange1}
                                name='temp'
                                vale={data1.temp}
                                placeholder="Temp. °C Aux. Rec. cm  IMC"></textarea>
                            </div>

                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">F.C. lat/min / 15 Glicemia</label>
                                <textarea
                                className="form-control"  
                                rows="2" 
                                name="fc"
                                onChange={handleChange1}
                                value={data1.fc}
                                placeholder="F.C. lat/min / 15 Glicemia"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">SaO2 % Kg Talla</label>
                                <textarea 
                                className="form-control"  
                                rows="2"
                                name="sao"
                                onChange={handleChange1}
                                value={data1.sao} 
                                placeholder="SaO2 % Kg Talla"></textarea>
                            </div>
                            
                        </div>
                    </div>                    
                </div>
                {/* /.card-body */}
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                    <div className="p-2">
                        <button type="submit" className="btn btn-primary">Registrar</button>
                    </div>
                </div> 
            </form>

        </>
    );
}
export default FormConsutla;