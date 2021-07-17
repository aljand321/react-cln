import React, { useState,useEffect } from 'react'
import ContHeader from '../components/ContHeader'
import img from '../images/user_icon.png'
import MedicoRoutes from '../Routes/Medico'
const cnt = {
    nombres:'',
    apellidos:'',    
    direccion:'',
    edad:'',
    especialidad : '',
}

function UserContac() {
    const [contact, setContact] = useState(cnt);
    const [load, setLoad] = useState(false);
    const [err, setErr] = useState(cnt);
    const [resp, setResp] = useState(false);
    const [respErro, setRespErro] = useState(false);
    const [disable, setDisable] = useState(true);
    const [permisos, setPermisos] = useState({msg:''})
    const [ci, setCi] = useState({ci:'',select:false, msg:''});
    const [telefono, setTelefono] = useState({telefono:'',select:false,msg:''});
    const [email, setEmail] = useState({email:'',select:false,msg:''});
    const [role, setRole] = useState({role:''});
    const getData = async () => {
        const user = await JSON.parse(localStorage.getItem("tok"));
        
        try {
            setLoad(true);
            const resp = await MedicoRoutes.medico(user.user.id)
            console.log(resp.data);
            if(resp.data.success === false) {
                setLoad(false);
                setRespErro(true);
                setTimeout(() =>setRespErro(false),6000);
            }else{
                setLoad(false);                
                setContact({
                    nombres:resp.data.resp.nombres === null ? '' : resp.data.resp.nombres,
                    apellidos:resp.data.resp.apellidos === null ? '' : resp.data.resp.apellidos,
                    direccion:resp.data.resp.direccion === null ? '' : resp.data.resp.direccion,
                    edad:resp.data.resp.edad === null ? '' : resp.data.resp.edad,
                    especialidad : resp.data.resp.especialidad === null ? '' : resp.data.resp.especialidad                    
                });
                setCi({ci:resp.data.resp.ci,select:false,msg:''});
                setEmail({email:resp.data.resp.email,select:false,msg:''});
                setTelefono({telefono:resp.data.resp.telefono,select:false,msg:''})
                setRole({role:resp.data.resp.role});
            }
        } catch (error) {
            setRespErro(true);
            setTimeout(() =>setRespErro(false),6000);
          
        }

    }
    useEffect(() => {
        getData();
    },[])
    const onChange = (e) => {
        const {name,value}=e.target;
        setContact({
            ...contact,
            [name]:value
        })
        setErr({
            ...err,
            [name]:value.length === 0 ? 'Obligatorio' : ''
        })
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        const user = await JSON.parse(localStorage.getItem("tok"));
        try {
            let obj = {}
            for(const key in contact) {
                if(!contact[key]){
                    obj[key] = `Obligatorio`
                }
            }
            setErr(obj)
            if(Object.keys(obj).length !== 0) {
                return;
            }
            setLoad(true);
            const resp = await MedicoRoutes.updateContact(contact,user.user.id);
            console.log(resp.data);
            if(resp.data.success === false){
                setLoad(false);
                setErr({
                    ...resp,
                    [resp.data.name]:resp.data.msg
                })
                timeMsg(resp.data.msg);
            }else{
                setLoad(false);
                setResp(true);
                getData();
                setDisable(true);
                setTimeout(() => setResp(false),3000);
            }
        } catch (error) {
            setRespErro(true);
            setTimeout(() =>setRespErro(false),6000);
            console.log(error)
        }
    }

    const updateCi = async () =>{
        const user = await JSON.parse(localStorage.getItem("tok"));
        try {
            const data = {
                ci:ci.ci,
                email:'',
                telefono:0
            }
            const resp = await MedicoRoutes.updateContact(data,user.user.id)
            if(resp.data.success === false){
                setCi({ci:ci.ci,select:true,msg:resp.data.msg})
                timeMsg(resp.data.msg);
            }else{
                setCi({ci:ci.ci,select:false,msg:'Se actualizo C.I'});
                setTimeout(() =>setCi({ci:ci.ci,select:false,msg:''}), 3000);              
            }
        } catch (error) {
            setRespErro(true);
            setTimeout(() =>setRespErro(false),6000);
            console.log(error)
        }
    }
    const changeCI = (e) =>{
        const {value} = e.target;
        setCi({
            ci:value,
            select:true,
            msg:''
        })
    }
    const updateTelefono = async () =>{
        const user = await JSON.parse(localStorage.getItem("tok"));
        try {
            const data = {
                ci:'',
                email:'',
                telefono:telefono.telefono
            }
            const resp = await MedicoRoutes.updateContact(data,user.user.id)
            if(resp.data.success === false){
                setTelefono({telefono:telefono.telefono,select:true,msg:resp.data.msg})
                timeMsg(resp.data.msg);
            }else{
                setTelefono({telefono:telefono.telefono,select:false,msg:'Se actualizo Telefono'});
                setTimeout(() =>setTelefono({telefono:telefono.telefono,select:false,msg:''}), 3000);
              
            }
        } catch (error) {
            setRespErro(true);
            setTimeout(() =>setRespErro(false),6000);
            console.log(error)
        }
    }
    const changeTelefono = (e) =>{
        const {value} = e.target;
        setTelefono({
            telefono:value,
            select:true,
            msg:''
        })
    }
    const updateEmail = async () =>{
        const user = await JSON.parse(localStorage.getItem("tok"));
        try {
            const data = {
                ci:'',
                email:email.email,
                telefono:0
            }
            const resp = await MedicoRoutes.updateContact(data,user.user.id)
            if(resp.data.success === false){
                setEmail({email:email.email,select:true,msg:resp.data.msg})
                timeMsg(resp.data.msg);
            }else{
                setEmail({email:email.email,select:false,msg:'Se actualizo Email'});
                setTimeout(() =>setEmail({email:email.email,select:false,msg:''}), 3000);
            
            }
        } catch (error) {
            setRespErro(true);
            setTimeout(() =>setRespErro(false),6000);
            console.log(error)
        }
    }
    const changeEmail = (e) =>{
        const {value} = e.target;
        setEmail({
            email:value,
            select:true,
            msg:''
        })
    }
    const timeMsg = (msg) => {
        setPermisos({
            msg:msg
        })
        setTimeout(()=>setPermisos({msg:''}),3000);
    }
    return (
        <>           
            <ContHeader name='Datos del usario'>
                {/* <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#medico">
                    Contacto
                </button> */}
            </ContHeader>
           
            <section className="content">
                <div className="overlay-wrapper">   
                    {load && 
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
                    {permisos.msg &&
                        <div className="overlay">
                            <div className="alert alert-warning alert-dismissible">
                                <button type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                                <h5><i className="icon fas fa-check"></i>Error!</h5>
                                <h3>{permisos.msg}</h3>
                                
                            </div>
                        </div>
                    }
                    {resp &&
                        <div className="overlay">
                            <div className="alert alert-success alert-dismissible">
                                <button type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                                <h5><i className="icon fas fa-check"></i>Genial!</h5>
                                <h3>Se actualizo los datos</h3>                                
                            </div>
                        </div>
                    }
                    <div className="card">
                        <div className="card-body row">
                            <div className="col-5 text-center d-flex align-items-center justify-content-center">
                                <div>
                                    {/* <h2>Admin<strong>LTE</strong></h2> */}
                                    <img src={img} alt="user-avatar" className="img-circle img-fluid" />
                                    
                                </div>
                            </div>
                            <div className="col-7">
                                <div className="card-body">
                                    <form onSubmit={onSubmit} >                               
                                        <div className="row">
                                            <div className="col-sm-6">
                                                {/* text input */}
                                                <div className="form-group">
                                                    <label>Nombre(s) {err.nombres && <code>{err.nombres}</code>}</label>
                                                    <input 
                                                        name="nombres" 
                                                        onChange={onChange} 
                                                        type="text" 
                                                        className="form-control" value={contact.nombres}
                                                        disabled={disable}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                {/* text input */}
                                                <div className="form-group">
                                                    <label>Apellido(s) {err.apellidos && <code>{err.apellidos}</code>}</label>
                                                    <input 
                                                        name="apellidos" 
                                                        onChange={onChange} 
                                                        type="text" 
                                                        className="form-control" 
                                                        value={contact.apellidos}
                                                        disabled={disable}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                {/* text input */}
                                                <div className="form-group">
                                                    <label>Especialidad {err.especialidad && <code>{err.especialidad}</code>}</label>                                               
                                                    <select 
                                                    name="especialidad" 
                                                    onChange={onChange} 
                                                    value={contact.especialidad}
                                                    disabled={disable}
                                                    className="custom-select form-control-border border-width-2">
                                                        <option value="">Selecione</option>
                                                        <option value="Pediatra">Pediatra</option>
                                                        <option value="Neurologo">Neurologo</option>
                                                        <option value="Endoscopia">Endoscopia</option>
                                                        <option value="Hematología">Hematología</option>
                                                    </select>
                                                </div>
                                            </div>
                                            
                                            
                                            <div className="col-sm-6">
                                                {/* text input */}
                                                <div className="form-group">
                                                    <label>Edad {err.edad && <code>{err.edad}</code>}</label>
                                                    <input 
                                                        name="edad" 
                                                        onChange={onChange} 
                                                        type="date" 
                                                        className="form-control" 
                                                        value={contact.edad.split('T')[0]}
                                                        disabled={disable}
                                                    />
                                                </div>
                                            </div>
                                            
                                            
                                        </div>
                                        <div className="row">
                                            
                                            <div className="col-sm-6">
                                                {/* text input */}
                                                <div className="form-group">
                                                    <label>Direccion {err.direccion && <code>{err.direccion}</code>}</label>
                                                    <input 
                                                        name="direccion" 
                                                        onChange={onChange} 
                                                        type="text" 
                                                        className="form-control" 
                                                        value={contact.direccion}
                                                        disabled={disable}
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div className="col-sm-6">
                                                {/* text input */}
                                                <div className="form-group">
                                                    <label>Cargo</label>
                                                    
                                                    <select                                                   
                                                    disabled                  
                                                    className="custom-select form-control-border border-width-2">                                                    
                                                        <option value="medico">Medico</option>                                                                              
                                                    </select>
                                                </div>
                                            </div>
                                                                                    
                                            <div className="col-sm-6">
                                                {/* text input */}
                                                <div className="form-group">
                                                    {role.role === 'admin' ? 
                                                        <div className="d-flex">
                                                            <div className="mr-auto p-2">
                                                                <label>C.I. {ci.msg && <code>{ci.msg}</code> }</label>
                                                            </div>
                                                            <div className="p-2">
                                                                <div className="btn-group btn-group-sm">
                                                                    {ci.select === false && <div onClick={() => setCi({ci:ci.ci,select:true,msg:''})} className="btn btn-default"><i className="fas fa-edit" /></div> }
                                                                    {ci.select === true && <div onClick={updateCi} className="btn btn-default"><i className="fas fa-save" /></div>}                                                          
                                                                </div>
                                                            </div>
                                                        </div>  
                                                    :   
                                                        <label>C.I.</label>
                                                    }                                              
                                                    <input 
                                                        name="ci" 
                                                        onChange={changeCI}
                                                        type="text" 
                                                        className="form-control" 
                                                        value={ci.ci}
                                                        disabled={!ci.select}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                {/* text input */}
                                                <div className="form-group">
                                                    {role.role === 'admin' ? 
                                                        <div className="d-flex">
                                                            <div className="mr-auto p-2">
                                                                <label>Email {email.msg && <code>{email.msg}</code>}</label>
                                                            </div>
                                                            <div className="p-2">
                                                                <div className="btn-group btn-group-sm">
                                                                    {email.select === false && <div onClick={() => setEmail({email:email.email,select:true,msg:''})} className="btn btn-default"><i className="fas fa-edit" /></div>}  
                                                                    {email.select === true &&<div onClick={updateEmail} className="btn btn-default"><i className="fas fa-save" /></div> }                                                        
                                                                </div>

                                                            </div>
                                                        </div> 
                                                    :
                                                        <label>Email</label>
                                                    }
                                                    <input 
                                                        name="email" 
                                                        onChange={changeEmail}
                                                        type="email" 
                                                        className="form-control" 
                                                        value={email.email}
                                                        disabled={!email.select}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                {/* text input */}
                                                <div className="form-group">
                                                    {role.role === 'admin' ?                                                     
                                                        <div className="d-flex">
                                                            <div className="mr-auto p-2">
                                                                <label>Telefono  {telefono.msg && <code>{telefono.msg}</code>}</label>
                                                            </div>
                                                            <div className="p-2">
                                                                <div className="btn-group btn-group-sm">
                                                                    {telefono.select === false && <div onClick={() => setTelefono({telefono:telefono.telefono,select:true,msg:''})} className="btn btn-default"><i className="fas fa-edit" /></div>}  
                                                                    {telefono.select === true && <div onClick={updateTelefono} className="btn btn-default"><i className="fas fa-save" /></div>}                                               
                                                                </div>

                                                            </div>
                                                            
                                                        </div>
                                                    :
                                                        <label>Telefono</label>
                                                    } 
                                                    <input 
                                                        name="telefono" 
                                                        onChange={changeTelefono}
                                                        type="text" 
                                                        className="form-control" 
                                                        value={telefono.telefono}
                                                        disabled={!telefono.select}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {role.role === 'admin' && <div className="d-flex">
                                            <div className="mr-auto p-2">
                                                {disable === true && 
                                                    <button type="button" onClick={() =>setDisable(!disable)} className="btn btn-default">Actualizar</button>
                                                }
                                            </div>
                                            <div className="p-2">
                                                {disable === false && 
                                                    <button type="submit" className="btn btn-primary">Registrar</button>
                                                }
                                            </div>
                                        </div>}
                                    </form>
                                </div>

                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
           


        </>
    )
}

export default UserContac
