
function Datas (props){
    
    return(
       <div>
           <h1>esto es el componente {props.datas.msg}</h1>
           {props.children}
       </div>
        
    );
}
export default Datas;