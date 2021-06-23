/* import {useForm} from 'react-hook-form'; */
function FormConsutla(props) {
    /* const { register, handleSubmit, reset, formState: { errors } } = useForm(); */
    return (
        <>
            <form>
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Motivo de Consulta</label>
                        <textarea class="form-control" placeholder='Motivo de consulta' rows="5"></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Historia de la enfermedad actual</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
                    </div>
                    <div className="form-group">                       
                
                        <div className="input-group">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">T.A. mmHg / Glasgow</label>                                
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="4" placeholder=" mmHg / Glasgow"></textarea>
                            </div>                            
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">F.C. lat/min / 15 Glicemia</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="4" placeholder="F.C. lat/min / 15 Glicemia"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">F.R. C/min mg% Peso</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="4" placeholder="F.R. C/min mg% Peso"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">SaO2 % Kg Talla</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="4" placeholder="SaO2 % Kg Talla"></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Temp. °C Aux. Rec. cm  IMC</label>
                                
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="4" placeholder="Temp. °C Aux. Rec. cm  IMC"></textarea>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" htmlFor="exampleCheck1">Aux.</label>
                                    
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" htmlFor="exampleCheck1">Rec.</label>
                                    
                                </div>

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