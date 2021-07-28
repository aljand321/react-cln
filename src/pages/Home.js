import React from "react";
import ContHeader from '../components/ContHeader';
class Home extends React.Component {
  _isMounted = false;
  componentDidMount(){
    console.log('home  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
    this._isMounted = true;
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
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>2</h3>
                    <p>Medicos</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-person-add" />
                  </div>
                  
                </div>
              </div>
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-warning">
                  <div className="inner">
                    <h3>1000</h3>
                    <p>Pacientes registrados</p>
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
                    <h3>53<sup style={{fontSize: 20}}>%</sup></h3>
                    <p>Pacientes vacunados contra el covid</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-stats-bars" />
                  </div>
                 
                </div>
              </div>
              {/* ./col */}
              
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-danger">
                  <div className="inner">
                    <h3>65</h3>
                    <p>Unique Visitors</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-pie-graph" />
                  </div>
                 
                </div>
              </div>
              {/* ./col */}
            </div>

          </div>
        </section>

        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header border-transparent">
                <h3 className="card-title">Pacientes inmunizados contra el convid</h3>
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
                {/* /.table-responsive */}
              </div>
              {/* /.card-body */}
              <div className="card-footer clearfix">
                <div className="btn btn-sm btn-info float-left">Place New Order</div>
                <div className="btn btn-sm btn-secondary float-right">View All Orders</div>
              </div>
              {/* /.card-footer */}
            </div>
          </div>
          <div className="col-md-6">
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
                {/* /.table-responsive */}
              </div>
              {/* /.card-body */}
              <div className="card-footer clearfix">
                <div className="btn btn-sm btn-info float-left">Place New Order</div>
                <div className="btn btn-sm btn-secondary float-right">View All Orders</div>
              </div>
              {/* /.card-footer */}
            </div>
          </div>
        </div>


      </>
    );
  
 }
}

export default Home;
