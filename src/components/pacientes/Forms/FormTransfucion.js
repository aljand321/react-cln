import React, { useState, useEffect, useCallback } from 'react';
import Transfuciones from '../../../Routes/Transfuciones';
const initForm = {
    nombre:'',
    descripcion:''    
};
const validationsForm = (form) =>{
    let errors = {};
    //trim( ) elimina los espacios en blanco en ambos extremos del string
    if(!form.nombre.trim()){
        errors.nombre = 'Nombre es obligatorio'
    }
    return errors;
};

const serachForm = {
    buscador:''
}
function FormTransfucion(props) {
    const {
        form,
        errors,
        loading,
        response,
        handleChange,
        handleBlur,
        handleSubmit,
        
    } = useForm(initForm,validationsForm);
    const [search,setsearch] = useState(serachForm);

    const [list,setList] = useState([]);
    const [erro,setErro] = useState(false);
    const [loadS,setLoad] = useState(false);
    const [msg,setMsg] = useState('');
    const [select, setSelect] = useState([]);

    const[respErro,setRespErro] = useState([]);
    const[respSuccess, setRespSuccess] = useState([]);
    const getList = useCallback( async() =>{         
        setLoad(true);        
        const resp = await Transfuciones.buscarTransfucion('');
        if(resp.data.success === false){
            setLoad(false);
            setErro(true)
            setMsg('No se puede mostrar los datos')
            setTimeout(() =>{
                setErro(false)
                setMsg('')
            },5000)
            return;
        }else{
            setLoad(false);
            setList(resp.data.resp);           
            return;
        }        
    },[])
    useEffect(() => {
        getList();        
    },[getList,response])  
    async function buscar(e){
        let data = ''    
        if(e){
            const { value,name } = e.target              
            setsearch({
                ...search,
                [name]:value
            })
            data= value 
        }           
        const resp = await Transfuciones.buscarTransfucion(data);
        if(resp.data.success === false){
            setLoad(false);
            setErro(true)
            setMsg('No se puede mostrar los datos')
            setTimeout(() =>{
                setErro(false)
                setMsg('')
            },5000)
            
        }else{
            setLoad(false);
            setList(resp.data.resp);           
            
        }  
    }

    function selectedTransfucion(id_transfucion,nombre,p) {      
        let verify = false
        for(let i = 0; i < select.length; i++){
            if(select[i].nombre === nombre){
                verify = true
            }
        }
        if(verify === false){
            setSelect([].concat(select, {id_transfucion, nombre, p,erro:false}))          
            let arr = [...list]
            let updatedSelct = {
                id:arr[p].id,
                nombre:arr[p].nombre,
                descripcion:arr[p].descripcion,
                id_medico:arr[p].id_medico,
                selected:true
            }
            arr.splice(p,1,updatedSelct)
            setList(arr)
        }
        
    }
    function deleteSelect(position,key) {
        
        var array = [...select];
        
        array.splice(position, 1);
        setSelect(array);
        
        let arr = [...list]
        let updatedSelct = {
            id:arr[key].id,
            nombre:arr[key].nombre,
            descripcion:arr[key].descripcion,
            id_medico:arr[key].id_medico,
            selected:false
        }
        arr.splice(key,1,updatedSelct)
        setList(arr)
          
    }
    async function regsitrarTransfucion() {
        console.log(select.length, ' estp es')
        let err = [], success=[];
        if(select.length === 0){
            err.push({msg:'Selecione una Transfucion o varias'})
        }
        for(var i = 0; i < select.length; i++){
            
            let data = {
                id_paciente:props.dataP,
                id_transfucion:select[i].id_transfucion
            }
            const resp = await Transfuciones.CreatePacienteTransfucion(data)
            console.log(resp.data, ' estp es la respuesta')
            if(resp.data.success === false){
                console.log(resp.data.msg);
                err.push({msg:resp.data.msg})
            }else{
                success.push({msg:resp.data.msg})
               
            }
        }
        console.log(err, ' esto es el error') 
        if(err.length !== 0){
            setTimeout(()=> setRespErro(err),100)
            setTimeout(()=>setRespErro([]), 11000);
        }
        if(success.length !== 0){
            setTimeout(()=> setRespSuccess(success),300)
            setTimeout(()=>setRespSuccess([]),6000);
            setTimeout(()=>buscar(),6000);
            props.clickGetList(1);
        }      
        
        setTimeout(()=>setSelect([]),5000)


        
    }
    return (
        <>
            <div className="row">
                <div className="col-12 col-sm-12">
                    <div className="card card-primary card-outline card-outline-tabs">
                        <div className="card-header p-0 border-bottom-0">
                            <ul className="nav nav-tabs" id="custom-tabs-four-tab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" 
                                    id="custom-tabs-four-home-tab" 
                                    data-toggle="pill" 
                                    href="#regT" 
                                    role="tab" 
                                    aria-controls="custom-tabs-four-home" 
                                    aria-selected="true">Registrar</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" 
                                    id="custom-tabs-four-profile-tab" 
                                    data-toggle="pill" 
                                    href="#nuevoT" 
                                    role="tab" 
                                    aria-controls="custom-tabs-four-profile" 
                                    aria-selected="false">Nueva Transfucion</a>
                                </li>
                                
                            </ul>
                        </div>
                        <div className="card-body">
                            <div className="tab-content" id="custom-tabs-four-tabContent">
                                <div className="tab-pane fade show active" id="regT" role="tabpanel" aria-labelledby="custom-tabs-four-home-tab">
                                    {/* /.card-header */}
                                    <section className="content">
                                        <div className="container-fluid">                                           
                                            <div className="row">
                                                <div className="col-md-8 offset-md-2">
                                                    <form action="simple-results.html">
                                                        <div className="input-group">
                                                            <input 
                                                            type="search" 
                                                            name='buscador'
                                                            className="form-control form-control-lg" 
                                                            placeholder="Buscar Cirugia"
                                                            onChange={buscar}
                                                            value={search.buscador}
                                                             />
                                                            
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <br/>
                                    <div className="tab-pane fade show active" id="custom-tabs-five-overlay" role="tabpanel" aria-labelledby="custom-tabs-five-overlay-tab">
                                       
                                        <div className="col-12" id="accordion">
                                            {loadS && 
                                                <div className="overlay"><i className="fas fa-3x fa-sync-alt fa-spin" /><div className="text-bold pt-2">Loading...</div></div>
                                            }
                                            {erro && 
                                                <div className="overlay">
                                                    <div className="alert alert-danger alert-dismissible">
                                                        <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                                        <h5><i className="icon fas fa-ban" />Error 500!</h5>
                                                        {msg}
                                                    </div>
                                                </div>
                                            }
                                            {erro && 
                                                <div className="overlay">
                                                    <div className="alert alert-danger alert-dismissible">
                                                        <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                                        <h5><i className="icon fas fa-ban" />Error 500!</h5>
                                                        {msg}
                                                    </div>
                                                </div>
                                            }  

                                            <div>
                                                {select.map((data,key) =>{
                                                    return (
                                                        <div key={key} onClick={() => deleteSelect(key,data.p)} className={data.erro === true ? "btn btn-danger btn-sm":"btn btn-default btn-sm"}><i className="fas fa-share" /> {data.nombre}</div>
                                                    );
                                                })}                                                
                                                
                                            </div>
                                            <br></br>
                                                <div>
                                                    {respErro.map((data,key)=>{
                                                        return(
                                                            <div key={key} className="btn btn-default btn-sm"><p className="text-danger">{data.msg}</p> </div>
                                                        );
                                                    })}
                                                    {respSuccess.map((data,key)=>{
                                                        return(
                                                            <div key={key} className="btn btn-default btn-sm"><p className="text-success">{data.msg}</p> </div>
                                                        );
                                                    })}
                                            
                                               
                                                </div>

                                            {list.map((data,key) =>{
                                                return(
                                                    <div key={key} className={data.selected === true ? "card card-success card-outline" : "card card-primary card-outline"}>
                                                        
                                                        <div className="card-header">
                                                            
                                                            <div className="d-flex">
                                                                <div className="mr-auto p-2">
                                                                    <h4 className="card-title w-100">
                                                                        {key+1} {data.nombre}
                                                                    </h4>
                                                                </div>
                                                                <div className="p-2">
                                                                    <div className="row">
                                                                        <div className="col-6">

                                                                            <div className="btn-group btn-group-sm" role="group" aria-label="Third group">
                                                                                <button onClick={()=> selectedTransfucion(data.id, data.nombre,key)} type="button" className="btn btn-primary">Ins</button>
                                                                            </div>

                                                                        </div>
                                                                        <div className="col-6">
                                                                            <div className="btn-group btn-group-sm">
                                                                                <a href={`#collapse${key}`} data-toggle="collapse" className="btn btn-primary"><i className="fas fa-eye" /></a>
                                                                            </div> 
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div id={`collapse${key}`} className="collapse"  data-parent="#accordion">
                                                            <div className="card-body">
                                                                {data.descripcion}
                                                            </div>
                                                        </div>
                                                    </div>  
                                                );
                                            })}
                                            {list.length === 0 && 
                                                <div className="alert alert-danger alert-dismissible">
                                                    <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                                    <h5><i className="icon fas fa-ban" /> No se han encontrado resultados.</h5>
                                                    <h3> </h3>                                                   
                                                    Prueba con otras palabras clave o quita los filtros de búsqueda
                                                </div>

                                            }                                
                                                                                 
                                        </div>
                                    </div>

                                    {/* /.card-body */}
                                    <div className="d-flex">
                                        <div className="mr-auto p-2">
                                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                        </div>
                                        <div className="p-2">
                                            <button type="button" onClick={regsitrarTransfucion} className="btn btn-primary">Registrar</button>
                                        </div>
                                    </div>

                                </div>
                                <div className="tab-pane fade" id="nuevoT" role="tabpanel" aria-labelledby="custom-tabs-four-profile-tab">   
                                    <div className="tab-pane fade show active" id="custom-tabs-five-overlay" role="tabpanel" aria-labelledby="custom-tabs-five-overlay-tab">   
                                        {loading &&
                                            <div className="overlay"><i className="fas fa-3x fa-sync-alt fa-spin" /><div className="text-bold pt-2">Loading...</div></div>
                                        }
                                        {response &&
                                            <div className="overlay">
                                                <div className="alert alert-success alert-dismissible">
                                                    <button type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                                                    <h5><i className="icon fas fa-check"></i>Success!</h5>
                                                    Se enviaron los datos
                                                </div>
                                            </div>
                                        }

                                        <div className="card card-primary">
                                            <div className="card-header">
                                                <h3 className="card-title">Registrar Transfucion</h3>
                                            </div>                                        
                                            <form onSubmit={handleSubmit}>
                                                <div className="card-body">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Nombre</label>
                                                        <input 
                                                        type="text" 
                                                        onBlur={handleBlur}                          
                                                        onChange={handleChange}
                                                        className="form-control" 
                                                        
                                                        placeholder="Inserte Transfucion" 
                                                        name="nombre" 
                                                        value={form.nombre} 
                                                        />
                                                        {errors.nombre && <label htmlFor="exampleInputBorder"><code>{errors.nombre}</code></label>}
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputPassword1">Descripcion</label>
                                                        <textarea 
                                                        className="form-control" 
                                                        onBlur={handleBlur}                          
                                                        onChange={handleChange}
                                                        placeholder='Inserte una descripcion' 
                                                        rows="5"
                                                        name="descripcion" 
                                                        value={form.descripcion} 
                                                        ></textarea>
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
                                    </div>
                                </div>                            
                            </div>
                        </div>                       
                    </div>
                </div>
            </div>
        </>
    )
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
            const resp = await Transfuciones.CreateTransfucion(form);
            if(resp.data.success === false){
                setloading(false);
                setErrors({
                    [resp.data.name]:resp.data.msg
                });
                setTimeout(() => setErrors({
                    nombre:''
                }), 5000);
            }else{
                setloading(false);
                setResponse(true);
                setForm(initilForm);
                setTimeout(() => setResponse(false), 5000);
            }

        }else{
         
            return;
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

export default FormTransfucion
