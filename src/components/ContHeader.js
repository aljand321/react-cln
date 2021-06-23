const React = require('react');

function ContHeader(props) {
    const nombre = props.name
    return(
        <React.Fragment>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">{nombre}</h1>
                        </div>{/* /.col */}
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                {/* <li className="breadcrumb-item"><Link to="">Home</Link></li>
                                <li className="breadcrumb-item active">Dashboard v3</li> */}
                                {props.children}
                            </ol>
                        </div>{/* /.col */}
                    </div>{/* /.row */}
                </div>{/* /.container-fluid */}
            </div>
        </React.Fragment>
    );
}
export default ContHeader;