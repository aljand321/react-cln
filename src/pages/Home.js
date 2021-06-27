import React from "react";
import ContHeader from "../components/ContHeader";
import ListasMedicos from "../components/Home/listasMedicos";
//import { Link } from 'react-router-dom';
class Home extends React.Component {
    state={
        esto:{
            name:'martin',
            lastName:"flores"
        }
    }
    algo = (data) =>{
        console.log(data, ' sdasdasd')
    }
  render() {
    return (
      <React.Fragment>
        <section className="content">
          <div className="container-fluid">
            <ContHeader name="Informacion">
              <h1>----</h1>
            </ContHeader>
            <div class="row">
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>150</h3>
                    <p>New Orders</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-bag" />
                  </div>
                  <a href="#" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </a>
                </div>
              </div>

              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>150</h3>
                    <p>New Orders</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-bag" />
                  </div>
                  <a href="#" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
            </div>

            <div className="row">
              <section className="col-lg-7 connectedSortable">
                {/* TO DO List */}
                <ListasMedicos tiutlo='docotres' click={this.algo} datas={this.state.esto}>
                    <h1>hola aljand</h1>
                </ListasMedicos>
              </section>
            </div>

          </div>
        </section>
      </React.Fragment>
    );
  }
}
export default Home;
