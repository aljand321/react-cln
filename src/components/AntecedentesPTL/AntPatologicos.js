import React,{useState} from 'react'
import ModalLarge from '../ModalLarge';
import FormANTPTL from './form';
import Alergias from '../../Routes/Alergias';
import Cirugias from '../../Routes/Cirugias';
import OtrasEnfermedades from '../../Routes/OtrasEnfermedades';
import Transfuciones from '../../Routes/Transfuciones'
const data = {
    nombre:'',
    descripcion:''
}
function List(props) {    
    let item = [];
    for(let i = 0; i < props.number; i++){
        item.push(props.children(i));
    }    
    const data = item.slice(0 + props.num ,5 + props.num );    
    return data
}
function ANTptl(props){
    const [form, setForm] = useState(data);
    const [erro, setErro] = useState({
        nombre:'',
        descripcion:'',
        msg:''
    });
    const [load, setLoad] = useState(false);
    const [respErro, setRespErro] = useState(false);
    const [resp, setResp] = useState({success:false,msg:""});  
    const [isUpdate, setIsupdate] = useState(false);
    const [select, setSelect] = useState('')

    const handleChange =(e)=>{
        const {name,value}= e.target;
        setForm({
            ...form,
            [name]:value
        })
        setErro({
            ...erro,
            [name]:value.length === 0 ? 'Obligatorio' : ''
        })
    }
    const registrar = async (e) =>{
        e.preventDefault();
        let obj = {}
        for(const p in form){
            if(!form[p]){
                obj[p] = 'Obligatorio';
            }
        }
        setErro(obj)
        if(Object.keys(obj).length === 0){
            try {
                setLoad(true);
                //const resp = await Alergias.CreateAlergias(form);
                let resp = {}
                if(props.selectAnt.route === 'Alergias'){
                    const alergia = await Alergias.CreateAlergias(form);
                    resp = alergia;
                } 
                if(props.selectAnt.route === 'Cirugias'){
                    const cirugia = await Cirugias.CreateCirugia(form);
                    resp = cirugia;
                }  
                if(props.selectAnt.route === 'Tranfuciones'){
                    const transfuciones = await Transfuciones.CreateTransfucion(form);               
                    resp = transfuciones;
                } 
                if(props.selectAnt.route === 'Otras Enfermedades'){
                    const OtrEnfermedades = await OtrasEnfermedades.CreateEnf(form);               
                    resp = OtrEnfermedades;
                }              
                if(resp.data.success === false){
                    setLoad(false);
                    setErro({
                        [resp.data.name]:resp.data.msg
                    });
                    
                }else{
                    setLoad(false);
                    setResp({success:true,msg:"Se crearon los datos"});
                    setForm(data)
                    props.buscadorDataAnt();
                }
            } catch (error) {
                console.log(error)
                setLoad(false);
                setRespErro(true);
            }
        }
        
    }
    const getOne = async(id)=>{
        setErro({
            nombre:'',
            descripcion:'',
            msg:''
        });
        setSelect(id)
        setIsupdate(true)
        try {
            setLoad(true);
            let resp = {}
            if(props.selectAnt.route === 'Alergias'){
                const alergias = await Alergias.OneAlergia(id);
                resp = alergias;
            }
            if(props.selectAnt.route === 'Cirugias'){
                const cirugia = await Cirugias.oneCirugia(id);
               
                resp = cirugia;
            }  
            if(props.selectAnt.route === 'Tranfuciones'){
                const transfuciones = await Transfuciones.OneTransfucion(id);               
                resp = transfuciones;
            } 
            if(props.selectAnt.route === 'Otras Enfermedades'){
                const OtrEnfermedades = await OtrasEnfermedades.OneOtrEnf(id);               
                resp = OtrEnfermedades;
            }       
            if(resp.data.success === false){
                setLoad(false);
                setErro({
                    nombre:'',
                    descripcion:'',
                    msg:resp.data.msg
                })
            }else{
                setLoad(false);               
                setForm({
                    nombre:resp.data.resp.nombre,
                    descripcion:resp.data.resp.descripcion
                })
            }
        } catch (error) {
            console.log(error)
            setLoad(false);
            setRespErro(error)
        }
    }
    const clickRegister =()=>{
        setIsupdate(false);
        setForm(data)
    }
    const changeUpdate =(e)=>{
        const {value,name} = e.target;
        setForm({
            ...form,
            [name]:value
        });
        setErro({
            ...erro,
            [name]:value.length === 0 ? '' : ''
        });
    }
    const actualizar = async (name)=>{
           
        if(name === 'descripcion'){
            if(form.descripcion.length === 0){
                setErro({
                    nombre:'',
                    descripcion:'obligatorio'
                })
            }else{
                let dataDescripcion = {
                    nombre:'',
                    descripcion:form.descripcion
                }
               
                try {
                    setLoad(true);
                    let resp = {}
                    if(props.selectAnt.route === 'Alergias'){
                        const alergias = await Alergias.actualizarAlergia(select,dataDescripcion);
                        resp = alergias;
                    }
                    if(props.selectAnt.route === 'Cirugias'){
                        const cirugia = await Cirugias.updateCirugia(select,dataDescripcion);
                        resp = cirugia;
                    }
                    if(props.selectAnt.route === 'Tranfuciones'){
                        const transfuciones = await Transfuciones.updateTransfucion(select,dataDescripcion);               
                        resp = transfuciones;
                    } 
                    if(props.selectAnt.route === 'Otras Enfermedades'){
                        const OtrEnfermedades = await OtrasEnfermedades.updateOtrEnf(select,dataDescripcion);               
                        resp = OtrEnfermedades;
                    }
                    if(resp.data.success === false){
                        setLoad(false);
                        setErro({
                            [resp.data.name]:resp.data.msg
                        });
                        
                    }else{
                        setLoad(false);
                        setResp({success:true,msg:"Se actualizo descripcion"});
                        setForm({
                            nombre:resp.data.resp.nombre,
                            descripcion:resp.data.resp.descripcion
                        })
                        props.buscadorDataAnt();
                    }
                    
                } catch (error) {
                    console.log(error);
                    setLoad(false);
                    setRespErro(true)
                }
            }              
        }else{
            if(form.nombre.length === 0){
                setErro({
                    nombre:'obligatorio',
                    descripcion:''
                })
            }else{
                let dataNombre = {
                    nombre:form.nombre,
                    descripcion:''
                }
               
                try {
                    setLoad(true);
                    let resp = {}
                    if(props.selectAnt.route === 'Alergias'){
                        const alergias = await Alergias.actualizarAlergia(select,dataNombre);
                        resp = alergias;
                    }
                    if(props.selectAnt.route === 'Cirugias'){
                        const cirugia = await Cirugias.updateCirugia(select,dataNombre);
                        resp = cirugia;
                    }
                    if(props.selectAnt.route === 'Tranfuciones'){
                        const transfuciones = await Transfuciones.updateTransfucion(select,dataNombre);               
                        resp = transfuciones;
                    } 
                    if(props.selectAnt.route === 'Otras Enfermedades'){
                        const OtrEnfermedades = await OtrasEnfermedades.updateOtrEnf(select,dataNombre);               
                        resp = OtrEnfermedades;
                    }
                    if(resp.data.success === false){
                        setLoad(false);
                        setErro({
                            [resp.data.name]:resp.data.msg
                        });
                        
                    }else{
                        setLoad(false);
                        setResp({success:true,msg:"Se actualizo nombre"});
                        setForm({
                            nombre:resp.data.resp.nombre,
                            descripcion:resp.data.resp.descripcion
                        })
                        props.buscadorDataAnt();
                    }                    
                } catch (error) {
                    console.log(error);
                    setRespErro(true)
                }
            }
        }
    }
    
    return (
        <>  
            
            <section className="content">
                    <div className="container-fluid">                                            
                        <div className="row">
                            <div className="col-md-8 offset-md-2">
                                <form action="simple-results.html">
                                    <div className="input-group">
                                        <input 
                                        onChange={props.buscadorDataAnt}   
                                        value={props.buscador}                                 
                                        name='buscador'
                                        type="search" className="form-control form-control-lg" placeholder={`Buscar ${props.selectAnt.route}` } />
                                        <div className="input-group-append">
                                            {/* <button type="submit" className="btn btn-lg btn-default">
                                                <i className="fa fa-search" />
                                            </button>  */}
                                            
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                <br/>
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">
                        <i className="ion ion-clipboard mr-1" />
                        {props.selectAnt.route}
                    </h3>
                    <div className="card-tools">
                        <ul className="pagination pagination-sm">
                            {props.pageCount > 2 && <li  className="page-item" onClick={() =>props.changePage(0)}><div className="page-link">1</div></li>}
                            {props.pageCount > 2 && <li  className="page-item active"><div className="page-link">....</div></li>}
                            <List number={props.page.pageCount} num={props.num}>
                                {(index) => {                                
                                        return (
                                            <li 
                                                key={index} 
                                                onClick={() =>props.changePage(index)} 
                                                className={props.page.pageNumber === index ? "page-item active" : "page-item" }
                                            >
                                                <div className="page-link">{index +1 }</div>
                                            </li>
                                        );
                                    }
                                
                                }
                            </List>
                            {props.pageCount < props.page.pageCount-3 && <li  className= "page-item active"><div className="page-link">....</div></li>}
                            {props.pageCount < props.page.pageCount-3 && <li  className= "page-item" onClick={() =>props.changePage(props.page.pageCount-1)}><div className="page-link">{props.page.pageCount}</div></li>}
                    
                            <li className="page-item">                       
                                <select name='limite' onChange={props.limit}  className="form-control">                                                                                
                                    <option value='10'>10</option>  
                                    <option value='2'>2</option>                                                       
                                    <option value='25'>25</option>
                                    <option value='50'>50</option>
                                    <option value='100'>100</option>
                                </select>                       
                            </li>
                        </ul> 
                    </div>
                </div>
                    
                <br/>
                <div className="tab-pane fade show active" id="custom-tabs-five-overlay" role="tabpanel" aria-labelledby="custom-tabs-five-overlay-tab">                                       
                    <div className="col-12" id="accordion">
                        {props.success.load && 
                            <div className="overlay"><i className="fas fa-3x fa-sync-alt fa-spin" /><div className="text-bold pt-2">Loading...</div></div>
                        }
                        {props.success.erro && 
                            <div className="overlay">
                                <div className="alert alert-danger alert-dismissible">
                                    <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                    <h5><i className="icon fas fa-ban" />Error 500!</h5>
                                    {props.success.msg}
                                </div>
                            </div>
                        }
                        {props.listDataAntPtl.map((data,key) =>{
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
                                                                <button  
                                                                data-toggle="modal" 
                                                                data-target="#formAntpatologicos"
                                                                type="button" onClick={()=>getOne(data.id)} className="btn btn-primary">ver</button>
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
                        {props.listDataAntPtl.length === 0 && 
                            <div className="alert alert-danger alert-dismissible">
                                <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                <h5><i className="icon fas fa-ban" /> No se han encontrado resultados.</h5>
                                <h3> </h3>                                                   
                                Prueba con otras palabras clave o quita los filtros de búsqueda
                            </div>

                        } 
                    </div>
                </div>                    
                <div className="card-footer clearfix">
                    <button  
                    onClick={clickRegister}                   
                    type="button" 
                    data-toggle="modal" 
                    data-target="#formAntpatologicos" className="btn btn-primary float-right"><i className="fas fa-plus" /> Registrar {props.selectAnt.route}</button>
                </div>
            </div>
            <ModalLarge title={props.selectAnt.route} idModal="formAntpatologicos" >
                <div className="overlay-wrapper">         
                    <FormANTPTL                
                    handleSubmit={registrar}//para resgistrar nuevo formlario
                    actualizar={actualizar}//actualizar el formulario por noombre o por descripcion
                    handleChange={handleChange} //canbiar los datos del formulario
                    changeUpdate={changeUpdate} //cambiar los datos del formulario cuando se esta actualizando
                    isUpdate={isUpdate} // nos permite mandar un estado para saber si se va a actualizar
                    value={form} //manda los valores del formulario
                    error={erro} //verificar el estado de un error
                    load={load} // verificar el estado del load
                    resp={resp} // verificar el estado de la respuesta cuando se crea o actualiza el formulario
                    setR={setResp}// cambiar el estado de la respuesta
                    erroResp={respErro} // verifica si existe un error al registrar o actualizar el formulario
                    setErroR={setRespErro}
                    select={select} // para poder poner en true el disble de los inputs
                    /> 
                </div>
            </ModalLarge>
            
        </>
    );
}

export default ANTptl;