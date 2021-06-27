/* import {useForm} from 'react-hook-form'; */
import React, { useState } from 'react';
const form = {
    motivo:'',
    enfermedadActual:'',
    enfermedadActual:{
        ta:'',
        fc:'',
        fr:'',
        sao:'',
        temp:{
            r:null,
            data:''
        }
    }
}
 
function FormConsutla(props) {
    /* const { register, handleSubmit, reset, formState: { errors } } = useForm(); */
    const [data, setData] = useState(form);
    const [load, setLoad] = useState(false);
    const [err, setErr] = useState(false);
    const [resp, setResp] = useState(false);
    
    const handleChange = (e) => {
        const {value, name} = e.target;
        console.log('value',value,' ','name',name );
    }

    return (
        <>
            <form>
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Motivo de Consulta</label>
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
                        <label htmlFor="exampleInputPassword1">Historia de la enfermedad actual</label>
                        <textarea 
                        name="enfermedadActual"
                        onChange={handleChange}
                        className="form-control"  
                        rows="5"
                        value={data.enfermedadActual}
                        ></textarea>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail2">T.A. mmHg / Glasgow</label>                                
                                <textarea 
                                name="ta" 
                                onChange={handleChange}
                                className="form-control"  
                                rows="2" 
                                value={data.enfermedadActual.ta}
                                placeholder=" mmHg / Glasgow"></textarea>
                            </div>                            
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">F.R. C/min mg% Peso</label>
                                <textarea 
                                name="fr"
                                onChange={handleChange}
                                className="form-control"  
                                rows="2" 
                                value={data.enfermedadActual.fr}
                                placeholder="F.R. C/min mg% Peso"></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Temp. °C Aux. Rec. cm  IMC</label>          
                                <div className="form-group clearfix">
                                    <div className="icheck-primary d-inline">
                                        <input type="radio" id="radioPrimary1" name="r1" defaultChecked />
                                            <label htmlFor="radioPrimary1">
                                                Aux.
                                            </label>
                                    </div>
                                    <div className="icheck-primary d-inline">
                                        <input type="radio" id="radioPrimary2" name="r1" />
                                            <label htmlFor="radioPrimary2">
                                                Rec.
                                            </label>
                                    </div>                                    
                                </div>
                                                     
                                <textarea className="form-control" rows="2" placeholder="Temp. °C Aux. Rec. cm  IMC"></textarea>
                            </div>

                        </div>
                        <div class="col-md-6">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">F.C. lat/min / 15 Glicemia</label>
                                <textarea className="form-control"  rows="2" placeholder="F.C. lat/min / 15 Glicemia"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">SaO2 % Kg Talla</label>
                                <textarea className="form-control"  rows="2" placeholder="SaO2 % Kg Talla"></textarea>
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