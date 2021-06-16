import React from "react";
import { Link } from 'react-router-dom'; 
function Layout (props){
    return (
        <React.Fragment>
            {/* <div className={show ? 'content active' : 'content'}>
                {props.children}                
            </div> */}
            {/* <!-- Content Wrapper. Contains page content --> */}
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Dashboard v3</h1>
                            </div>{/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to="">Home</Link></li>
                                    <li className="breadcrumb-item active">Dashboard v3</li>
                                </ol>
                            </div>{/* /.col */}
                        </div>{/* /.row */}
                    </div>{/* /.container-fluid */}
                </div>
                 {/* <!-- Main content --> */}
                <section className="content">
                    <div className="container-fluid">
                        <div className='row'>
                            {props.children}  
                        </div>
                           
                    </div>
                </section>
            </div>
           

        </React.Fragment>
    );
}

export default Layout;