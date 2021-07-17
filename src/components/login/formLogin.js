import React from "react";

function FormLogin(props) {
  //console.log(props)
  return (
    <React.Fragment>
        <div className="card">
            <div className="card-body login-card-body">
                <p className="login-box-msg">Iniciar sesion</p>
                <form>
                    <div className="input-group mb-3">
                        <input 
                        onChange={props.onchanges}
                        name="ci"
                        value={props.ci}
                        type="text" className={props.msg.ci === 'obligado' ? "form-control is-invalid" : "form-control"}  placeholder="C.I." />
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <span className="fas fa-envelope" />
                            </div>
                        </div>
                    </div>                   
                    <div className="input-group mb-3">
                        <input 
                        onChange={props.onchanges}
                        name="password"
                        value={props.password}
                        type="password" className={props.msg.password === 'obligado' ? "form-control is-invalid" : "form-control"} placeholder="Inserte su contraceña" />
                        <div className="input-group-append">
                            <div className="input-group-text">
                                <span className="fas fa-lock" />
                            </div>
                        </div>
                    </div>
                    <div className="row">                                              
                        <div className="col-12">
                            <button type="button"  onClick={props.onClick} className="btn btn-primary btn-block">Sign In</button>
                        </div>                       
                    </div>
                </form>
               
            </div>           
        </div>

    </React.Fragment>
  );
}
export default FormLogin;
