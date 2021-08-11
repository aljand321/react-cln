import React from 'react';
import ContHeader from '../components/ContHeader';
import ANTptl from '../components/AntecedentesPTL/AntPatologicos';
import Alergias from '../Routes/Alergias';
import Cirugias from '../Routes/Cirugias';
import OtrasEnfermedades from '../Routes/OtrasEnfermedades';
import Transfuciones from '../Routes/Transfuciones'
class ANTPatologicos extends React.Component{    
    _isMounted = false;
    state={
        selectAnt:{
            route:'Alergias'
            //Cirugias
            //Tranfuciones
            //Otras Enfermedades
        },
        successList:{
            load:false,
            erro:false, 
            msg:''           
        },
        buscarAlergia:'',
        listDatasAntPtl:[],
        page:{
            pageCount:'',
            pageNumber:''
        },
        number:0,
        c:0,
        limit:10
    }
    componentDidMount(){
        console.log('Antecedentes patologicos <<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
        this._isMounted = true;
        this.location();
        this.getDataAnt();
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
    getDataAnt = async (e) =>{
        let data = '';
        if(e){
            const {name,value} = e.target;
            if (name === 'buscador'){
                data = value
                this.setState({
                    buscarAlergia: value
                })
            }
        }
        this.setState({
            successList:{
                load:true,
                erro:false,
                msg:''
            },
            number: 0,
            c : 0
        })
        let resp = {}
        if(this.state.selectAnt.route === 'Alergias'){
            const alergias = await Alergias.buscarAlergia(data,0,this.state.limit);      
            resp = alergias;            
        }
        if(this.state.selectAnt.route === 'Cirugias'){            
            const cirugias = await Cirugias.buscarCirugia(data,0,this.state.limit);
            resp = cirugias
        }
        if(this.state.selectAnt.route === 'Tranfuciones'){            
            const transfuciones = await Transfuciones.buscarTransfucion(data,0,this.state.limit);
            resp = transfuciones
        }
        if(this.state.selectAnt.route === 'Otras Enfermedades'){            
            const otrEnf = await OtrasEnfermedades.buscarEnf(data,0,this.state.limit);
            resp = otrEnf
        }     
        if(resp.data.success === false){
            this.setState({
                successList:{
                    load:false,
                    erro:true,
                    msg:resp.data.msg
                }
            })
            return;
        }else{
            this.setState({
                successList:{
                    load:false,
                    erro:false,
                    msg:''
                },
                listDatasAntPtl:resp.data.resp,
                page:{
                    pageCount:resp.data.pageCount,
                    pageNumber:resp.data.pagenumber
                }
            })
            return;
        } 
        
    }
    changeLimit = async (e) =>{
        let data = '';
        if(e){
            const {name,value} = e.target;
            if (name === 'limite'){
                data = value
                this.setState({
                    limit: value
                })
            }
        }
        this.setState({
            successList:{
                load:true,
                erro:false,
                msg:''
            },
            number: 0,
            c : 0
        })
        let resp = {}
        if(this.state.selectAnt.route === 'Alergias'){
            const alergias = await Alergias.buscarAlergia(this.state.buscarAlergia,0,data);    
            resp = alergias;
        }
        if(this.state.selectAnt.route === 'Cirugias'){
            const cirugias = await Cirugias.buscarCirugia(this.state.buscarAlergia,0,data); 
            resp = cirugias;
        }
        if(this.state.selectAnt.route === 'Tranfuciones'){            
            const transfuciones = await Transfuciones.buscarTransfucion(this.state.buscarAlergia,0,data);
            resp = transfuciones
        }
        if(this.state.selectAnt.route === 'Otras Enfermedades'){            
            const otrEnf = await OtrasEnfermedades.buscarEnf(this.state.buscarAlergia,0,data);
            resp = otrEnf
        }      
        if(resp.data.success === false){
            this.setState({
                successList:{
                    load:false,
                    erro:true,
                    msg:resp.data.msg
                }
            })
            return;
        }else{
            this.setState({
                successList:{
                    load:false,
                    erro:false,
                    msg:''
                },
                listDatasAntPtl:resp.data.resp,
                page:{
                    pageCount:resp.data.pageCount,
                    pageNumber:resp.data.pagenumber
                }
            })
            return;
        } 
        
    }
    changePage = async (page) => {   
          
        if (page === 0){ // para paginar la paginas
            this.setState({
                number: 0,
                c : 0
            })
        }else{
            if(page === this.state.page.pageCount - 1){
                this.setState({
                    number: this.state.page.pageCount - 4,
                    c : this.state.page.pageCount - 1
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
                    if (page < this.state.page.pageCount - 1){
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
        let resp = {}      
        if(this.state.selectAnt.route === 'Alergias'){
            const alergias = await Alergias.buscarAlergia(this.state.buscarAlergia,page,this.state.limit);     
            resp = alergias;
        }
        if(this.state.selectAnt.route === 'Cirugias'){
            const cirugias = await Cirugias.buscarCirugia(this.state.buscarAlergia,page,this.state.limit);     
            resp = cirugias;
        }
        if(this.state.selectAnt.route === 'Tranfuciones'){            
            const transfuciones = await Transfuciones.buscarTransfucion(this.state.buscarAlergia,page,this.state.limit);
            resp = transfuciones
        }
        if(this.state.selectAnt.route === 'Otras Enfermedades'){            
            const otrEnf = await OtrasEnfermedades.buscarEnf(this.state.buscarAlergia,page,this.state.limit);
            resp = otrEnf
        }
       
        if(resp.data.success === false){
            this.setState({
                successList:{
                    load:false,
                    erro:true,
                    msg:resp.data.msg
                }
            })
            return;
        }else{
            this.setState({
                successList:{
                    load:false,
                    erro:false,
                    msg:''
                },
                listDatasAntPtl:resp.data.resp,
                page:{
                    pageCount:resp.data.pageCount,
                    pageNumber:resp.data.pagenumber
                }
            })
            return;
        }
    }
    changelistdatas = (name) =>{
        this.setState({
            selectAnt:{
                route:name
            }
        });
        setTimeout(()=>{
            this.getDataAnt();
        },100)
        
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
                <ContHeader name='Antecedentes Patologicos'>
                    
                </ContHeader>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card card-primary card-tabs">
                        <div className="card-header p-0 pt-1">
                            <ul className="nav nav-tabs" id="custom-tabs-five-tab" role="tablist">
                                <li className="nav-item">
                                    <a 
                                    onClick={()=>this.changelistdatas('Alergias')}
                                    className="nav-link active" id="custom-tabs-five-overlay-tab" data-toggle="pill" href="#AntPtl" role="tab" aria-controls="custom-tabs-five-overlay" aria-selected="true">Alergias</a>
                                </li>
                                <li className="nav-item">
                                    <a 
                                    onClick={()=>this.changelistdatas('Cirugias')}
                                    className="nav-link" id="custom-tabs-five-overlay-dark-tab" data-toggle="pill" href="#AntPtl" role="tab" aria-controls="custom-tabs-five-overlay-dark" aria-selected="false">Cirugias</a>
                                </li>
                                <li className="nav-item">
                                    <a 
                                     onClick={()=>this.changelistdatas('Tranfuciones')}
                                    className="nav-link" id="custom-tabs-five-normal-tab" data-toggle="pill" href="#AntPtl" role="tab" aria-controls="custom-tabs-five-normal" aria-selected="false">Transfuciones</a>
                                </li>
                                <li className="nav-item">
                                    <a 
                                     onClick={()=>this.changelistdatas('Otras Enfermedades')}
                                    className="nav-link" id="custom-tabs-five-normal-tab" data-toggle="pill" href="#AntPtl" role="tab" aria-controls="custom-tabs-five-normal" aria-selected="false">Otras enfermedades</a>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body">
                            <div className="tab-content" id="custom-tabs-five-tabContent">
                                <div className="tab-pane fade show active" id="AntPtl" role="tabpanel" aria-labelledby="custom-tabs-five-overlay-tab">
                                    <div className="overlay-wrapper">
                                        {/* <div className="overlay"><i className="fas fa-3x fa-sync-alt fa-spin" /><div className="text-bold pt-2">Loading...</div></div> */}
                                        <ANTptl 
                                        buscadorDataAnt={this.getDataAnt} 
                                        limit={this.changeLimit}
                                        buscador={this.state.buscarAlergia} 
                                        listDataAntPtl={this.state.listDatasAntPtl} 
                                        success={this.state.successList}
                                        page={this.state.page} 
                                        num={this.state.number}
                                        pageCount={this.state.c}
                                        changePage={this.changePage} 
                                        selectAnt={this.state.selectAnt}
                                        />
                                        
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        {/* /.card */}
                        </div>
                    </div>
                    </div>

            </React.Fragment>        
            
        );
    }
}
export default ANTPatologicos;