import React from 'react';

import ContHeader from '../components/ContHeader';
import ModalLarge from '../components/ModalLarge';
import FormPaciente from '../components/pacientes/formPaciente';
import ListPacientes from '../components/pacientes/ListPacientes';
import Pacientes from '../Routes/Paciente';
import DataPaciente from '../components/pacientes/DataPaciente';
class Consulta extends React.Component{
    state={
        success:{
            loading:false,
            error:null
        },        
        listP:[],
        page:{
            totalItems:'',
            totalPages:'',
            currentPage:'',
        },
        buscador:'',
        limite:'',
        windows:{            
            list:[]
        },
        list0:{},
        selected:{}
    }
    componentDidMount(){
        this.handleChange();
    }
    listPacientes = async () =>{
        this.setState({
            success:{
                loading:true,
                error:null
            }
        })
        try {
            const resp = await Pacientes.pacientes();
            if (resp.data.success ===false){
              
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
            }

            this.setState({
                success:{
                    loading:false,
                    error:null
                },
                listP:resp.data.resp
                
            })
        } catch (error) {
            this.setState({
                success:{
                    loading:false,
                    error:true
                }
            })
        }
    }
    handleChange = async (e) =>{       
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
        }
    }
    
    selectedPciente = (id) =>{
        let selec = this.state.windows.list.filter(function(data){
            return data.id ===  id
        })
        this.setState({
            selected:selec[0]
        }) 
    }
    /* remove_user(id) {
        delete data_user[id];
    } */
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
                                        <a className="nav-link active" 
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
                                                className="nav-link" 
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
                                    <div className="tab-pane fade show active" id="custom-tabs-five-overlay" role="tabpanel" aria-labelledby="custom-tabs-five-overlay-tab">
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
                                        />
                                    </div>
                                    
                                    <div
                                    className="tab-pane fade" 
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
                    <FormPaciente handleChange={this.handleChange}/>
                </ModalLarge>      
            </React.Fragment>
        );
    }        
}

export default Consulta;