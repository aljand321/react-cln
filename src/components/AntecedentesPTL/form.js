import React, {useState,useEffect} from 'react';

function FormANTPTL (props){
    const [disabled,setDisabled] = useState(true);
    const [disableDescription,setDisableDescription]= useState(true);
    useEffect(()=>{
        function disableData(){
            setDisabled(true);
            setDisableDescription(true);
        }
        disableData();
    },[props.resp, props.select])

    const setDataNombre = (name)=>{        
        props.actualizar(name);
    }
    return(
        <>
            {props.load && 
                <div className="overlay"><i className="fas fa-3x fa-sync-alt fa-spin" /><div className="text-bold pt-2">Loading...</div></div>
            }
            {props.resp.success &&
                <div className="overlay">
                    <div className="alert alert-success alert-dismissible">
                        <button type="button" onClick={()=>props.setR({success:false,msg:""})} className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                        <h5><i className="icon fas fa-check"></i>Genial!</h5>
                        <h3>{props.resp.msg}</h3>                                
                    </div>
                </div>
            }
            {props.erroResp &&
                <div className="overlay">
                    <div className="alert alert-danger alert-dismissible">
                        <button type="button" onClick={()=>props.setErroR(false)} className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                        <h5><i className="icon fas fa-check"></i>Error!</h5>
                        <h3>No se puede enviar los datos</h3>
                        erro 500
                    </div>
                </div>
            }
            <div className="card-body">
                <form onSubmit={props.handleSubmit}>
                    <div className="form-group">
                        
                        <div className="d-flex">
                            <div className="mr-auto p-2">
                                <label>Nombre {props.error.nombre && <code>{props.error.nombre}</code>}</label>
                            </div>
                            <div className="p-2">
                                {props.isUpdate && <div className="btn-group btn-group-sm">
                                    {disabled === true && <div onClick={() => setDisabled(false)} className="btn btn-default"><i className="fas fa-edit" /></div>}  
                                    {disabled === false &&<div onClick={()=> setDataNombre('nombre')} className="btn btn-default"><i className="fas fa-save" /></div> }                                                        
                                </div>}

                            </div>
                        </div>
                        <input 
                        disabled={props.isUpdate ? disabled : false}
                        name="nombre"
                        onChange={props.isUpdate ? props.changeUpdate : props.handleChange}
                        value={props.value.nombre}
                        type="text" className="form-control" placeholder="Nombre" />
                    </div>
                    <div className="form-group">
                        
                        <div className="d-flex">
                            <div className="mr-auto p-2">
                                <label>Descripcion {props.error.descripcion && <code>{props.error.descripcion}</code>} </label>
                            </div>
                            <div className="p-2">
                                {props.isUpdate && <div className="btn-group btn-group-sm">
                                    {disableDescription === true && <div onClick={() => setDisableDescription(false)} className="btn btn-default"><i className="fas fa-edit" /></div>}  
                                    {disableDescription === false &&<div onClick={()=> setDataNombre("descripcion")} className="btn btn-default"><i className="fas fa-save" /></div> }                                                        
                                </div>}

                            </div>
                        </div>
                        <textarea 
                        disabled={props.isUpdate ? disableDescription : false}
                        name="descripcion"
                        onChange={props.isUpdate ? props.changeUpdate : props.handleChange}
                        value={props.value.descripcion}
                        className="form-control" rows={5} placeholder="Descripcion" />
                    </div>
                    <div className="d-flex">
                        <div className="mr-auto p-2">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                        <div className="p-2">
                            {!props.isUpdate &&                               
                                <button type="submit" className="btn btn-primary">Registrar</button>
                            }
                        </div>
                    </div>
                </form>                
            </div>
        </>
    );
}

export default FormANTPTL;