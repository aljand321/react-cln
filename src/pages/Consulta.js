import React from 'react';

import ContHeader from '../components/ContHeader';
import ModalLarge from '../components/ModalLarge';
import FormPaciente from '../components/pacientes/formPaciente';
import ListPacientes from '../components/pacientes/ListPacientes';
import Pacientes from '../Routes/Paciente';
import DataPaciente from '../components/pacientes/DataPaciente';
class Consulta extends React.Component{
    _isMounted = false;
    state={
        success:{
            loading:false,
            error:null
        },        
        listP:[],
        page:{
            totalItems:'',
            totalPages:'',
            currentPage:''            
        },
        buscador:'',
        limite:'',
        windows:{            
            list:[]
        },
        list0:{},
        selected:{},
        number:0,
        c:0,
        activeWindows:0

    }
    componentDidMount(){
        console.log('consulta <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
        this._isMounted = true;
        this.handleChange();
        this.location();
    }
    location = async () => {
        if(this._isMounted){
            const path = await JSON.parse(localStorage.getItem("path"));
            const user = await JSON.parse(localStorage.getItem("tok"));
            if(path === null){
                this.props.history.push(user.user.role === 'medico' ? '/consulta' : '/') 
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
    
    getPaciente = async (id_paciente) =>{
        this.setState({
            success:{
                loading:true,
                error:null
            }
        })
        const resp = await Pacientes.onePaciente(id_paciente);
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
            
            let arr = this.state.windows.list.filter(function(data){
                return data.id === id_paciente
            })
            
            if(arr.length === 0){
                this.setState({
                    windows:{
                        list:[].concat(this.state.windows.list, resp.data.resp)
                    }
                })
            }      
            this.setState({
                success:{
                    loading:false,
                    error:null
                },                          
            }) 
            this.selectedPciente(resp.data.resp.id)
        }
    }
    
    selectedPciente = (id) =>{
        if(id === 0){
            this.setState({
                activeWindows : 0
            })
        }else{
            let selec = this.state.windows.list.filter(function(data){
                return data.id ===  id
            })
            this.setState({
                selected:selec[0],
                activeWindows : id
            }) 
        }
        
    }
    removeSelect(id) {        
        let p = 0, arr = this.state.windows.list
        for (let i = 0; i < this.state.windows.list.length; i++) {
            if(this.state.windows.list[i].id === id){
                p = i
            }        
        };
        arr.splice(p,1);
        this.setState({
            window:{
                list : arr
            },
            activeWindows : 0
        });
    }
    componentWillUnmount() {
        this._isMounted = false;
        this.setState = (state,callback)=>{
            return;
        };
    }
    render(){
        return(
            <React.Fragment>
                <ContHeader name='Consultorio'>
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#paciente">
                        Registrar Paciente
                    </button>
                </ContHeader>

                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-primary card-tabs">
                            <div className="card-header p-0 pt-1">
                                <ul className="nav nav-tabs" id="custom-tabs-five-tab" role="tablist">
                                    <li className="nav-item">
                                        <a onClick={() => this.selectedPciente(0)}
                                        className={this.state.activeWindows === 0 ? "nav-link active" : "nav-link"} 
                                        id="custom-tabs-five-overlay-tab" 
                                        data-toggle="pill" 
                                        href="#custom-tabs-five-overlay" 
                                        role="tab" 
                                        aria-controls="custom-tabs-five-overlay" 
                                        aria-selected="true">Pacientes</a>
                                    </li>
                                    {this.state.windows.list.map((data,key) =>{
                                        return(
                                            <li className="nav-item" key={key} >
                                                <a onClick={() => this.selectedPciente(data.id)}
                                                onDoubleClick={() => this.removeSelect(data.id)}
                                                className={this.state.activeWindows === data.id ? "nav-link active" : "nav-link"} 
                                                id="custom-tabs-five-overlay-dark-tab" 
                                                data-toggle="pill" 
                                                href="#custom-tabs-five-overlay-dark" 
                                                role="tab" 
                                                aria-controls="custom-tabs-five-overlay-dark" 
                                                aria-selected="false">{data.nombres}</a>
                                            </li>
                                        );
                                    })}
                                    
                                    
                                </ul>
                            </div>
                            <div className="card-body">
                                <div className="tab-content" id="custom-tabs-five-tabContent">
                                    <div 
                                     className={this.state.activeWindows === 0 ? "tab-pane fade show active" : "tab-pane fade show"}                                     
                                     id="custom-tabs-five-overlay" role="tabpanel" aria-labelledby="custom-tabs-five-overlay-tab">
                                        <ListPacientes 
                                            changePage={this.changePage} 
                                            changeLimit={this.changeLimit} 
                                            limite={this.state.limite} 
                                            page={this.state.page} 
                                            handleChange={this.handleChange} 
                                            search={this.state.buscador} 
                                            listP={this.state.listP} 
                                            success={this.state.success} 
                                            getPaciente={this.getPaciente}
                                            num={this.state.number}
                                            pageCount={this.state.c}
                                        />
                                    </div>
                                    
                                    <div
                                    className={this.state.activeWindows === this.state.selected.id ? "tab-pane fade show active" : "tab-pane fade show"}   
                                    
                                    id="custom-tabs-five-overlay-dark" 
                                    role="tabpanel" 
                                    aria-labelledby="custom-tabs-five-overlay-dark-tab">
                                        <DataPaciente dataPaciente={this.state.selected} identify="null"></DataPaciente>
                                    </div>
                                       
                                </div>
                            </div>
                            {/* /.card */}
                        </div>
                    </div>
                </div>

                <ModalLarge title='Registrar Paciente' idModal='paciente'>
                    <FormPaciente handleChange={this.handleChange} selectedPciente={this.getPaciente} desde="paciente"/>
                </ModalLarge>      
            </React.Fragment>
        );
    }        
}

export default Consulta;