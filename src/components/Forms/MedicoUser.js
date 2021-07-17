import React from 'react';

function MedicoUser (props){
    return(
        <React.Fragment>
            
            <p className="login-box-msg">Registrar </p>
            <form action="../../index.html" method="post">
                <div className="input-group mb-3">
                    <input 
                    onChange={props.onchanges}
                    value={props.nombres}
                    name="nombres"
                    type="text" className={props.msg.nombres === 'obligado' ? "form-control is-invalid" : "form-control"} placeholder="Nombres" />
                    <div className="input-group-append">
                        <div className="input-group-text">
                        <span className="fas fa-user" />
                        </div>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <input 
                    onChange={props.onchanges}
                    value={props.apellidos}
                    name="apellidos"
                    type="text" className={props.msg.apellidos === 'obligado' ? "form-control is-invalid" : "form-control"} placeholder="Apellidos" />
                    <div className="input-group-append">
                        <div className="input-group-text">
                        <span className="fas fa-user" />
                        </div>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <input 
                    onChange={props.onchanges}
                    value={props.ci}
                    name="ci"
                    type="text" className={props.msg.ci === 'obligado' ? "form-control is-invalid" : "form-control"} placeholder="C.I." />
                    <div className="input-group-append">
                        <div className="input-group-text">
                        <span className="fas fa-user" />
                        </div>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <input 
                    onChange={props.onchanges}
                    value={props.password}
                    name="password"
                    type="password" className={props.msg.password === 'obligado' ? "form-control is-invalid" : "form-control"} placeholder="Contraceña" />
                    <div className="input-group-append">
                        <div className="input-group-text">
                        <span className="fas fa-lock" />
                        </div>
                    </div>
                </div>
                <div className="input-group mb-3">
                    <input 
                    onChange={props.onchanges}
                    value={props.password1}
                    name="password1"
                    type="password" className={props.msg.password1 === 'obligado' ? "form-control is-invalid" : "form-control"} placeholder="Repita su contraceña" />
                    <div className="input-group-append">
                        <div className="input-group-text">
                        <span className="fas fa-lock" />
                        </div>
                    </div>
                </div>
                
            </form>
            <div className="social-auth-links text-center">
                <button onClick={props.onClick} type="submit" className="btn btn-primary btn-block"> ------- Registrar primer usuario -------  </button>
            </div>
                
            

        </React.Fragment>
    );

}

export default MedicoUser;