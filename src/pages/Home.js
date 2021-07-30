import React from "react";
import ContHeader from '../components/ContHeader';
import './styles/home.css'
import HomeRoutes from '../Routes/Home';
class Home extends React.Component {
  _isMounted = false;
  state={
    success:{
      loading:false,
      error:false
    },
    cMedicos:0,
    totalUsarios:0,
    cPacientes:0,
    porcentajeVacunadosC19:0,
    listPVC19:[]
    
  }
  componentDidMount(){
    console.log('home  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
    this._isMounted = true;
    this.location();
    this.totalMedicos();
    this.tUsario();
    this.totalPacientes();
    this.pVC19();
    this.listPacientesVacunados();
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
  totalMedicos = async () =>{
    if(this._isMounted){
      try {
        this.setState({
          success:{
            loading:true,
            error:false
          }
        })
        const resp = await HomeRoutes.cMedicos();
        console.log(resp.data)
        if(resp.data.success === false){
          this.setState({
            success:{
              loading:false,
              error:true
            }
          })
        }else{
          this.setState({
            cMedicos:resp.data.resp
          })
        }
        
      } catch (error) {
        this.setState({
          success:{
            loading:false,
            error:true
          }
        })
      }
    }
  }
  tUsario = async () =>{
    if(this._isMounted){
      try {
        this.setState({
          success:{
            loading:true,
            error:false
          }
        })
        const resp = await HomeRoutes.totalUsarios();
        console.log(resp.data)
        if(resp.data.success === false){
          this.setState({
            success:{
              loading:false,
              error:true
            }
          })
        }else{
          this.setState({
            totalUsarios:resp.data.resp
          })
        }
        
      } catch (error) {
        this.setState({
          success:{
            loading:false,
            error:true
          }
        })
      }
    }
  }
  totalPacientes = async () =>{
    if(this._isMounted){
      try {
        this.setState({
          success:{
            loading:true,
            error:false
          }
        })
        const resp = await HomeRoutes.pacientesR();
        console.log(resp.data)
        if(resp.data.success === false){
          this.setState({
            success:{
              loading:false,
              error:true
            }
          })
        }else{
          this.setState({
            cPacientes:resp.data.resp
          })
        }
        
      } catch (error) {
        this.setState({
          success:{
            loading:false,
            error:true
          }
        })
      }
    }
  }
  pVC19 = async () =>{
    if(this._isMounted){
      try {
        this.setState({
          success:{
            loading:true,
            error:false
          }
        })
        const resp = await HomeRoutes.porcentajeVacunadosC19();
        console.log(resp.data)
        if(resp.data.success === false){
          this.setState({
            success:{
              loading:false,
              error:true
            }
          })
        }else{
          this.setState({
            porcentajeVacunadosC19:resp.data.resp
          })
        }
        
      } catch (error) {
        this.setState({
          success:{
            loading:false,
            error:true
          }
        })
      }
    }
  }
  listPacientesVacunados = async () =>{
    if(this._isMounted){
      try {
        this.setState({
          success:{
            loading:true,
            error:false
          }
        })
        const resp = await HomeRoutes.vacunadosC19({buscador:'',dosis:0,pagenumber:1,pagesize:10});
        console.log(resp.data)
        if(resp.data.success === false){
          this.setState({
            success:{
              loading:false,
              error:true
            }
          })
        }else{
          this.setState({
            listPVC19:resp.data.resp
          })
        }
        
      } catch (error) {
        this.setState({
          success:{
            loading:false,
            error:true
          }
        })
      }
    }
  }
  buscarPaciente = async (e)=>{
    const {value,name} = e.target;
    console.log(value); 
    if(this._isMounted){
      try {
        this.setState({
          success:{
            loading:true,
            error:false
          }
        })
        const resp = await HomeRoutes.vacunadosC19(
          {
            buscador:name === 'buscar' ?  value : '',dosis:name === 'dosis' ? value : 0 ,pagenumber:1,pagesize:10
          });
        console.log(resp.data)
        if(resp.data.success === false){
          this.setState({
            success:{
              loading:false,
              error:true
            }
          })
        }else{
          this.setState({
            listPVC19:resp.data.resp
          })
        }
        
      } catch (error) {
        this.setState({
          success:{
            loading:false,
            error:true
          }
        })
      }
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
    this.setState = (state,callback)=>{
      return;
   };
  }

  render() {
    return (
       <>
        <ContHeader name='Panel'>
          
        </ContHeader>
         <section class="content">
          <div class="container-fluid">
            <div className="row">
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-default">
                  <div className="inner">
                    <h3>{this.state.cMedicos}</h3>
                    <p>Medicos</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-person-add" />
                  </div>
                  
                </div>
              </div>
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>{this.state.totalUsarios}</h3>
                    <p>Usuarios</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-person" />
                  </div>
                 
                </div>
              </div>
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-warning">
                  <div className="inner">
                    <h3>{this.state.cPacientes}</h3>
                    <p>Pacientes Registrados</p>
                  </div>
                  <div className="icon">
                    {/* <i className="ion ion-person-add" /> */}
                    <i className="ion ion-person" />
                  </div>
                 
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>{this.state.porcentajeVacunadosC19}<sup style={{fontSize: 20}}>%</sup></h3>
                    <p>Pacientes vacunados contra el covid</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-stats-bars" />
                  </div>
                 
                </div>
              </div>
              
            </div>

          </div>
        </section>

        <div className="row">
          <div className="col-md-6">
            
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Pacientes inmunizados C19</h3>
                <div className="card-tools">
                  <div className="input-group input-group-sm" style={{width: 230}}>
                    <input type="text" name="buscar" onChange={this.buscarPaciente} className="form-control float-right" placeholder="Buscar paciente" />
                    {/* <div className="input-group-append">
                      <button type="submit" className="btn btn-default">
                        <i className="fas fa-search" />
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
              {/* /.card-header */}
              <div className="card-body table-responsive p-0">
                <table className="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Apellidos</th>
                      <th>C.I.</th>
                      <th>vacuna</th>                        
                      <th>cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.listPVC19.map((data,key)=>{
                      return (
                        <tr key={key}>
                          <td>{data.nombres}</td>
                          <td>{data.apellidos}</td>
                          <td>{data.ci}</td>

                          <td><span className="badge badge-success">{data.vacuna}</span></td>
                          <td>
                            {data.cantidad}
                          </td>
                        </tr>
                      );
                    })}
                   
                  </tbody>
                </table>
              </div>
              {/* /.card-body */}
              <div className="card-footer clearfix">
                {/* <div className="float-left">
                
                </div> */}
                <div className="float-right">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className="page-item">                       
                        <select name='dosis' onChange={this.buscarPaciente}  className="form-control">
                            <option value='0'>Todo</option>
                            <option value='1'>Primera Dosis</option>
                            <option value='2'>Segunda Dosis</option>                        
                        </select>                       
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>

          </div>
          {/* <div className="col-md-6">
            <div className="card">
              <div className="card-header border-transparent">
                <h3 className="card-title">Pacientes</h3>
                <div className="card-tools">
                  <button type="button" className="btn btn-tool" data-card-widget="collapse">
                    <i className="fas fa-minus" />
                  </button>
                  <button type="button" className="btn btn-tool" data-card-widget="remove">
                    <i className="fas fa-times" />
                  </button>
                </div>
              </div>
            
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table m-0">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Item</th>
                        <th>Status</th>
                        <th>Popularity</th>
                      </tr>
                    </thead>
                    <tbody>                
                      <tr>
                        <td><a href="pages/examples/invoice.html">OR7429</a></td>
                        <td>iPhone 6 Plus</td>
                        <td><span className="badge badge-danger">Delivered</span></td>
                        <td>
                          <div className="sparkbar" data-color="#f56954" data-height={20}>90,-80,90,70,-61,83,63</div>
                        </td>
                      </tr>                  
                    </tbody>
                  </table>
                </div>               
              </div>
              <div className="card-footer clearfix">
                <div className="btn btn-sm btn-info float-left">Place New Order</div>
                <div className="btn btn-sm btn-secondary float-right">View All Orders</div>
              </div>
            </div>
          </div> */}
          {/* <div>

          <div className="chart-wrap vertical">
            <h2 className="title">Inmunizados contra el covid 19</h2>
            <div className="grid">
              <div className="bar" style={{'--bar-value': '53%'}} data-name="Enero" title="Enero 53%" />
              <div className="bar" style={{'--bar-value': '23%'}} data-name="Febrero" title="Medium 23%" />
              <div className="bar" style={{'--bar-value': '70%'}} data-name="Marzo" title="Tumblr 70%" />
              <div className="bar" style={{'--bar-value': '38%'}} data-name="Abril" title="Facebook 38%" />
              <div className="bar" style={{'--bar-value': '35%'}} data-name="Mayo" title="YouTube 35%" />
              <div className="bar" style={{'--bar-value': '30%'}} data-name="Junio" title="LinkedIn 30%" />
              <div className="bar" style={{'--bar-value': '57%'}} data-name="Julio" title="Twitter 5%" />
              <div className="bar" style={{'--bar-value': '20%'}} data-name="Agosto" title="Other 20%" />   
              <div className="bar" style={{'--bar-value': '20%'}} data-name="Septiembre" title="Other 20%" />   
              <div className="bar" style={{'--bar-value': '20%'}} data-name="Octubre" title="Other 20%" />    
              <div className="bar" style={{'--bar-value': '20%'}} data-name="Nombiembre" title="Other 20%" />    
              <div className="bar" style={{'--bar-value': '20%'}} data-name="Diciembre" title="Other 20%" />    
            </div>
          </div>

          </div> */}
        </div>


      </>
    );
  
 }
}

export default Home;
