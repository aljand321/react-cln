import React from 'react';
//import { Link } from 'react-router-dom';
import MedicosList from '../components/Medico/ListMed';
import ModalLarge from '../components/ModalLarge';
import ContHeader from '../components/ContHeader';
import FormMed from '../components/Medico/Form';
import MedicoRoutes from '../Routes/Medico';
import MedicoDatas from '../components/Medico/PerfilMedico';

class About extends React.Component{
    
    state = {
        loading:true,
        error:null,
        data:[],
        showWindow:false,
        active:'1',
        dataMedico:{}
    }
    componentDidMount(){
        this.getListMedicos();
    }

    getListMedicos = async () =>{
        try {
            const resp = await MedicoRoutes.listMedicos();
            if(resp.data.success === false){
                console.log('no se puede mostrar los datos')
            }else{
                this.setState({
                    data:resp.data.resp
                })
            }
        } catch (error) {
            console.log(error)
            return error
        }
    }
    medicoId = async (id) =>{
        //console.log(id, 'esto es desde el padre component')
        this.setState({
            showWindow : true,
            active:'2'
        })
        try {
            const resp = await MedicoRoutes.medico(id);
            //console.log(resp.data.resp, ' esto es el data medico ')
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
        //console.log('esto es desde el form para mostrar el nuevo registrado')
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
                                        <a className={this.state.active === '1' ? "nav-link active" : "nav-link"} id="custom-tabs-one-home-tab" data-toggle="pill" href="#custom-tabs-one-home" role="tab" aria-controls="custom-tabs-one-home" aria-selected="true">Home</a>
                                    </li>
                                    {this.state.showWindow &&
                                        <li className="nav-item" onClick={() => this.cahngeWindow('2')}>
                                            <a className={this.state.active === '2' ? "nav-link active" : "nav-link"} id="custom-tabs-one-profile-tab" data-toggle="pill" href="#custom-tabs-one-profile" role="tab" aria-controls="custom-tabs-one-profile" aria-selected="false">Profile</a>
                                        </li>
                                    }
                                </ul>
                            </div>
                            <div className="card-body">
                            <div className="tab-content" id="custom-tabs-one-tabContent">
                                <div className={this.state.active === '1' ? "tab-pane fade show active" : "tab-pane fade"} id="custom-tabs-one-home" role="tabpanel" aria-labelledby="custom-tabs-one-home-tab">
                                    <MedicosList idMedico={this.medicoId} listMedicos={this.state.data}/>
                                </div>
                                { this.state.showWindow && 
                                    <div className={this.state.active === '2' ? "tab-pane fade show active" : "tab-pane fade"} id="custom-tabs-one-profile" role="tabpanel" aria-labelledby="custom-tabs-one-profile-tab">
                                        <MedicoDatas medico={this.state.dataMedico}/>
                                    </div> 
                                }
                                
                            </div>
                            </div>
                            {/* /.card */}
                        </div>
                    </div>
                </div>

                <ModalLarge title='Registrar medico' idModal="medico">                   
                    <FormMed 
                        parentCallback={this.callBack}                        
                    />                  
                </ModalLarge>                
                
            </React.Fragment>
        );
    }
}


export default About;