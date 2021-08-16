import React from 'react';
import ContHeader from '../components/ContHeader';
import DataHistorial from '../components/pacientes/HistorialPaciente';
import ModalLarge from '../components/ModalLarge';
import Pacientes from '../Routes/Paciente';
import UpdatePaciente from '../components/pacientes/Forms/UpadatePaciente';
class HistorialPaciente extends React.Component{
    _isMounted = false;
    state = {
        listP:[],
        success:{
            loading:false,
            error:null
        },
        page:{
            totalItems:'',
            totalPages:'',
            currentPage:''            
        },
        buscador:'',
        limite:10,
        number:0,
        c:0,
        paciente:{}
    }
    componentDidMount(){
        console.log('historial <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
        this._isMounted = true;
        this.handleChange();
        this.location();
    }
    location = async () => {
        if(this._isMounted){
            const path = await JSON.parse(localStorage.getItem("path"));
            const user = await JSON.parse(localStorage.getItem("tok"));
            if(path === null){
                this.props.history.push(user.user.role === 'historial' ? '/historial' : '/') 
            }
        }
    }
    handleChange = async (e) =>{   
        this.setState({
            number: 0,
            c : 0
        })
        if(this._isMounted){    
            let data = ''
            if (e){
                const { value } = e.target  
                data = value
                this.setState({
                    buscador:value
                })
            }  
            this.setState({
                success:{
                    loading:true,
                    error:null
                }
            })
            const resp = await Pacientes.buscarPaciente(data,0,this.state.limite);
            if(resp.data.success === false){
                this.setState({
                    success:{
                        loading:false,
                        error:true
                    }
                })
                setTimeout(() => this.setState({
                    success:{
                        loading:false,
                        error:null
                    }
                }), 5000)
                return;  
            }else{
                this.setState({
                    success:{
                        loading:false,
                        error:null
                    },
                    listP:resp.data.reps,
                    page:{
                        totalItems:resp.data.totalItems,
                        totalPages:resp.data.totalPages,
                        currentPage:resp.data.currentPage,
                    },
                    buscador: data
                })
            }
        }
    }
    changeLimit = async (e) => {
        const { value } = e.target;
        this.setState({
            success:{
                loading:true,
                error:null
            }
        })
        const resp = await Pacientes.buscarPaciente(this.state.buscador,this.state.page.currentPage,value);
        if(resp.data.success === false){
            this.setState({
                success:{
                    loading:false,
                    error:true
                }
            })
            setTimeout(() => this.setState({
                success:{
                    loading:false,
                    error:null
                }
            }), 5000)
            return;  
        }else{
            this.setState({
                success:{
                    loading:false,
                    error:null
                },
                listP:resp.data.reps,
                page:{
                    totalItems:resp.data.totalItems,
                    totalPages:resp.data.totalPages,
                    currentPage:resp.data.currentPage,
                },
                limite:value
            })
        }
    }
    changePage = async (page) => {      
        if (page === 0){ // para paginar la paginas
            this.setState({
                number: 0,
                c : 0
            })
        }else{
            if(page === this.state.page.totalPages - 1){
                this.setState({
                    number: this.state.page.totalPages - 4,
                    c : this.state.page.totalPages - 1
                })
            }else{
                if (page > this.state.c){
                    if(page > 2){
                        this.setState({
                            number: page - 2
                        })
                    }
                    this.setState({
                        c: page
                    })            
                }else {
                    if (page < this.state.page.totalPages - 1){
                        if(this.state.number !== 0){
                            this.setState({
                                number: page - 2 < 0 ? 0 : page - 2,
                                c : page 
                            });
                        }
                    }
                    
                }
            }
        }//paginacion de paginas
        this.setState({
            success:{
                loading:true,
                error:null
            }
        })
        const resp = await Pacientes.buscarPaciente(this.state.buscador,page,this.state.limite);
        if(resp.data.success === false){
            this.setState({
                success:{
                    loading:false,
                    error:true
                }
            })
            setTimeout(() => this.setState({
                success:{
                    loading:false,
                    error:null
                }
            }), 5000)
            return;  
        }else{
            this.setState({
                success:{
                    loading:false,
                    error:null
                },
                listP:resp.data.reps,
                page:{
                    totalItems:resp.data.totalItems,
                    totalPages:resp.data.totalPages,
                    currentPage:resp.data.currentPage,
                },
                
            })
        }
    }
    getDataPaciente = async (id_paciente)=>{
        const paciente = await this.state.listP.filter((data)=>{
            return data.id === id_paciente;
        });
        this.setState({
            paciente:paciente[0]
        })
    }
    componentWillUnmount() {
        this._isMounted = false;
        this.setState = (state,callback)=>{
            return;
        };
    }
    render(){
        return (
            <>
                <ContHeader name='Historial del paciente'/>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Lista de pacientes</h3>
                                        <div className="card-tools">
                                            <div className="input-group input-group-sm" style={{width: 250}}>
                                                <input 
                                                name="buscador"
                                                onChange={this.handleChange}
                                                value={this.state.buscador}
                                                type="text" className="form-control float-right" placeholder="Buscar" />
                                                <div className="input-group-append">
                                                    <button type="submit" className="btn btn-default">
                                                    <i className="fas fa-search" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                   
                                    <div className="card-body">
                                        <table id="example2" className="table table-bordered table-hover">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Nombres:</th>
                                                    <th>Apellidos:</th>
                                                    <th>Sexo:</th>
                                                    <th>C.I.:</th>
                                                    <th>Telefono</th>
                                                    <th>Edad:</th>
                                                    <th>Direccion:</th>
                                                    <th>Opciones</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.listP.map((data,key)=>{
                                                    return (
                                                        <tr key={key}>
                                                             <td>{key+1} {data.id}</td>
                                                            <td>{data.nombres}</td>
                                                            <td>{data.apellidos}</td>
                                                            <td>{data.sexo}</td>
                                                            <td>{data.ci}</td>
                                                            <td>{data.telefono}</td>
                                                            <td>{data.edad}</td>
                                                            <td>{data.direccion}</td>
                                                            <td>
                                                                <div className="p-2">
                                                                    <div className="row">
                                                                        
                                                                        <div className="col-4">
                                                                            <div className="btn-group btn-group-sm">
                                                                                <div 
                                                                                onClick={()=>this.getDataPaciente(data.id)}
                                                                                className="btn btn-primary" data-toggle="modal" data-target="#historialPaciente"><i className="fas fa-eye" /></div>
                                                                            </div> 

                                                                        </div>
                                                                        <div className="col-4">
                                                                            <button 
                                                                            onClick={()=>this.getDataPaciente(data.id)}
                                                                            type="button" className="btn btn-outline-primary btn-sm" data-toggle="modal" data-target="#updatePaciente">Actualizar</button>
                                                                        </div>                                                                    
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                                                                                
                                            </tbody>
                                            <tfoot>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Nombres:</th>
                                                    <th>Apellidos:</th>
                                                    <th>Sexo:</th>
                                                    <th>C.I.:</th>
                                                    <th>Telefono</th>
                                                    <th>Edad</th>
                                                    <th>Direccion</th>
                                                    <th>Opciones</th>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>                                    
                                    <div class="card-footer clearfix">
                                        <ul class="pagination pagination-sm m-0 float-right">
                                            {this.state.c > 2 && 
                                                <li  className="page-item" onClick={() =>this.changePage(0)}><div className="page-link">1</div></li>
                                            }
                                            {this.state.c > 2 && 
                                                <li  className="page-item active"><div className="page-link">....</div></li>
                                            }
                                            <List number={this.state.page.totalPages} num={this.state.number}>
                                                {(index) => {                                
                                                        return (
                                                            <li 
                                                                key={index} 
                                                                onClick={() =>this.changePage(index)} 
                                                                className={this.state.page.currentPage === index ? "page-item active" : "page-item" }
                                                            >
                                                                <div className="page-link">{index +1 }</div>
                                                            </li>
                                                        );
                                                    }                                                
                                                }
                                            </List>
                                            {this.state.c < this.state.page.totalPages-3 && 
                                                <li  className= "page-item active"><div className="page-link">....</div></li>
                                            }
                                            {this.state.c < this.state.page.totalPages-3 && 
                                                <li  
                                                className= "page-item" 
                                                onClick={() =>this.changePage(this.state.page.totalPages-1)}
                                                ><div className="page-link">{this.state.page.totalPages}</div></li>
                                            }                    
                                            <li className="page-item">                       
                                                <select name='limite' onChange={this.changeLimit} value={this.state.limite} className="form-control">
                                                    <option value='10'>10</option>
                                                    <option value='25'>25</option>
                                                    <option value='50'>50</option>
                                                    <option value='100'>100</option>
                                                </select>                       
                                            </li> 
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <ModalLarge title='Hidtorial del Paciente' idModal="historialPaciente" large="xl"> 
                    {Object.keys(this.state.paciente).length !== 0 && 
                        <DataHistorial  dataPaciente={this.state.paciente}/> 
                    }                                
                </ModalLarge> 
                <ModalLarge title='Actualizar datos del paciente' idModal="updatePaciente">
                    {Object.keys(this.state.paciente).length !== 0 && 
                        <div className="overlay-wrapper">   
                            <UpdatePaciente handleChange={this.handleChange} dataPaciente={this.state.paciente}/>
                        </div>
                    }
                </ModalLarge>
            </>
        );
    }
}
function List(props) {    
    let item = [];
    for(let i = 0; i < props.number; i++){
        item.push(props.children(i));
    }    
    const data = item.slice(0 + props.num ,5 + props.num );    
    return data
}
export default HistorialPaciente;