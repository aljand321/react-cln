import ModalLarge from "../../ModalLarge";
function Patologicos(props) {
    return(
        <>
            <div className='row'>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <div className="d-flex">
                                <div className="mr-auto p-2">
                                    <h3 className="card-title">Alergias</h3>
                                </div>
                                <div className="p-2">
                                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#alergias">
                                        Registrar Alergia
                                    </button>
                                </div>
                            </div>                                                             
                        </div>
                        {/* /.card-header */}
                        <div className="card-body p-0">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th style={{width: 10}}>#</th>
                                    <th>Task</th>
                                    <th>Progress</th>
                                    <th style={{width: 40}}>Label</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>1.</td>
                                    <td>Update software</td>
                                    <td>
                                    <div className="progress progress-xs">
                                        <div className="progress-bar progress-bar-danger" style={{width: '55%'}} />
                                    </div>
                                    </td>
                                    <td><span className="badge bg-danger">55%</span></td>
                                </tr>
                                <tr>
                                    <td>2.</td>
                                    <td>Clean database</td>
                                    <td>
                                    <div className="progress progress-xs">
                                        <div className="progress-bar bg-warning" style={{width: '70%'}} />
                                    </div>
                                    </td>
                                    <td><span className="badge bg-warning">70%</span></td>
                                </tr>
                                <tr>
                                    <td>3.</td>
                                    <td>Cron job running</td>
                                    <td>
                                    <div className="progress progress-xs progress-striped active">
                                        <div className="progress-bar bg-primary" style={{width: '30%'}} />
                                    </div>
                                    </td>
                                    <td><span className="badge bg-primary">30%</span></td>
                                </tr>
                                <tr>
                                    <td>4.</td>
                                    <td>Fix and squish bugs</td>
                                    <td>
                                    <div className="progress progress-xs progress-striped active">
                                        <div className="progress-bar bg-success" style={{width: '90%'}} />
                                    </div>
                                    </td>
                                    <td><span className="badge bg-success">90%</span></td>
                                </tr>
                                <tr>
                                    <td>5.</td>
                                    <td>Fix and squish bugs</td>
                                    <td>
                                    <div className="progress progress-xs progress-striped active">
                                        <div className="progress-bar bg-success" style={{width: '90%'}} />
                                    </div>
                                    </td>
                                    <td><span className="badge bg-success">90%</span></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* /.card-body */}
                    </div>
                    {/* /.card */}
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Transfuciones</h3>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body p-0">
                        
                            <table className="table">
                                <thead>
                                <tr>
                                    <th style={{width: 10}}>#</th>
                                    <th>Task</th>
                                    <th>Progress</th>
                                    <th style={{width: 40}}>Label</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>1.</td>
                                    <td>Update software</td>
                                    <td>
                                    <div className="progress progress-xs">
                                        <div className="progress-bar progress-bar-danger" style={{width: '55%'}} />
                                    </div>
                                    </td>
                                    <td><span className="badge bg-danger">55%</span></td>
                                </tr>
                                <tr>
                                    <td>2.</td>
                                    <td>Clean database</td>
                                    <td>
                                    <div className="progress progress-xs">
                                        <div className="progress-bar bg-warning" style={{width: '70%'}} />
                                    </div>
                                    </td>
                                    <td><span className="badge bg-warning">70%</span></td>
                                </tr>
                                <tr>
                                    <td>3.</td>
                                    <td>Cron job running</td>
                                    <td>
                                    <div className="progress progress-xs progress-striped active">
                                        <div className="progress-bar bg-primary" style={{width: '30%'}} />
                                    </div>
                                    </td>
                                    <td><span className="badge bg-primary">30%</span></td>
                                </tr>
                                <tr>
                                    <td>4.</td>
                                    <td>Fix and squish bugs</td>
                                    <td>
                                    <div className="progress progress-xs progress-striped active">
                                        <div className="progress-bar bg-success" style={{width: '90%'}} />
                                    </div>
                                    </td>
                                    <td><span className="badge bg-success">90%</span></td>
                                </tr>
                                </tbody>
                            </table>


                        </div>
                        {/* /.card-body */}
                    </div>
                    {/* /.card */}
                </div>

                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Cirugias Previas</h3>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body p-0">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th style={{width: 10}}>#</th>
                                    <th>Task</th>
                                    <th>Progress</th>
                                    <th style={{width: 40}}>Label</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>1.</td>
                                    <td>Update software</td>
                                    <td>
                                    <div className="progress progress-xs">
                                        <div className="progress-bar progress-bar-danger" style={{width: '55%'}} />
                                    </div>
                                    </td>
                                    <td><span className="badge bg-danger">55%</span></td>
                                </tr>
                                <tr>
                                    <td>2.</td>
                                    <td>Clean database</td>
                                    <td>
                                    <div className="progress progress-xs">
                                        <div className="progress-bar bg-warning" style={{width: '70%'}} />
                                    </div>
                                    </td>
                                    <td><span className="badge bg-warning">70%</span></td>
                                </tr>
                                <tr>
                                    <td>3.</td>
                                    <td>Cron job running</td>
                                    <td>
                                    <div className="progress progress-xs progress-striped active">
                                        <div className="progress-bar bg-primary" style={{width: '30%'}} />
                                    </div>
                                    </td>
                                    <td><span className="badge bg-primary">30%</span></td>
                                </tr>
                                <tr>
                                    <td>4.</td>
                                    <td>Fix and squish bugs</td>
                                    <td>
                                    <div className="progress progress-xs progress-striped active">
                                        <div className="progress-bar bg-success" style={{width: '90%'}} />
                                    </div>
                                    </td>
                                    <td><span className="badge bg-success">90%</span></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* /.card-body */}
                    </div>
                    {/* /.card */}
                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Otras Enfermedades</h3>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body p-0">
                        
                            <table className="table">
                                <thead>
                                <tr>
                                    <th style={{width: 10}}>#</th>
                                    <th>Task</th>
                                    <th>Progress</th>
                                    <th style={{width: 40}}>Label</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>1.</td>
                                    <td>Update software</td>
                                    <td>
                                    <div className="progress progress-xs">
                                        <div className="progress-bar progress-bar-danger" style={{width: '55%'}} />
                                    </div>
                                    </td>
                                    <td><span className="badge bg-danger">55%</span></td>
                                </tr>
                                <tr>
                                    <td>2.</td>
                                    <td>Clean database</td>
                                    <td>
                                    <div className="progress progress-xs">
                                        <div className="progress-bar bg-warning" style={{width: '70%'}} />
                                    </div>
                                    </td>
                                    <td><span className="badge bg-warning">70%</span></td>
                                </tr>
                                <tr>
                                    <td>3.</td>
                                    <td>Cron job running</td>
                                    <td>
                                    <div className="progress progress-xs progress-striped active">
                                        <div className="progress-bar bg-primary" style={{width: '30%'}} />
                                    </div>
                                    </td>
                                    <td><span className="badge bg-primary">30%</span></td>
                                </tr>
                                <tr>
                                    <td>4.</td>
                                    <td>Fix and squish bugs</td>
                                    <td>
                                    <div className="progress progress-xs progress-striped active">
                                        <div className="progress-bar bg-success" style={{width: '90%'}} />
                                    </div>
                                    </td>
                                    <td><span className="badge bg-success">90%</span></td>
                                </tr>
                                </tbody>
                            </table>


                        </div>
                        {/* /.card-body */}
                    </div>
                    {/* /.card */}
                </div>
            </div>

            <ModalLarge title='Registrar Alergia' idModal='alergias'>
                <h1>Formulario para registro de alergias</h1>
            </ModalLarge>
        </>
    );
}

export default Patologicos