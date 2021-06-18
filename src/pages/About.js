import React from 'react';
//import { Link } from 'react-router-dom';
import MedicosList from '../components/Medico/ListMed';
import ModalLarge from '../components/ModalLarge';
import ContHeader from '../components/ContHeader';
import FormMed from '../components/Medico/Form';

class About extends React.Component{
    
    callBack =() =>{
        console.log('esto es desde el form para mostrar el nuevo registrado')
    }
    render() {
        return(
            <React.Fragment>                
                <ContHeader>
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#modal-lg">
                        Registrar Medico
                    </button>
                </ContHeader>

                <div className="row">
                    <div className="col-12 col-sm-12">
                        <div className="card card-default card-tabs">
                            <div className="card-header p-0 pt-1">
                                <ul className="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="custom-tabs-one-home-tab" data-toggle="pill" href="#custom-tabs-one-home" role="tab" aria-controls="custom-tabs-one-home" aria-selected="true">Home</a>
                                    </li>
                                    {/* <li className="nav-item">
                                        <a className="nav-link" id="custom-tabs-one-profile-tab" data-toggle="pill" href="#custom-tabs-one-profile" role="tab" aria-controls="custom-tabs-one-profile" aria-selected="false">Profile</a>
                                    </li> */}
                                </ul>
                            </div>
                            <div className="card-body">
                            <div className="tab-content" id="custom-tabs-one-tabContent">
                                <div className="tab-pane fade show active" id="custom-tabs-one-home" role="tabpanel" aria-labelledby="custom-tabs-one-home-tab">
                                    <MedicosList/>
                                </div>
                                {/* <div className="tab-pane fade" id="custom-tabs-one-profile" role="tabpanel" aria-labelledby="custom-tabs-one-profile-tab">
                                    Mauris tincidunt mi at erat gravida, eget tristique urna bibendum. Mauris pharetra purus ut ligula tempor, et vulputate metus facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas sollicitudin, nisi a luctus interdum, nisl ligula placerat mi, quis posuere purus ligula eu lectus. Donec nunc tellus, elementum sit amet ultricies at, posuere nec nunc. Nunc euismod pellentesque diam.
                                </div> */}
                                
                            </div>
                            </div>
                            {/* /.card */}
                        </div>
                    </div>
                </div>

                <ModalLarge>                   
                    <FormMed 
                        parentCallback={this.callBack}                        
                    />                  
                </ModalLarge>                
                
            </React.Fragment>
        );
    }
}


export default About;