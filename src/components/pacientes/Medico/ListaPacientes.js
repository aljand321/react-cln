import React,{useState,useEffect,useCallback} from 'react'
import MedicoRoutes from '../../../Routes/Medico';
import ModalLarge from '../../ModalLarge';
import DataPaciente from '../DataPaciente';
function ListaPacientesDocotor(props) {
    const [list, setList] = useState([]);
    const [load, setLoad] = useState(false);
    const [respErr, setRespErr] = useState(false);
    const [search,setsearch] = useState({buscador:''})
    const [selected, setSelected] = useState({});

    const getLisPacientes = useCallback(async () =>{
      try {
        setLoad(true);
        const resp = await MedicoRoutes.listaPacientesMedico(props.id_medico,search.buscador);
        if(resp.data.success === false){
          setLoad(false);
          setRespErr(true);
          setTimeout(() => setRespErr(false), 5000);
        }else{
          setLoad(false);
          setList(resp.data.resp)
        }
      } catch (error) {
        setRespErr(true);
        setTimeout(() => setRespErr(false), 5000);
        console.error(error)
      }
    },[props.id_medico,search.buscador])
    useEffect(() => {
      getLisPacientes();
    },[getLisPacientes])
    const buscar = async (e) => {
      let buscador =''
      if(e){
        const {value,name}= e.target;
        setsearch({
          ...search,
          [name]:value
        })
        buscador = value;
      }
      try {
        setLoad(true);
        const resp = await MedicoRoutes.listaPacientesMedico(props.id_medico,buscador);
        if(resp.data.success === false){
          setLoad(false);
          setRespErr(true);
          setTimeout(() => setRespErr(false), 5000);
        }else{
          setLoad(false);
          setList(resp.data.resp)
        }
      } catch (error) {
        setRespErr(true);
        setTimeout(() => setRespErr(false), 5000);
        console.error(error)
      }
      
    }
    const selectPaciente = (id) =>{
      let data = list.filter(function(data){
        return data.id === id;
      })
      setSelected(data[0]);
    } 
    return (
        <>   
          {load && 
            <div className="overlay"><i className="fas fa-3x fa-sync-alt fa-spin" /><div className="text-bold pt-2">Loading...</div></div>
          }
          {respErr &&
            <div className="overlay">
              <div className="alert alert-danger alert-dismissible">
                <button type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                <h5><i className="icon fas fa-check"></i>Error!</h5>
                <h3>No se puede mostrar los datos</h3>
                erro 500
              </div>
            </div>
          }     
       
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Lista de pacietnes</h3>
                  <div className="card-tools">
                    <div className="input-group input-group-sm" style={{width: 250}}>
                      <input 
                      onChange={buscar} 
                      name="buscador" 
                      value={search.buscador} 
                      type="text" className="form-control float-right" placeholder="Buscar" />
                      <div className="input-group-append">
                        <button type="submit" className="btn btn-default">
                          <i className="fas fa-search" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
               
                <div className="card-body table-responsive p-0" style={{height: 400}}>
                  <table className="table table-head-fixed text-nowrap">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Nombre(s)</th>
                        <th>Apellido(s)</th>
                        <th>Edad</th>
                        <th>C.I.</th>
                        <th>Telefono</th>
                        <th>Ver</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.map((data,key)=>{
                        return (
                          <tr key={key}>
                            <td>{key+1}</td>
                            <td>{data.nombres}</td>
                            <td>{data.apellidos}</td>
                            <td>{data.edad}</td>
                            <td>{data.ci}</td>
                            <td>{data.telefono}</td>
                            <td>
                              <div className="btn-group btn-group-sm">
                                <button 
                                onClick={() => selectPaciente(data.id)}
                                className="btn btn-primary" data-toggle="modal" data-target="#pd"><i className="fas fa-eye" /></button>                                
                              </div>

                            </td>
                          </tr>
                        );
                      }) }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <ModalLarge title={`Paciente: ${selected.nombres} ${selected.apellidos}. Edad: ${selected.edad}`} idModal="pd" large="xl">
            <DataPaciente dataPaciente={selected} identify={props.id_medico}></DataPaciente>
          </ModalLarge>

        </>
    )
}

export default ListaPacientesDocotor;
