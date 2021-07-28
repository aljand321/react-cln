import React, { useState, useEffect, useCallback } from 'react';
import Cirugias from '../../../Routes/Cirugias';
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
function FormCirugias(props) {
    const {
        form,
        errors,
        loading,
        response,
        handleChange,
        handleSubmit
        
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
        const resp = await Cirugias.buscarCirugia('',8);
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
    },[getList,response]);

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
        const resp = await Cirugias.buscarCirugia(data,10);
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
    async function changeLimit (e){
        const {value} = e.target                 
        const resp = await Cirugias.buscarCirugia('',value);
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

    function selectedCirugia(id_cirugiaP,nombre,p) {      
        let verify = false
        for(let i = 0; i < select.length; i++){
            if(select[i].nombre === nombre){
                verify = true
            }
        }
        if(verify === false){
            setSelect([].concat(select, {id_cirugiaP, nombre, p,erro:false}))          
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
    async function regsitrarCirugia() {
        console.log(select.length, ' estp es')
        let err = [], success=[];
        if(select.length === 0){
            err.push({msg:'Selecione una cirugia o varias'})
        }
        for(var i = 0; i < select.length; i++){
            
            let data = {
                id_paciente:props.dataP,
                id_cirugiaP:select[i].id_cirugiaP
            }
            const resp = await Cirugias.CreatePacienteCirugia(data)
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
            props.clickGetList(2);
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
                                    href="#regC" 
                                    role="tab" 
                                    aria-controls="custom-tabs-four-home" 
                                    aria-selected="true">Registrar</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" 
                                    id="custom-tabs-four-profile-tab" 
                                    data-toggle="pill" 
                                    href="#nuevoC" 
                                    role="tab" 
                                    aria-controls="custom-tabs-four-profile" 
                                    aria-selected="false">Nueva Cirugia</a>
                                </li>
                                
                            </ul>
                        </div>
                        <div className="card-body">
                            <div className="tab-content" id="custom-tabs-four-tabContent">
                                <div className="tab-pane fade show active" id="regC" role="tabpanel" aria-labelledby="custom-tabs-four-home-tab">
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
                                                            <div className="input-group-append">
                                                                {/* <button type="submit" className="btn btn-lg btn-default">
                                                                    <i className="fa fa-search" />
                                                                </button> */}
                                                                <nav aria-label="Page navigation example">
                                                                    <ul className="pagination">
                                                                        <li className="page-item">                       
                                                                            <select name='limite' onChange={changeLimit}  className="form-control">                                                                                                                                                          
                                                                                <option value='8'>8</option>
                                                                                <option value='15'>15</option>
                                                                                <option value='25'>25</option>
                                                                                <option value='50'>50</option>
                                                                                <option value='100'>100</option>
                                                                            </select>                       
                                                                        </li>
                                                                    </ul>
                                                                </nav>
                                                            </div>
                                                            
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
                                                                                    <button onClick={()=> selectedCirugia(data.id, data.nombre,key)} type="button" className="btn btn-primary">Ins</button>
                                                                                </div>

                                                                            </div>
                                                                            {data.descripcion && <div className="col-6">
                                                                                <div className="btn-group btn-group-sm">
                                                                                    <a href={`#collapse${key}`} data-toggle="collapse" className="btn btn-primary"><i className="fas fa-eye" /></a>
                                                                                </div> 
                                                                            </div>}
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
                                            <button type="button" onClick={regsitrarCirugia} className="btn btn-primary">Registrar</button>
                                        </div>
                                    </div>

                                </div>
                                <div className="tab-pane fade" id="nuevoC" role="tabpanel" aria-labelledby="custom-tabs-four-profile-tab">   
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
                                                <h3 className="card-title">Registrar Cirugia</h3>
                                            </div>                                        
                                            <form onSubmit={handleSubmit}>
                                                <div className="card-body">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Nombre {errors.nombre && <code>{errors.nombre}</code>}</label>
                                                        <input 
                                                        type="text"                                                                         
                                                        onChange={handleChange}
                                                        className={errors.nombre ? "form-control is-invalid" : "form-control"} 
                                                        placeholder="Inserte Cirugia" 
                                                        name="nombre" 
                                                        value={form.nombre} 
                                                        />                                                        
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
    const [errors, setErrors] = useState({nombre:''});
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
        setErrors({
            ...errors,
            [name]:value.length === 0 ? 'Obligatorio' : ''
        })
    }    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(errors.nombre.length === 0){        
            setloading(true);
            const resp = await Cirugias.CreateCirugia(form);
            if(resp.data.success === false){
                setloading(false);
                setErrors({
                    [resp.data.name]:resp.data.msg
                });
                
            }else{
                setloading(false);
                setResponse(true);
                setForm(initilForm);
                setTimeout(() => setResponse(false), 1000);
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
        handleSubmit
    }
}

export default FormCirugias
