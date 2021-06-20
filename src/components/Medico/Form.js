
import MedicoRoutes from '../../Routes/Medico';
const  {React, useState} = require("react");

const initForm = {
    nombres:'',
    apellidos:'',
    ci:'',
    email:'',
    telefono:'',
    direccion:'',
    edad:'',
    especialidad:'',
    password:'',
    password1:'',
    role:''
};

const validationsForm = (form) =>{
    let errors = {};
    //trim( ) elimina los espacios en blanco en ambos extremos del string
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;

    if(!form.nombres.trim()){
        errors.nombres = 'El campo nombres es requerido'
    }else if(!regexName.test(form.nombres.trim())){
        errors.nombres = 'El campo nombres solo acepta letras y espacios en blanco'
    }
    if(!form.apellidos.trim()){
        errors.apellidos = 'El campo apellidos es requerido'
    }
    else if(!regexName.test(form.apellidos.trim())){
        errors.apellidos = 'El campo apellidos solo acepta letras y espacios en blanco'
    }
    if(form.ci.length === 0){
        errors.ci = 'El campo ci es requerido'
    }
    if(form.email.length === 0){
        errors.email = 'El campo email es requqerido'
    }else if(!regexEmail.test(form.email.trim())){
        errors.email = 'Email no valido'
    }
    if(form.telefono.length === 0){
        errors.telefono = 'El campo telefono es requerido'
    }else if(isNaN(form.telefono)){
        errors.telefono = 'Telefono solo acepta numeros'
    }
    if(form.direccion.length === 0){
        errors.direccion = 'El campo direccion es requerido'
    }
    if(form.edad.length === 0){
        errors.edad = 'El campo edad es requerido'
    }
    if(form.especialidad.length === 0){
        errors.especialidad = 'El campo especialidad es requerido'
    }

    if(form.password.length === 0){
        errors.password = 'Contraceña es requerido'
    }
    if(form.password1.length === 0){
        errors.password1 = 'La contraceña de confirmacion es obligatorio'
    }
    if(form.role.length === 0){
        errors.role = 'El rol del usario es requerido'
    }
    return errors
};

