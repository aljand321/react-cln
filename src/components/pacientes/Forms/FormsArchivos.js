import React,{useState,useEffect} from 'react';
import './style/StyleFormFile.css'
import pdf from '../../../images/pdf.png'
import Pacientes from '../../../Routes/Paciente';


function FormArchivos (props){
    const [filesD,setFiles] = useState([])
    const [erroMsg,setErroMsg] = useState('')
    const [load,setLoad] = useState(0);
    const [resp,setResp] = useState(false);
    const [respError,setRespErro] = useState('');
     // aniade las imagenes al array
    const changeDatasFiles = (e) =>{
        const {files,value,name } = e.target;
       
        if(name === 'files'){
            let arr = [];
            for(let i = 0; i < files.length; i++){
                arr.push({
                    descripcion:'',
                    files:files[i]
                })
            }
            setFiles(arr);  
        }else{//insertando al arr filesD la descripcion
            let arr1 = [], p = name * 1;
            for(let i = 0; i < filesD.length; i++){
                if(i === p){
                    arr1.push({
                        descripcion:value,
                        files:filesD[i].files
                    })
                }else{
                    arr1.push({
                        descripcion:filesD[i].descripcion,
                        files:filesD[i].files
                    })
                }
            }
            setFiles(arr1);            
        }
             
    }
    
    //elimina una imagen del array segun lo que seleciona
    const deleteP = (p)=>{
        let arr = [];
        for( let i = 0; i < filesD.length; i++){
            if( i !== p ){
                arr.push(filesD[i]);
            }
        }
        setFiles(arr);
    }
    //elimina todas las imagenes del array
    const deleteAll =()=>{
        setFiles([]);
    }
    //leer la imagen para mostar el preview de la imagen
    const readImg = (file) => {
        let imgData = '';
        imgData = URL.createObjectURL(file);
        return imgData;                    
    };
    //registrar las imagenes del array
    const registrar = async (e) =>{
        e.preventDefault();
        if(filesD.length === 0){
            setErroMsg('Selecione alguna imagen o pdf');           
        }else{
            let erro = false;
            for(let i = 0; i < filesD.length; i++){
                if(filesD[i].descripcion.length === 0){
                    setErroMsg('Las Descripciones de cada archivo son obligatorios');                   
                    erro = true;
                }
            }
            if(erro === false){               
                try {                   
                    for(let i = 0; i < filesD.length; i++){
                        const resp = await Pacientes.regArchivos(props.dataPaciente,filesD[i]);
                        if(resp.data.success === false){                           
                            setErroMsg(resp.data.msg);
                            return;
                        }else{
                            setLoad((i*100)/(filesD.length - 1));                            
                            if(i === filesD.length - 1){                                
                                setResp(true);   
                                props.callList(); 
                            }
                        }
                    }                    
                } catch (error) {
                    setRespErro('no se puede enviar los datos')
                    console.log(error);
                }
            }
            
        }
    }
    useEffect(() => {
        const timeout = setTimeout(() =>{
            setResp(false);
            setLoad(0);
            setFiles([])
            setErroMsg('')
        },2000);
        return () => clearTimeout(timeout);
    },[resp,load,erroMsg])
    return (
        <>
            {resp && 
                <div className="overlay">
                    <div className="alert alert-success alert-dismissible">
                        <button type="button" onClick={()=> setResp(false)} className="close" data-dismiss="alert" aria-hidden="true">×</button>
                        <h5><i className="icon fas fa-ban" />Genial!</h5>
                        Se enviaron los datos
                    </div>
                </div>
            }  
            {erroMsg && 
                <div className="overlay">
                    <div className="alert alert-danger alert-dismissible">
                        <button onClick={()=> setErroMsg(false)} type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                        <h5><i className="icon fas fa-ban" />Error!</h5>
                        {erroMsg}
                    </div>
                </div>
            } 
            {respError && 
                <div className="overlay">
                    <div className="alert alert-danger alert-dismissible">
                        <button onClick={()=> setRespErro('')} type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                        <h5><i className="icon fas fa-ban" />Error!</h5>
                        {respError}
                    </div>
                </div>
            } 
            <form >
                <div className="card-body">
                    <div id="actions" className="row">
                        <div className="col-lg-4">
                            <div className="btn-group w-100">                              

                                <div onClick={registrar} type="submit" className="contbuttonRegidter">                                              
                                    <label className="labelFile1">Registrar</label>
                                </div>
                                <div className="contbuttonCancel" onClick={deleteAll}>                                        
                                    <label className="labelFile2" >Cancelar</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 d-flex align-items-center">
                            <div className="fileupload-process w-100">
                                <div id="total-progress" className="progress progress-striped active" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}>
                                    <div className="progress-bar progress-bar-success" style={{width: `${load}%`}} data-dz-uploadprogress />
                                </div>
                            </div>
                        </div>
                    </div>    
                    <br/>                                
                    {filesD.map((data,key) => {                       
                        return(
                            <div key={key} className="contentFiles">
                                <div className="rightFileView">  
                                    {data.files.name.split('.')[1] === 'pdf' ? 
                                        <img className="imagePdf1" src= {pdf} alt="img"/>
                                    :
                                        <img className="imagePdf" src= {readImg(data.files)} alt="img"/>
                                    }                                 
                                    
                                </div>
                                <div className="centerTextDescription">
                                    {data.files.name}
                                    <div className="form-group">                                                        
                                        <textarea 
                                        name={`${key}`}
                                        onChange={changeDatasFiles}
                                        value={data.descripcion}
                                        className="form-control" rows={3} placeholder="Descripcion del archivo" />
                                    </div>
                                </div>
                                <div className="leftButtons">
                                    <div className="btn-group btnFiles">                               
                                        <button type='button' onClick={()=>deleteP(key)} data-dz-remove className="btn btn-danger delete">
                                            <i className="fas fa-trash" />
                                            <span>Quitar</span>
                                        </button>
                                    </div>
                                </div>);
                            </div>                            
                        );
                    })}
                  
                    <br/>
                    <div className="col-lg-6 d-flex align-items-center">
                        <input name="files" type="file" multiple onChange={changeDatasFiles} ></input>
                    </div>
                </div>                                                   
            </form>
            <br/>
        </>
    );
}

export default FormArchivos;