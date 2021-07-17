import React from 'react';
//import { Link } from 'react-router-dom';
import MedicosList from '../components/Medico/ListMed';
import ModalLarge from '../components/ModalLarge';
import ContHeader from '../components/ContHeader';
import FormMed from '../components/Medico/Form';
import MedicoRoutes from '../Routes/Medico';
import MedicoDatas from '../components/Medico/PerfilMedico';
import ListUsers from '../components/Medico/ListUsers';

class About extends React.Component{
    
    state = {
        success:{
            loading:false,
            error:null,
        },        
        data:[],
        dataUsers:[],
        showWindow:false,
        active:'1',
        dataMedico:{}
    }
    componentDidMount(){
        this.getListMedicos();
        this.getListUsers();
    }

    getListMedicos = async () =>{
        try {
            this.setState({
                success:{
                    loading:true,
                    error:null,
                }
            });
            const resp = await MedicoRoutes.listMedicos();
            if(resp.data.success === false){
                console.log('no se puede mostrar los datos')
                this.setState({
                    success:{
                        loading:false,
                        error:true,
                    }
                });
            }else{
                this.setState({
                    success:{
                        loading:false,
                        error:null,
                    }
                });
                this.setState({
                    data:resp.data.resp
                })
            }
        } catch (error) {
            console.log(error)
            this.setState({
                success:{
                    loading:false,
                    error:true,
                }
            });
            return error
        }
    }
    getListUsers = async () =>{
        try {
            this.setState({
                
            })
            const resp = await MedicoRoutes.listUsers();            
            if(resp.data.success === false){
                console.log('no se puede mostrar los datos')
            }else{
                this.setState({
                    dataUsers:resp.data.resp
                })
            }
        } catch (error) {
            console.log(error)
            return error
        }
    }
    medicoId = async (id) =>{
       
        this.setState({
            showWindow : true,
            active:'2'
        })
        try {
            const resp = await MedicoRoutes.medico(id);
            
            if(resp.data.success === false){
                console.log('no se puede mostrar los datos')
            }else{
                this.setState({
                    dataMedico:resp.data.resp
                })
            }
        } catch (error) {
            console.log(error)
            return error
        }
    }
    cahngeWindow = (selected) =>{
        this.setState({
            active: selected
        });
    }
    callBack =() =>{
        this.getListUsers();
        this.getListMedicos();
    }
    render() {
        return(
            <React.Fragment>                
                <ContHeader name='Medicos'>
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#medico">
                        Registrar Medico
                    </button>
                </ContHeader>

                <div className="row">
                    <div className="col-12 col-sm-12">
                        <div className="card card-default card-tabs">
                            <div className="card-header p-0 pt-1">
                                <ul className="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                                    <li className="nav-item" onClick={() => this.cahngeWindow('1')}>
                                        <a 
                                        className={this.state.active === '1' ? "nav-link active" : "nav-link"} 
                                        id="custom-tabs-one-home-tab" data-toggle="pill" 
                                        href="#custom-tabs-one-home" 
                                        role="tab" aria-controls="custom-tabs-one-home" aria-selected="true">Medicos</a>
                                    </li>
                                    {this.state.showWindow &&
                                        <li className="nav-item" onClick={() => this.cahngeWindow('2')}>
                                            <a 
                                                className={this.state.active === '2' ? "nav-link active" : "nav-link"} 
                                                id="custom-tabs-one-profile-tab" 
                                                data-toggle="pill" 
                                                href="#custom-tabs-one-profile" 
                                                role="tab" 
                                                aria-controls="custom-tabs-one-profile" 
                                                aria-selected="false"
                                            >
                                                {this.state.dataMedico.nombres}
                                            </a>
                                        </li>
                                    }
                                    <li className="nav-item" onClick={() => this.cahngeWindow('3')}>
                                        <a 
                                        className={this.state.active === '3' ? "nav-link active" : "nav-link"} 
                                        id="custom-tabs-one-usuario-tab" 
                                        data-toggle="pill" href="#user" 
                                        role="tab" aria-controls="custom-tabs-one-profile" aria-selected="false">Usuarios</a>
                                    </li>

                                </ul>
                            </div>
                            <div className="card-body">
                            <div className="tab-content" id="custom-tabs-one-tabContent">
                                <div 
                                className={this.state.active === '1' ? "tab-pane fade show active" : "tab-pane fade"} 
                                id="custom-tabs-one-home" role="tabpanel" aria-labelledby="custom-tabs-one-home-tab">
                                    <div className="overlay-wrapper">
                                        {this.state.success.loading && 
                                            <div className="overlay"><i className="fas fa-3x fa-sync-alt fa-spin" /><div className="text-bold pt-2">Loading...</div></div>
                                        }
                                        {this.state.success.error &&
                                            <div className="overlay">
                                                <div className="alert alert-danger alert-dismissible">
                                                    <button type="button" onClick={() => this.setState({success:{loading:false,error:null}})} className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                                                    <h5><i className="icon fas fa-check"></i>Error!</h5>
                                                    <h3>No se puede mostrar los datos</h3>
                                                    erro 500
                                                </div>
                                            </div>
                                        }
                                        <MedicosList idMedico={this.medicoId} listMedicos={this.state.data}/>
                                    </div>
                                </div>
                                { this.state.showWindow && 
                                    <div 
                                    className={this.state.active === '2' ? "tab-pane fade show active" : "tab-pane fade"} 
                                    id="custom-tabs-one-profile" role="tabpanel" aria-labelledby="custom-tabs-one-profile-tab">
                                        <MedicoDatas medico={this.state.dataMedico}/>
                                    </div> 
                                }
                                <div 
                                className={this.state.active === '3' ? "tab-pane fade show active" : "tab-pane fade"} 
                                id="user" role="tabpanel" aria-labelledby="custom-tabs-one-usuario-tab">
                                    <div className="overlay-wrapper">
                                        {this.state.success.loading && 
                                            <div className="overlay"><i className="fas fa-3x fa-sync-alt fa-spin" /><div className="text-bold pt-2">Loading...</div></div>
                                        }
                                        {this.state.success.error &&
                                            <div className="overlay">
                                                <div className="alert alert-danger alert-dismissible">
                                                    <button type="button" onClick={() => this.setState({success:{loading:false,error:null}})} className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                                                    <h5><i className="icon fas fa-check"></i>Error!</h5>
                                                    <h3>No se puede mostrar los datos</h3>
                                                    erro 500
                                                </div>
                                            </div>
                                        }
                                        <ListUsers listUsers={this.state.dataUsers}/>
                                    </div>
                                </div> 
                            </div>
                            </div>
                            {/* /.card */}
                        </div>
                    </div>
                </div>

                <ModalLarge title='Registrar medico' idModal="medico">       
                    <div className="overlay-wrapper">                
                        <FormMed 
                            parentCallback={this.callBack}                        
                        />   
                    </div>               
                </ModalLarge>                
                
            </React.Fragment>
        );
    }
}


export default About;