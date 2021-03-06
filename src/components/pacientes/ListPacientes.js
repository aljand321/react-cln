
//import { useState } from 'react';
import avatarH from '../../images/avatarH.png'
import avatarM from '../../images/avatarM.png'
function Paciente(props){
    const paciente = props.paciente;
    return (
        <>           
            <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch flex-column">
                <div className="card bg-light d-flex flex-fill">
                    <div className="card-header text-muted border-bottom-0">
                        Paciente
                    </div>
                    <div className="card-body pt-0">
                        <div className="row">
                            <div className="col-7">
                            <h2 className="lead"><b>{paciente.nombres} {paciente.apellidos}</b></h2>
                            <p className="text-muted text-sm"><b>Ocupación: </b> {paciente.ocupacion} </p>
                            <p className="text-muted text-sm"><b>Edad: </b> {paciente.edad} </p>
                            <p className="text-muted text-sm"><b>Sexo: </b> {paciente.sexo} </p>
                            <ul className="ml-4 mb-0 fa-ul text-muted">                                                                
                                { paciente.ci && 
                                    <li className="small"><span className="fa-li"><i className="fas fa-lg fa-user" /></span> C.I.: {paciente.ci}</li>
                                }
                                { paciente.telefono &&                                
                                    <li className="small"><span className="fa-li"><i className="fas fa-lg fa-phone" /></span> Telefono: {paciente.telefono}</li>
                                }
                                <li className="small"><span className="fa-li"><i className="fas fa-lg fa-building" /></span> Direccion: {paciente.direccion}</li>


                            </ul>
                            </div>
                            <div className="col-5 text-center">
                            <img src={paciente.sexo === 'M' ? avatarH : avatarM} alt="user-avatar" className="img-circle img-fluid" />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="text-right">                               
                            <div className="btn btn-sm btn-primary" onClick={() => props.clickP(paciente.id)}>
                                <i className="fas fa-user"  /> Ver Paciente
                            </div>
                        </div>
                    </div>
                </div>
            </div>           
        </>
    );
}
function List(props) {    
    let item = [];
    for(let i = 0; i < props.number; i++){
        item.push(props.children(i));
    }    
    const data = item.slice(0 + props.num ,5 + props.num );    
    return data
}

function ListPacientes(props) {    
    const success = props.success
    const pacienes = props.listP
    //const [pagNum, setPagNum] = useState(1);
    function clickP(id_paciente) {        
        props.getPaciente(id_paciente);
    }

    function datas () {
        return props.page.totalPages
    }

    return (      
        <>
            <div className="overlay-wrapper">
                {success.loading && 
                    <div className="overlay"><i className="fas fa-3x fa-sync-alt fa-spin" /><div className="text-bold pt-2">Loading...</div></div>
                }
                { success.error && 
                    <div className="overlay">
                        <div className="alert alert-danger alert-dismissible">
                            <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
                            <h5><i className="icon fas fa-ban" />Alert!</h5>
                            No se pueden enviar los datos error 500
                        </div>
                    </div>
                } 
                <section className="content">
                    
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-8 offset-md-2">
                                
                                <div className="input-group">
                                    <input 
                                        type="search" 
                                        name='buscador'
                                        className="form-control form-control-lg" 
                                        placeholder="Buscar medico" 
                                        onChange={props.handleChange}
                                        value={props.search}
                                    />                                    
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </section>  
                <br></br> 
                
                <div className="row">
                    {pacienes.map((datas,key) =>{
                        return(
                            <Paciente key={key} paciente={datas} clickP={clickP}/>
                        );
                    })}
                </div>

                
            </div>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {/* {props.pageCount > 0 && <li className="page-item">
                        <div className="page-link" aria-label="Previous">
                            <span aria-hidden="true">«</span>
                        </div>
                    </li>}   */}    
                    {props.pageCount > 2 && <li  className="page-item" onClick={() =>props.changePage(0)}><div className="page-link">1</div></li>}
                    {props.pageCount > 2 && <li  className="page-item active"><div className="page-link">....</div></li>}
          
                    <List number={datas()} num={props.num}>
                        {(index) => {                                
                                return (
                                    <li 
                                        key={index} 
                                        onClick={() =>props.changePage(index)} 
                                        className={props.page.currentPage === index ? "page-item active" : "page-item" }
                                    >
                                        <div className="page-link">{index +1 }</div>
                                    </li>
                                );
                            }
                        
                        }
                    </List> 
                    {props.pageCount < props.page.totalPages-3 && <li  className= "page-item active"><div className="page-link">....</div></li>}
                    {props.pageCount < props.page.totalPages-3 && <li  className= "page-item" onClick={() =>props.changePage(props.page.totalPages-1)}><div className="page-link">{datas()}</div></li>}
                    
                    {/* <li className="page-item">
                        <div className="page-link"  aria-label="Next">
                            <span aria-hidden="true">»</span>
                        </div>
                    </li> */}
                    <li className="page-item">                       
                        <select name='limite' onChange={props.changeLimit} value={props.limite} className="form-control">
                            <option value='8'>8</option>
                            <option value='15'>15</option>
                            <option value='25'>25</option>
                            <option value='50'>50</option>
                            <option value='100'>100</option>
                        </select>                       
                    </li>                  

                </ul>
            </nav>

        </>
    );
}

export default ListPacientes;