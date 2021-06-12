import React from "react";
import './App.css'; 
function Layout (props){
    let show = props.show;
    return (
        <React.Fragment>
            <div className={show ? 'content active' : 'content'}>
                {props.children}                
            </div>
        </React.Fragment>
    );
}

export default Layout;