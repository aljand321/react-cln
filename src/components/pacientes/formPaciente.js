import React, {useEffect} from 'react';
import  {useForm} from 'react-hook-form';
import Pacientes from '../../Routes/Paciente';
import useIsMountedRef from '../../components/UseIsMountedRef'
const  { useState } = require("react");
const contendForm = {    
    ci:'',
    telefono:'',  
    sexo:'',
    inputs:[
        {
            label:'Nombres',
            name:'nombres',
            type:'text',
            placeholder:'Nombre del paciente',
            msg:"nombre es necesario",
        },
        {
            label:'Apellidos',
            name:'apellidos',
            type:'text',
            placeholder:'Apellido del paciente',
            msg:"Apellido es necesario"
        },
        {
            label:'Direccion',
            name:'direccion',
            type:'text',
            placeholder:'Direccion del paciente',
            msg:"Direccion es necesario"
        },
        {
            label:'Fecha de nacimiento',
            name:'edad',
            type:'date',
            placeholder:'Edad del paciente',
            msg:"Edad es necesario"
        },
        {
            label:'Ocupación',
            name:'ocupacion',
            type:'text',
            placeholder:'Ocupación del paciente',
            msg:"Ocupacion es necesario"
        },
    ]
}
const contErros = {
    errCI:'',
    errTel:'',
    loading:false,
    response:false, 
    error:null
}

function FormPaciente(props){
    const isMountedRef = useIsMountedRef();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [form, setForm] = useState(contendForm);
    const [formErr, setFormErr] = useState(contErros);
    const onSubmit = async (data) => {
        if(isMountedRef.current){
            const body = {
                apellidos: data.apellidos,
                direccion: data.direccion,
                edad: data.edad,
                nombres: data.nombres,
                ocupacion: data.ocupacion,
                sexo: data.sexo,
                ci: form.ci,
                telefono: form.telefono
            }
        
            setFormErr({           
                errCI:'',
                errTel:'',
                loading:true,
                response:false, 
                error:null            
            })
            try {
                const resp = await Pacientes.create(body);
                if(resp.data.success === false){
                    if(resp.data.error === '500'){
                        setFormErr({                    
                            errCI:'',
                            errTel:'',
                            loading:false,
                            response:false, 
                            error:true                        
                        })
                        
                        return;
                    }
                    setFormErr({                    
                        errCI: resp.data.name === 'ci' ? resp.data.msg : '',
                        errTel: resp.data.name === 'telefono' ? resp.data.msg : '',
                        loading:false,
                        response:false, 
                        error:null                    
                    })
                }else{
                    reset();
                    setForm(contendForm);
                    setFormErr({                    
                        errCI: '',
                        errTel: '',
                        loading:false,
                        response:true, 
                        error:null                    
                    }) 
                    props.handleChange();
                    if(props.desde === "paciente"){                        
                        props.selectedPciente(resp.data.resp.id);
                    }               
                }
            } catch (error) {
                setFormErr({
                    
                    errCI: '',
                    errTel: '',
                    loading:false,
                    response:false, 
                    error:true
                    
                })            
                console.log(error);
            }
        }
    };
    useEffect(() => {
        const timeout = setTimeout(() => setFormErr({
            errCI: '',
            errTel: '',
            loading:false,
            response:false, 
            error:null
        }), 5000);
        return () => clearTimeout(timeout);
    },[formErr]);
    const handleChange = (e) => {
        const { name,value } = e.target;
        setForm({
            ...form,
                [name]:value,    
        })
    }
    return(
        <>
            <div className="overlay-wrapper">
                { formErr.loading && 
                    <div className="overlay"><i className="fas fa-3x fa-sync-alt fa-spin" /><div className="text-bold pt-2">Loading...</div></div>
                }
                { formErr.response && 
                    <div className="overlay">
                        <div className="alert alert-success alert-dismissible">
                            <button type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                            <h5><i className="icon fas fa-check"></i>Alert!</h5>
                            Se enviaron los datos
                        </div>
                    </div>
                } 
                { formErr.error && 
                    <div className="overlay">
                        <div className="alert alert-danger alert-dismissible">
                            <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                            <h5><i className="icon fas fa-ban" />Alert!</h5>
                            No se pueden enviar los datos error 500
                        </div>
                    </div>
                }              
             
                <form onSubmit={handleSubmit(onSubmit)}>
                    {contendForm.inputs.map((input,key) =>{
                        return (
                            <div key={key} className="form-group">
                                <label htmlFor="exampleInputBorder">{input.label}<code></code></label>
                                <input type={input.type} {...register(`${input.name}`,{ required:`${input.msg}` })} className="form-control form-control-border" placeholder={input.placeholder} />
                                {errors[input.name] && <label htmlFor="exampleInputBorder"><code>{input.msg}</code></label>}
                            </div>
                        );
                    })}
                    <div className="form-group">
                        <label htmlFor="exampleInputBorderWidth2">Sexo<code></code></label>
                        <select {...register("sexo", {required:'Selecione sexo del paciente'})} className="custom-select form-control-border">
                            <option value="">Selecione</option>
                            <option value="M">Hombre</option>
                            <option value="F">Mujer</option>
                        </select>
                        {errors.sexo && <label htmlFor="exampleInputBorder"><code>Selecione sexo del paciente</code></label>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputBorderWidth2">C.I.<code></code></label>
                        <input type="text" name='ci' onChange={handleChange} value={form.ci} className="form-control form-control-border border-width-2" placeholder="C.I. Del paciente" />
                        {formErr.errCI && <label htmlFor="exampleInputBorder"><code>{formErr.errCI}</code></label>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputBorderWidth2">Telefono<code></code></label>
                        <input type="text" name='telefono' onChange={handleChange} value={form.telefono} className="form-control form-control-border border-width-2" placeholder="Telefono del paciente" />
                        {formErr.errTel && <label htmlFor="exampleInputBorder"><code>{formErr.errTel}</code></label>}
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

export default FormPaciente;