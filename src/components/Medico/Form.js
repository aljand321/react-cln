
import React, { useState } from 'react';
import {useForm} from 'react-hook-form';
import MedicoRoutes from '../../Routes/Medico';

const data = {
    cargo:'',    
};

function FormMed (props){
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [dataVerify, setdataVerify] = useState(data);
    const [err, setErr] = useState({});
    const [loading, setLoading] = useState(false);
    const [respErro, setRespErro] = useState(false);
    const [response, setResp] = useState(false);
    
    const onsubmit = async (data) => {
           
        try {
            if(err.cargo === 'Obligatorio' || dataVerify.cargo.length === 0){
                setErr({cargo:'Obligatorio'})
                return;
            }
            
            const formData = {
                nombres:data.nombres,
                apellidos:data.apellidos,
                ci:data.ci,
                email:data.email,
                telefono:data.telefono,
                direccion:data.direccion,
                edad:data.edad,
                cargo:dataVerify.cargo,
                especialidad:dataVerify.cargo === 'medico' ? data.especialidad : '',                
                password:data.password,
                password1:data.password1,
                role:dataVerify.cargo === 'usuario' ? 'usuario' : data.role,
            }
           
            setLoading(true);            
            const resp = await MedicoRoutes.create(formData);
            console.log(resp.data, ' esto es la respuesta ')
            if(resp.data.success === false){
                setLoading(false);
                setErr({
                    [resp.data.name]:resp.data.msg
                })
                
            }else{
                setLoading(false);
                setResp(true);
                reset();
                props.parentCallback();
                setErr({})
                setTimeout(() => setResp(false), 3000);
                
            }
        } catch (error) {
            setRespErro(true);
            setTimeout(() => setRespErro(false), 6000)
            console.log(error);           
        }
    }
    
    

    const handleChange = (e) =>{
        const {name, value} = e.target;
        console.log(name,value)
        setdataVerify({
            ...dataVerify,
            [name]:value
        })
        setErr({
            ...err,
            [name]:value.length === 0 ? 'Obligatorio' : value
        })
    }
    
    return(
        <>
            {loading && 
                <div className="overlay"><i className="fas fa-3x fa-sync-alt fa-spin" /><div className="text-bold pt-2">Loading...</div></div>
            }
            {respErro &&
                <div className="overlay">
                    <div className="alert alert-danger alert-dismissible">
                        <button type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                        <h5><i className="icon fas fa-check"></i>Error!</h5>
                        <h3>No se puede enviar los datos</h3>
                        erro 500
                    </div>
                </div>
            }
             {err.error &&
                <div className="overlay">
                    <div className="alert alert-danger alert-dismissible">
                        <button type="button" onClick={()=> setErr({})} className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                        <h5><i className="icon fas fa-check"></i>Error!</h5>
                        <h3>{err.error}</h3>
                        
                    </div>
                </div>
            }
            {response &&
                <div className="overlay">
                    <div className="alert alert-success alert-dismissible">
                        <button type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                        <h5><i className="icon fas fa-check"></i>Error!</h5>
                        <h3>Se crearon los datos</h3>
                        
                    </div>
                </div>
            }
            <form onSubmit={handleSubmit(onsubmit)}>             
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="exampleInputBorder">Nombres {errors.nombres && <code>Obligatorio</code>}</label>
                        <input                                                          
                            type='text'  
                            {...register('nombres',{ required: true })}
                            className={errors.nombres ? "form-control form-control-border is-invalid" : "form-control form-control-border "} 
                            placeholder='Inserte nombres'                           
                                        
                        />
                        {/* {errors.nombres && <label htmlFor="exampleInputBorder"><code>{errors.nombres}</code></label>} */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputBorder">Apellidos {errors.apellidos && <code>Obligatorio</code>}</label>
                        <input                                                          
                            type='text'  
                            {...register('apellidos',{ required: true })}                           
                            className={errors.apellidos ? "form-control form-control-border is-invalid" : "form-control form-control-border "} 
                            placeholder='Inserte sus Apellidos' 
                                                                      
                        />
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputBorder">C.I. {errors.ci && <code>Obligatorio</code>} {err.ci && <code>{err.ci}</code>} </label>
                        <input                                                          
                            type='text'  
                            {...register('ci',{ required: true })}     
                            className={errors.ci ? "form-control form-control-border is-invalid" : "form-control form-control-border "}  
                            placeholder='Inserte sus nombres'                             
                                                
                        />
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputBorder">Telefono {errors.telefono && <code>Obligatorio</code>} {err.telefono && <code>{err.telefono}</code>} </label>
                        <input                                                          
                            type='text'  
                            {...register('telefono',{ required: true })}     
                            className={errors.telefono ? "form-control form-control-border is-invalid" : "form-control form-control-border "}  
                            placeholder='Inserte telefono'                              
                                               
                        />
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputBorder">Fecha de nacimiento {errors.edad && <code>Obligatorio</code>} </label>
                        <input                                                          
                            type='date'  
                            {...register('edad',{ required: true })}  
                            className={errors.edad ? "form-control form-control-border is-invalid" : "form-control form-control-border "}                                         
                        />
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputBorder">Direccion {errors.direccion && <code>Obligatorio</code>} </label>
                        <input                                                          
                            type='text'  
                            {...register('direccion',{ required: true })}  
                            className={errors.direccion ? "form-control form-control-border is-invalid" : "form-control form-control-border "}                                         
                        />
                        
                    </div>
                    <div className="form-group">                        
                        <label htmlFor="exampleSelectBorderWidth2">Cargo {err.cargo === 'Obligatorio' && <code>Selecione</code>} </label>
                        <select 
                        onChange={handleChange}
                        value={dataVerify.cargo}
                        name="cargo"                        
                        className="custom-select form-control-border border-width-2">
                            <option value="">Selecione</option>
                            <option value="medico">Medico</option>
                            <option value="usuario">Usuario</option>                            
                        </select>                        
                    </div>
                    {dataVerify.cargo === 'medico' ? 
                        <div className="form-group">                        
                            <label htmlFor="exampleSelectBorderWidth2">Especialidad {errors.especialidad && <code>Obligatorio</code>} </label>
                            <select 
                            {...register('especialidad',{ required: true })}  
                            className={errors.especialidad ? "custom-select form-control-border border-width-2 is-invalid" : "custom-select form-control-border border-width-2"}>
                                <option value="">Selecione</option>
                                <option value="Pediatra">Pediatra</option>
                                <option value="Neurologo">Neurologo</option>
                                <option value="Endoscopia">Endoscopia</option>
                                <option value="Hematología">Hematología</option>
                            </select>
                            
                        </div>
                    : 
                        <div></div>
                    }
                    
                    <div className="form-group">
                        <label htmlFor="exampleInputBorder">Email {errors.email && <code>Obligatorio</code>} {err.email && <code>{err.email}</code>}</label>
                        <input                                                          
                            type='email'  
                            {...register('email',{ required: true })}  
                            className={errors.email ? "form-control form-control-border is-invalid" : "form-control form-control-border "}   
                            placeholder='Inserte email'                
                        />
        
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputBorder">Contraseña {errors.password && <code>Obligatorio</code>} </label>
                        <input                                                          
                            type='password'  
                            {...register('password',{ required: true })}  
                            className={errors.password ? "form-control form-control-border is-invalid" : "form-control form-control-border "}                                 
                        />
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputBorder">Repita su contraseña {errors.password1 && <code>Obligatorio</code>} </label>
                        <input                                                          
                            type='password'  
                            {...register('password1',{ required: true })}  
                            className={errors.password1 ? "form-control form-control-border is-invalid" : "form-control form-control-border "}                                 
                                              
                        />
                       
                    </div>
                    {dataVerify.cargo === 'medico' ? 
                        <div className="form-group">
                            <label htmlFor="exampleInputBorder">Rol {errors.role && <code>Obligatorio</code>} </label>
                            <select 
                            {...register('role',{ required: true })}
                            className={errors.role ? "custom-select form-control-border border-width-2 is-invalid" : "custom-select form-control-border border-width-2"}>
                                <option value="">Selecione</option>                        
                                <option value="medico">Medico</option>  
                                <option value="admin">Administrador</option>                        
                            </select>
                        
                        </div>  
                    :   
                        <div></div> 
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
        </>
    );
}
export default FormMed;