function FormMed (props){
    const {
        form,
        errors,
        loading,
        response,
        handleChange,
        handleBlur,
        handleSubmit,
        
    } = useForm(initForm,validationsForm);
    function resp (){       
        setTimeout(() => props.parentCallback(), 1000);         
    }
    
    return(
        <>
            <form onSubmit={handleSubmit}>             
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="exampleInputBorder">Nombres</label>
                        <input                                                          
                            type='text'  
                            onBlur={handleBlur}                          
                            onChange={handleChange}
                            className="form-control form-control-border" 
                            placeholder='Inserte sus nombres' 
                            name="nombres" 
                            value={form.nombres}                     
                        />
                        {errors.nombres && <label htmlFor="exampleInputBorder"><code>{errors.nombres}</code></label>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputBorder">Apellidos</label>
                        <input                                                          
                            type='text'  
                            onBlur={handleBlur}                          
                            onChange={handleChange}
                            className="form-control form-control-border" 
                            placeholder='Inserte sus Apellidos' 
                            name="apellidos" 
                            value={form.apellidos}                     
                        />
                        {errors.apellidos && <label htmlFor="exampleInputBorder"><code>{errors.apellidos}</code></label>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputBorder">C.I.</label>
                        <input                                                          
                            type='text'  
                            onBlur={handleBlur}                          
                            onChange={handleChange}
                            className="form-control form-control-border" 
                            placeholder='Inserte sus nombres' 
                            name="ci" 
                            value={form.ci}                     
                        />
                        {errors.ci && <label htmlFor="exampleInputBorder"><code>{errors.ci}</code></label>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputBorder">Telefono</label>
                        <input                                                          
                            type='text'  
                            onBlur={handleBlur}                          
                            onChange={handleChange}
                            className="form-control form-control-border" 
                            placeholder='Inserte telefono' 
                            name="telefono" 
                            value={form.telefono}                     
                        />
                        {errors.telefono && <label htmlFor="exampleInputBorder"><code>{errors.telefono}</code></label>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputBorder">Fecha de nacimiento</label>
                        <input                                                          
                            type='date'  
                            onBlur={handleBlur}                          
                            onChange={handleChange}
                            className="form-control form-control-border"                              
                            name="edad" 
                            value={form.edad}                     
                        />
                        {errors.edad && <label htmlFor="exampleInputBorder"><code>{errors.edad}</code></label>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputBorder">Direccion</label>
                        <input                                                          
                            type='text'  
                            onBlur={handleBlur}                          
                            onChange={handleChange}
                            className="form-control form-control-border"                              
                            name="direccion" 
                            value={form.direccion}                     
                        />
                        {errors.direccion && <label htmlFor="exampleInputBorder"><code>{errors.direccion}</code></label>}
                    </div>
                    <div className="form-group">                        
                        <label htmlFor="exampleSelectBorderWidth2">Especialidad</label>
                        <select name='especialidad' className="custom-select form-control-border border-width-2"onChange={handleChange} onBlur={handleBlur} value={form.especialidad}>
                            <option value="">Selecione</option>
                            <option value="pediatra">Pediatra</option>
                            <option value="neurologo">Neurologo</option>
                            <option value="endoscopia">Endoscopia</option>
                            <option value="hematologia">Hematología</option>
                        </select>
                        {errors.especialidad && <label htmlFor="exampleInputBorder"><code>{errors.especialidad}</code></label>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputBorder">Email</label>
                        <input                                                          
                            type='email'  
                            onBlur={handleBlur}                          
                            onChange={handleChange}
                            className="form-control form-control-border" 
                            placeholder='Inserte email' 
                            name="email" 
                            value={form.email}                     
                        />
                        {errors.email && <label htmlFor="exampleInputBorder"><code>{errors.email}</code></label>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputBorder">Contraceña</label>
                        <input                                                          
                            type='password'  
                            onBlur={handleBlur}                          
                            onChange={handleChange}
                            className="form-control form-control-border"                              
                            name="password" 
                            value={form.password}                     
                        />
                        {errors.password && <label htmlFor="exampleInputBorder"><code>{errors.password}</code></label>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputBorder">Repita su contraceña</label>
                        <input                                                          
                            type='password'  
                            onBlur={handleBlur}                          
                            onChange={handleChange}
                            className="form-control form-control-border"                              
                            name="password1" 
                            value={form.password1}                     
                        />
                        {errors.password1 && <label htmlFor="exampleInputBorder"><code>{errors.password1}</code></label>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputBorder">Rol</label>
                        <select name='role' className="custom-select form-control-border border-width-2"onChange={handleChange} onBlur={handleBlur} value={form.role}>
                            <option value="">Selecione</option>                           
                            <option value="user">Usuario</option>   
                            <option value="admin">Administrador</option>                        
                        </select>
                        {errors.role && <label htmlFor="exampleInputBorder"><code>{errors.role}</code></label>}
                    </div>
                    { loading && <div className="d-flex justify-content-center">
                        <div>
                            <div className="spinner-grow text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <div className="spinner-grow text-secondary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <div className="spinner-grow text-success" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <div className="spinner-grow text-danger" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <div className="spinner-grow text-warning" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <div className="spinner-grow text-info" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                           
                        </div>
                       

                    </div> }

                    {response && <div className="alert alert-success" role="alert">
                        Se registraron los datos
                    </div>}


                </div>              
               
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                    <div className="p-2">
                        <button type="submit" onClick={resp} className="btn btn-primary">Registrar</button>
                    </div>
                </div>                   
                
            </form>
        </>
    );
}

const useForm = (initilForm,validateForm) =>{
    const [form, setForm] = useState(initilForm);
    //manejo de errores
    const [errors, setErrors] = useState({});
    //loaders
    const [loading, setloading] = useState(false);
    //respuesta
    const [response, setResponse] = useState(null);

    //cambio de valores
    const handleChange = (e) =>{
        const { name,value } = e.target;
        setForm({
            ...form,
            [name]:value
        })
    }
    //para las validaciones
    const handleBlur = (e) =>{
        handleChange(e);
        setErrors(validateForm(form))
    }
    //
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setErrors(validateForm(form));
        if(Object.keys(errors).length === 0){
            setloading(true);
            const resp = await MedicoRoutes.create(form);
            console.log(resp)
            if(resp.data.success === false){
                setloading(false);
                setErrors({
                    ci:'ci ya registrado'
                });
                setTimeout(() => setErrors({
                    ci:''
                }), 5000);
            }else{
                setloading(false);
                setResponse(true);
                setForm(initilForm);
                setTimeout(() => setResponse(false), 5000);
                return true;
            }            
        }else{
            return false;
        }
    }

    return {
        form,
        errors,
        loading,
        response,
        handleChange,
        handleBlur,
        handleSubmit
    }
}


export default FormMed;
