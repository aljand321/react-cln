import React from "react";

function Form(props) {
    let datas = props.formValues
    function inputs () {
        let input = [];
        for (let i=0;i < datas.length; i++){
            input.push(
            <input 
            key={i} 
            onChange={props.onChanges}
            className='form-control' 
            type={datas[i].type} 
            name={datas[i].name} 
            placeholder={datas[i].placeholder} 
            value={datas[i].value} />)
        }
        return input
    }
  return (
    <React.Fragment>
        <form action="#">
            {inputs()}
            <button onClick={props.onClick} type="input" className="btn btn-primary">
                Primary
            </button>
      </form>
    </React.Fragment>
  );
}
export default Form;
