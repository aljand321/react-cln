import React from 'react';

function MedicoUser (props){
    return(
        <React.Fragment>
            <form>
            
                <label >Inserte nombres</label>
                <input
                    onChange={props.onchanges}
                    className="form-control"
                    type="text"
                    name="nombres"
                    placeholder="Nombres"
                    value={props.ci}
                />
           
                <label >Inserte apellidos</label>
                <input
                    onChange={props.onchanges}
                    className="form-control"
                    type="text"
                    name="apellidos"
                    placeholder="Apellidos"
                    value={props.password}
                />
                <label >Inserte ci</label>
                <input
                    onChange={props.onchanges}
                    className="form-control"
                    type="text"
                    name="ci"
                    placeholder="C.I."
                    value={props.password}
                />
                <label >Inserte celular</label>
                <input
                    onChange={props.onchanges}
                    className="form-control"
                    type="text"
                    name="telefono"
                    placeholder="Celular"
                    value={props.password}
                />
                <label >Inserte Direccion</label>
                <input
                    onChange={props.onchanges}
                    className="form-control"
                    type="text"
                    name="direccion"
                    placeholder="Direccion"
                    value={props.password}
                />
                <label >inserte su Email</label>
                <input
                    onChange={props.onchanges}
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={props.password}
                />
                <label >Inserte una contraceña</label>
                <input
                    onChange={props.onchanges}
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="Contraceña"
                    value={props.password}
                />
                <label >Repita su contraceña</label>
                <input
                    onChange={props.onchanges}
                    className="form-control"
                    type="password"
                    name="password1"
                    placeholder="Confirme su contraceña"
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

export default MedicoUser;