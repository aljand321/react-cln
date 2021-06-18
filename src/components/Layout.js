import React from "react";
function Layout (props){
    return (
        <React.Fragment>
            {/* <div className={show ? 'content active' : 'content'}>
                {props.children}                
            </div> */}
            {/* <!-- Content Wrapper. Contains page content --> */}
            <div className="content-wrapper">
                
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