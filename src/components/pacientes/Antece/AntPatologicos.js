import React, { useState, useEffect } from 'react';
import ModalLarge from "../../ModalLarge";
import FormAlergias from "../Forms/FormAlergia";
import Alergias from "../../../Routes/Alergias";
import FormTransfucion from '../Forms/FormTransfucion';
import Transfuciones from '../../../Routes/Transfuciones';
import FormCirugias from '../Forms/FormCirugias';
import Cirugias from '../../../Routes/Cirugias';
import FormOtrasEnfermedades from '../Forms/OtrasEnfermedades';
import OtrasEnfermedades from '../../../Routes/OtrasEnfermedades';
function Patologicos(props) {
    const dataP = props.dataPaciente;
    const [list,setList] = useState([]);
    const [listT, setListT] = useState([]);
    const [listC, setListC] = useState([]);
    const [listE, setListE] = useState([]);


    const [erro, setErro] = useState(false);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const [callGetlist, setCAllGetList] = useState(false);
    const [callGetListTrans, setCAllGetListTrans] = useState(false);
    const [callGetListCir, setCAllGetListCir] = useState(false);
    const [callGetListEnf, setCAllGetListEnf] = useState(false);

    
    function callList() {
        //console.log('llamando al padre')
        setCAllGetList(!callGetlist);
        //setTimeout(() => setCAllGetList(false),100)
    }
    function callListTrans(p) {
        //console.log('llamando al padre')
        if(p === 1){
            setCAllGetListTrans(!callGetListTrans);
        }
        if(p === 2){
            setCAllGetListCir(!callGetListCir)
        }
        if(p === 3){
            setCAllGetListEnf(!callGetListEnf)
        }
        //setTimeout(() => setCAllGetList(false),100)
    }
    useEffect(() => {
        async function  getList () {
            setLoading(true)
            const resp = await Alergias.listAlergiasPaciente(dataP.id)
            //console.log(resp.data.resp[0].alergias)
            if(resp.data.success === false){
                setLoading(false);
                setErro(true);
                setMsg(resp.data.msg)
                setTimeout(() => setErro(true), 6000);
                return;
            }else{
                setLoading(false);
                setList(resp.data.resp[0].alergias)
                return;
            } 
        }
        getList();
    }, [dataP,callGetlist]);

    useEffect(() => {
        async function  getList () {
            setLoading(true)
            const resp = await Transfuciones.listTransfucionPaciente(dataP.id)
            //console.log(resp.data.resp[0].alergias)
            if(resp.data.success === false){
                setLoading(false);
                setErro(true);
                setMsg(resp.data.msg)
                setTimeout(() => setErro(true), 6000);
                return;
            }else{
                setLoading(false);
                setListT(resp.data.resp[0].transfuciones)
                return;
            } 
        }
        getList();
    }, [dataP,callGetListTrans]);
    useEffect(() => {
        async function  getList () {
            setLoading(true)
            const resp = await Cirugias.listCirugiasPaciente(dataP.id)
            console.log(resp.data.resp[0].cirugiasPrevias)
            if(resp.data.success === false){
                setLoading(false);
                setErro(true);
                setMsg(resp.data.msg)
                setTimeout(() => setErro(true), 6000);
                return;
            }else{
                setLoading(false);
                setListC(resp.data.resp[0].cirugiasPrevias)
                return;
            } 
        }
        getList();
    }, [dataP,callGetListCir]);
    useEffect(() => {
        async function  getList () {
            setLoading(true)
            const resp = await OtrasEnfermedades.listEnfPaciente(dataP.id)
            console.log(resp.data.resp[0].OtrasEnfermedades)
            if(resp.data.success === false){
                setLoading(false);
                setErro(true);
                setMsg(resp.data.msg)
                setTimeout(() => setErro(true), 6000);
                return;
            }else{
                setLoading(false);
                setListE(resp.data.resp[0].OtrasEnfermedades)
                return;
            } 
        }
        getList();
    }, [dataP,callGetListEnf]);

    if (props.dataPaciente !== undefined){       
        return(
            <>
                <div className='row'>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex">
                                    <div className="mr-auto p-2">
                                        <h3 className="card-title">Alergias</h3>
                                    </div>
                                    <div className="p-2">
                                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#alergias">
                                            Registrar Alergia
                                        </button>
                                    </div>
                                </div>                                                             
                            </div>
                            {/* /.card-header */}
                            <div className="card-body p-0">
                                <div className="overlay-wrapper">
                                    {loading && 
                                        <div className="overlay"><i className="fas fa-3x fa-sync-alt fa-spin"></i><div className="text-bold pt-2">Loading...</div></div> 
                                    }
                                    {erro && 
                                        <div className="overlay">
                                            <div className="alert alert-danger alert-dismissible">
                                                <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                                <h5><i className="icon fas fa-ban" />Alert!</h5>
                                                {msg}
                                            </div>
                                        </div> 
                                    }
                                    <table className="table">                              
                                        <thead>
                                            <tr>
                                                <th style={{width: 10}}>#</th>
                                                <th>Nombre</th>
                                                <th>Descripcion</th>
                                            
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list.map((data,key) =>{
                                                return(
                                                    <tr key={key}>
                                                        <td>{key+1}</td>
                                                        <td>{data.nombre}</td>
                                                        <td>
                                                            {data.descripcion}
                                                        </td>                                            
                                                    </tr>
                                                );
                                            })}                              
                                        </tbody>
                                        
                                    </table>
                                </div>
                            </div>
                            {/* /.card-body */}
                        </div>
                        {/* /.card */}
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex">
                                    <div className="mr-auto p-2">
                                        <h3 className="card-title">Tranfuciones</h3>
                                    </div>
                                    <div className="p-2">
                                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#transfucion">
                                            Registrar Transficion
                                        </button>
                                    </div>
                                </div> 
                            </div>
                            {/* /.card-header */}
                            <div className="card-body p-0">
                                <div className="overlay-wrapper">
                                    {loading && 
                                        <div className="overlay"><i className="fas fa-3x fa-sync-alt fa-spin"></i><div className="text-bold pt-2">Loading...</div></div> 
                                    }
                                    {erro && 
                                        <div className="overlay">
                                            <div className="alert alert-danger alert-dismissible">
                                                <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                                <h5><i className="icon fas fa-ban" />Alert!</h5>
                                                {msg}
                                            </div>
                                        </div> 
                                    }
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th style={{width: 10}}>#</th>
                                                <th>Nombre</th>
                                                <th>Descripcion</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listT.map((data,key) =>{
                                                return(
                                                    <tr key={key}>
                                                        <td>{key+1}</td>
                                                        <td>{data.nombre}</td>
                                                        <td>
                                                            {data.descripcion}
                                                        </td>                                            
                                                    </tr>
                                                );
                                            })}                                    
                                        </tbody>
                                    </table>
                                </div>


                            </div>
                            {/* /.card-body */}
                        </div>
                        {/* /.card */}
                    </div>

                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex">
                                    <div className="mr-auto p-2">
                                        <h3 className="card-title">Cirucias</h3>
                                    </div>
                                    <div className="p-2">
                                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#cirugias">
                                            Registrar Cirugias
                                        </button>
                                    </div>
                                </div> 
                            </div>
                            {/* /.card-header */}
                            <div className="card-body p-0">
                                <div className="overlay-wrapper">
                                    {loading && 
                                        <div className="overlay"><i className="fas fa-3x fa-sync-alt fa-spin"></i><div className="text-bold pt-2">Loading...</div></div> 
                                    }
                                    {erro && 
                                        <div className="overlay">
                                            <div className="alert alert-danger alert-dismissible">
                                                <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                                <h5><i className="icon fas fa-ban" />Alert!</h5>
                                                {msg}
                                            </div>
                                        </div> 
                                    }
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th style={{width: 10}}>#</th>
                                            <th>Nombre</th>
                                            <th>Descripcion</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            {listC.map((data,key) =>{
                                                return(
                                                    <tr key={key}>
                                                        <td>{key+1}</td>
                                                        <td>{data.nombre}</td>
                                                        <td>
                                                            {data.descripcion}
                                                        </td>                                            
                                                    </tr>
                                                );
                                            })}                                         
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* /.card-body */}
                        </div>
                        {/* /.card */}
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex">
                                    <div className="mr-auto p-2">
                                        <h3 className="card-title">Otras Enfermedades</h3>
                                    </div>
                                    <div className="p-2">
                                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#enf">
                                            Registrar Enfermedad
                                        </button>
                                    </div>
                                </div> 
                            </div>
                            {/* /.card-header */}
                            <div className="card-body p-0">
                                <div className="overlay-wrapper">
                                    {loading && 
                                        <div className="overlay"><i className="fas fa-3x fa-sync-alt fa-spin"></i><div className="text-bold pt-2">Loading...</div></div> 
                                    }
                                    {erro && 
                                        <div className="overlay">
                                            <div className="alert alert-danger alert-dismissible">
                                                <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                                                <h5><i className="icon fas fa-ban" />Alert!</h5>
                                                {msg}
                                            </div>
                                        </div> 
                                    }
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th style={{width: 10}}>#</th>
                                                <th>Nombre</th>
                                                <th>Descripcion</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                                {listE.map((data,key) =>{
                                                    return(
                                                        <tr key={key}>
                                                            <td>{key+1}</td>
                                                            <td>{data.nombre}</td>
                                                            <td>
                                                                {data.descripcion}
                                                            </td>                                            
                                                        </tr>
                                                    );
                                                })}
                                        
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                            {/* /.card-body */}
                        </div>
                        {/* /.card */}
                    </div>
                </div>
                <ModalLarge title='Alergia' idModal='alergias'>
                    <FormAlergias dataP={dataP.id} clickGetList={callList}/>
                </ModalLarge>
                <ModalLarge title='Transfucion' idModal='transfucion'>
                    <FormTransfucion dataP={dataP.id} clickGetList={callListTrans}/>
                </ModalLarge>
                <ModalLarge title='Cirugias' idModal='cirugias'>
                    <FormCirugias dataP={dataP.id} clickGetList={callListTrans}/>
                </ModalLarge>
                <ModalLarge title='Otras Enfermedades' idModal='enf'>
                    <FormOtrasEnfermedades dataP={dataP.id} clickGetList={callListTrans}/>
                </ModalLarge>
            </>
        );
    }else{
        return (
            <>
                <h1>Los datos del paciente estan nulos</h1>
            </>
        ); 
    }
    
}

export default Patologicos