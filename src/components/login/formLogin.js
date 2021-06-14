import React from "react";

function FormLogin(props) {
  //console.log(props)
  return (
    <React.Fragment>
        <form>
            <input
                onChange={props.onchanges}
                className="form-control"
                type="text"
                name="ci"
                placeholder="C.I."
                value={props.ci}
            />
            <input
                onChange={props.onchanges}
                className="form-control"
                type="text"
                name="password"
                placeholder="Inserte su contraceña"
                value={props.password}
            />
            <button
                onClick={props.onClick}
                type="input"
                className="btn btn-primary"
            >
                Entrar
            </button>
        </form>
    </React.Fragment>
  );
}
export default FormLogin;
