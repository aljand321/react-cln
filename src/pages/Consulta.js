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
        selected:''
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
    insert = async (id_paciente, data) => {
        let paciente = this.state.list0
        let p = paciente[id_paciente];
        if(!p){
            p = paciente[id_paciente] = {
                data:data,
                qty:0
            }
        }
        p.qty++;
        this.array();
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
            this.insert(id_paciente, resp.data.resp);            
            this.setState({
                success:{
                    loading:false,
                    error:null
                },                          
            }) 
        }
    }
    array = () => {
        let arr = [];        
        for (const id in this.state.list0) {
            arr.push(this.state.list0[id]);
        }
        this.setState({
            windows:{
                list:arr
            }
        });        
    }
    selectedPciente = (position) =>{
        this.setState({
            selected:position
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
                                                <a onClick={() => this.selectedPciente(key)}
                                                className="nav-link" 
                                                id="custom-tabs-five-overlay-dark-tab" 
                                                data-toggle="pill" 
                                                href="#custom-tabs-five-overlay-dark" 
                                                role="tab" 
                                                aria-controls="custom-tabs-five-overlay-dark" 
                                                aria-selected="false">{data.data.nombres}</a>
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
                                        <DataPaciente dataPaciente={this.state.windows.list[this.state.selected]}></DataPaciente>
                                    </div>
                                       
                                   
                                    
                                    
                                </div>
                            </div>
                            {/* /.card */}
                        </div>
                    </div>
                </div>


                {/* <div className="row">
                    <div className="col-md-12">
                        <div className="card card-default card-tabs">
                            <div className="card-header p-0 pt-1">
                                <ul className="nav nav-tabs" id="custom-tabs-five-tab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" 
                                        ata-toggle="pill" 
                                        id="custom-tabs-five-overlay-tab"
                                        href="#custom-tabs-five-overlay" 
                                        role="tab"
                                         aria-controls="custom-tabs-five-overlay" 
                                         aria-selected="true">Pacientes {this.state.windows.list.length}</a>
                                    </li>
                                    {this.state.windows.list.map((data,key) =>{
                                         return (
                                            <li  key={key} className="nav-item">
                                                <a
                                                className="nav-link" 
                                                data-toggle="pill" 

                                                href="#custom-tabs-five-overlay-dark" 
                                                role="tab" 
                                                aria-controls="custom-tabs-five-overlay-dark" 
                                                aria-selected="false">{data.data.nombres}</a>
                                            </li>
                                        );
                                        
                                    })}                                    
                                    
                                </ul>
                            </div>
                            <div className="card-body">
                                <div className="tab-content" id="custom-tabs-five-tabContent">
                                    <div className="tab-pane fade show active" id="custom-tabs-five-overlay" role="tabpanel" aria-labelledby="custom-tabs-five-overlay-tab">
                                        <div className="overlay-wrapper">                                           
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
                                        
                                    </div>

                                    <div className="tab-pane fade" id="custom-tabs-five-overlay-dark" role="tabpanel" aria-labelledby="custom-tabs-five-overlay-dark-tab">
                                        <div className="overlay-wrapper">                                        
                                            <DataPaciente ></DataPaciente>                         
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                           
                        </div>
                    </div>
                </div> */}


                <ModalLarge title='Registrar Paciente' idModal='paciente'>
                    <FormPaciente handleChange={this.handleChange}/>
                </ModalLarge>      
            </React.Fragment>
        );
    }        
}

/* function List(props) {
    console.log(props,Object.keys(props.data).length);
    let item = [];
    
    for(let i = 0; i < Object.keys(props.data).length; i++){
        if(props.data)
        item.push(props.children(i));
    }
        
    console.log(item);
    
    return item
} */

export default Consulta;