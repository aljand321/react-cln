import React, { useState } from 'react'
import RoutesExamenFisico from '../../../Routes/ExamenFisico';
const form = {
    cabeza:'',
    cuello:'',
    torax:'',
    pulmones:'',
    corazon:'',
    abdomen:'',
    ginecoUrinario:'',
    locomotor:'',
    neurologico:'',
    pielyFaneras:''
}
function FormExamenFisico(props) {
    const [data, setdata] = useState(form);
    const [load, setLoad] = useState(false);
    const [err, setErr] = useState(false);
    const [errResp, setErrResp] = useState({err:''});
    const [resp, setResp] = useState(false);
    
    const handleChange = (e) =>{
       const {value,name}=e.target;
        setdata({
            ...data,
            [name]:value
        });
    } 

    const onSubmit = async (e) =>{
        e.preventDefault();
        let existData =  false;
        for(const d in data){
            if(data[d]){
                existData = true;
            }
        }
        if(existData === true){
            setLoad(true);
            const resp = await RoutesExamenFisico.createExamenFisico(data,props.dataPaciente);
            if(resp.data.success === false ){
                setLoad(false);
                setErrResp({err:resp.data.msg})
                setTimeout(()=>setErrResp({err:''}),5000)
            }else{
                setLoad(false);
                setResp(true);
                setdata(form);
                props.call();
                setTimeout(()=>setResp(false), 3000);
            }
        }else{
            setErr(true)
            setTimeout(()=>setErr(false), 5000);
        }
    }
       

    return (
        <div>
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
            {errResp.erro &&
                <div className="overlay">
                    <div className="alert alert-danger alert-dismissible">
                        <button type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                        <h5><i className="icon fas fa-check"></i>Error!</h5>
                        <h3>No se pudo enviar los datos</h3>
                        {errResp.erro}
                    </div>
                </div>
            }
            {err && <label htmlFor="exampleInputBorder"><code>No se puede enviar vacio</code></label>}
            <form onSubmit={onSubmit}>
                <div className="card-body">  
                    <div className="form-group">
                        <div className="form-floating">
                            <textarea 
                            onChange={handleChange}
                            value={data.cabeza}
                            name="cabeza"
                            className="form-control" placeholder="Leave a comment here" style={{height: 120}}/>
                            <label htmlFor="floatingTextarea2">Cabeza: </label>
                        </div>
                        {/* {err.viveP && <label htmlFor="exampleInputBorder"><code>{err.viveP}</code></label>} */}
                    </div>
                    <div className="form-group">
                        <div className="form-floating">
                            <textarea 
                            onChange={handleChange}
                            value={data.cuello}
                            name="cuello"
                            className="form-control" placeholder="Leave a comment here" style={{height: 120}}/>
                            <label htmlFor="floatingTextarea2">Cuello: </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-floating">
                            <textarea 
                            onChange={handleChange}
                            value={data.torax}
                            name="torax"
                            className="form-control" placeholder="Leave a comment here" style={{height: 120}}/>
                            <label htmlFor="floatingTextarea2">Torax:</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-floating">
                            <textarea 
                            onChange={handleChange}
                            value={data.pulmones}
                            name="pulmones"
                            className="form-control" placeholder="Leave a comment here" style={{height: 120}}/>
                            <label htmlFor="floatingTextarea2">Pulmones:</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-floating">
                            <textarea 
                            onChange={handleChange}
                            value={data.corazon}
                            name="corazon"
                            className="form-control" placeholder="Leave a comment here" style={{height: 120}}/>
                            <label htmlFor="floatingTextarea2">Corazones:</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-floating">
                            <textarea 
                            onChange={handleChange}
                            value={data.abdomen}
                            name="abdomen"
                            className="form-control" placeholder="Leave a comment here" style={{height: 120}}/>
                            <label htmlFor="floatingTextarea2">Abdomen:</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-floating">
                            <textarea 
                            onChange={handleChange}
                            value={data.ginecoUrinario}
                            name="ginecoUrinario"
                            className="form-control" placeholder="Leave a comment here" style={{height: 120}}/>
                            <label htmlFor="floatingTextarea2">Gineco Urinario:</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-floating">
                            <textarea 
                            onChange={handleChange}
                            value={data.locomotor}
                            name="locomotor"
                            className="form-control" placeholder="Leave a comment here" style={{height: 120}}/>
                            <label htmlFor="floatingTextarea2">Locomotor:</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-floating">
                            <textarea 
                            onChange={handleChange}
                            value={data.neurologico}
                            name="neurologico"
                            className="form-control" placeholder="Leave a comment here" style={{height: 120}}/>
                            <label htmlFor="floatingTextarea2">Neurologico:</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-floating">
                            <textarea 
                            onChange={handleChange}
                            value={data.pielyFaneras}
                            name="pielyFaneras"
                            className="form-control" placeholder="Leave a comment here" style={{height: 120}}/>
                            <label htmlFor="floatingTextarea2">Piel y faneras:</label> 
                        </div>
                    </div>
                </div>
                {err && <label htmlFor="exampleInputBorder"><code>No se puede enviar vacio</code></label>}
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
    )
}

export default FormExamenFisico
