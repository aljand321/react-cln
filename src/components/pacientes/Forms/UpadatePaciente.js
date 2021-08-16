import React,{useState,useEffect} from 'react';
import Pacientes from '../../../Routes/Paciente';
const dataForm = {
    nombres:'',
    apellidos:'',
    direccion:'',
    edad:'',
    ocupacion:'',
    sexo:'',
    ci:'',
    telefono:''
}
function UpdatePaciente (props){
    const [form,setForm]=useState(dataForm);
    const [erro,setError]=useState(dataForm);
    const [load,setLoad]=useState(false);
    const [resp,setResp]=useState(false);
    const [respErro,setRespErro]=useState({msg:''});
    const [verCITel,setVerCiTel]= useState({ci:false,telef:false})

    useEffect(()=>{       
        setForm(props.dataPaciente);
    },[props.dataPaciente])
    
    const change = (e) =>{
        const {name,value} = e.target;
        console.log(name,value,'nombre value')
        setForm({
            ...form,
            [name]:value
        });
        setError({
            ...erro,
            [name]:value.length === 0 ? 'Obligatorio' : ''
        })
    }

    const onsubmit = async (e)=>{
        e.preventDefault();
        let arr = {};
        for(const d in form){
            if(!form[d]){
                arr[d] = 'Obligatorio'
            }
        }
        setError(arr);
        if(Object.keys(arr).length === 0){
            try {
                setLoad(true)
                const datas = {
                    nombres:form.nombres,
                    apellidos:form.apellidos,
                    direccion:form.direccion,
                    edad:form.edad,
                    ocupacion:form.ocupacion,
                    sexo:form.sexo,
                    ci:verCITel.ci === false ? '' : form.ci,
                    telefono:verCITel.telef === false ? '' : form.telefono
                }
                const resp = await Pacientes.updatePaciente(datas,props.dataPaciente.id);
                console.log(resp.data,' esto es la respuesta que quiro ver')
                if(resp.data.success === false){
                    setLoad(false);
                    setError({
                        ...erro,
                        [resp.data.name]:resp.data.msg
                    });                    
                }else{
                   setLoad(false);
                   setResp(true); 
                   setVerCiTel({ci:false,telef:false});
                   props.handleChange();
                }
            } catch (error) {
                setLoad(false);
                setRespErro({msg:'No se puede enviar los datos'})
                console.log(error)
            }
        }
        
    }

    useEffect(() => {
        const timeout = setTimeout(() =>{
            setRespErro({msg:''})
            setResp(false);
        },3000);
        return () => {
            clearTimeout(timeout);
        }
    },[respErro,resp])

    return (
        <>     
            { load && 
                    <div className="overlay"><i className="fas fa-3x fa-sync-alt fa-spin" /><div className="text-bold pt-2">Loading...</div></div>
            }
            { resp && 
                <div className="overlay">
                    <div className="alert alert-success alert-dismissible">
                        <button type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                        <h5><i className="icon fas fa-check"></i>Genial!</h5>
                        Se actualizaron los datos
                    </div>
                </div>
            } 
            { respErro.msg && 
                <div className="overlay">
                    <div className="alert alert-danger alert-dismissible">
                        <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                        <h5><i className="icon fas fa-ban" />Alert!</h5>
                        No se pueden enviar los datos error 500
                    </div>
                </div>
            }             
            <form onSubmit={onsubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputBorder">Nombres: {erro.nombres && <code>{erro.nombres}</code>}</label>
                    <input 
                    name="nombres"
                    value={form.nombres}
                    onChange={change}
                    type="text" className="form-control form-control-border"  placeholder=".form-control-border" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputBorderWidth2">Apellidos: {erro.apellidos && <code>{erro.apellidos}</code>}</label>
                    <input 
                    name="apellidos"
                    value={form.apellidos}
                    onChange={change}
                    type="text" className="form-control form-control-border border-width-2"  placeholder=".form-control-border.border-width-2" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputBorderWidth2">direccion: {erro.direccion && <code>{erro.direccion}</code>}</label>
                    <input 
                    name="direccion"
                    value={form.direccion}
                    onChange={change}
                    type="text" className="form-control form-control-border border-width-2"  placeholder=".form-control-border.border-width-2" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputBorderWidth2">Fecha de nacimiento: {erro.edad && <code>{erro.edad}</code>}</label>
                    <input 
                    name="edad"
                    value={form.edad}
                    onChange={change}
                    type="text" className="form-control form-control-border border-width-2"  placeholder=".form-control-border.border-width-2" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputBorderWidth2">Ocupacion: {erro.ocupacion && <code>{erro.ocupacion}</code>}</label>
                    <input 
                    name="ocupacion"
                    value={form.ocupacion}
                    onChange={change}
                    type="text" className="form-control form-control-border border-width-2"  placeholder=".form-control-border.border-width-2" />
                </div>                
                <div className="form-group">
                    <label htmlFor="exampleSelectBorderWidth2">Sexo: {erro.sexo && <code>{erro.sexo}</code>}</label>
                    <select 
                    name="sexo"
                    value={form.sexo}
                    onChange={change}
                    className="custom-select form-control-border border-width-2" >
                        <option value=''>Selecione</option>
                        <option value='M'>Hombre</option>
                        <option value='F'>Mujer</option>                        
                    </select>
                </div>
                <div className="form-group">
                    
                    <div className="d-flex">
                        <div className="mr-auto p-2">
                            <label htmlFor="exampleInputBorderWidth2">C.I.: {erro.ci && <code>{erro.ci}</code>}</label>
                        </div>
                        <div className="p-2">
                           <div className="btn-group btn-group-sm">
                                { verCITel.ci === false &&<div onClick={() => setVerCiTel({ci:true,telef:false})} className="btn btn-default"><i className="fas fa-edit" /></div>}

                                { verCITel.ci === true &&<div onClick={() => setVerCiTel({ci:false,telef:false})} className="btn btn-default"><i className="fas fa-save" /></div>}
                           </div>
                        </div>
                    </div>
                    <input 
                    name="ci"
                    value={form.ci}
                    onChange={change}
                    disabled={!verCITel.ci}
                    type="text" className="form-control form-control-border border-width-2" placeholder=".form-control-border.border-width-2" />
                </div>
                <div className="form-group">
                    
                    <div className="d-flex">
                        <div className="mr-auto p-2">
                            <label htmlFor="exampleInputBorderWidth2">Telefono: {erro.telefono && <code>{erro.telefono}</code>}</label>
                        </div>
                        <div className="p-2">
                            <div className="btn-group btn-group-sm">
                                { verCITel.telef === false &&<div onClick={() => setVerCiTel({ci:false,telef:true})} className="btn btn-default"><i className="fas fa-edit" /></div>}

                                { verCITel.telef === true &&<div onClick={() => setVerCiTel({ci:false,telef:false})} className="btn btn-default"><i className="fas fa-save" /></div>}
                           </div>
                        </div>
                    </div>
                    <input 
                    name="telefono"
                    value={form.telefono}
                    onChange={change}
                    disabled={!verCITel.telef}
                    type="text" className="form-control form-control-border border-width-2"  placeholder=".form-control-border.border-width-2" />
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
export default UpdatePaciente;