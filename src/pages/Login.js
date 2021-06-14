import React from 'react';
import '../components/login/formLogin.css';
import image from '../images/image.jpg';
import FormLogin from '../components/login/formLogin';
import MedicoUser from '../components/Forms/MedicoUser';
//routes
import Routes from '../Routes/index'; 
class Login extends React.Component{
    state = {
        isDataBaseNull:false,
        msg:{
          success:false,
          alert:'info',
          msg:''  
        },
        loading: false,
        error:null,        
        form:{
            ci:'',
            password:''
        },
        formCreate:{
            nombres:'',
            apellidos:'',
            ci:'',
            email:'',
            telefono:'',
            direccion:'',
            password:'',
            password1:'',
            role:'admin'
        }
    }
    componentDidMount(){
        this.fetchGetList();
    }
    //funcion que ve si la bd esta null se procede a crear el primer usario
    //que tendra el rol de admin
    fetchGetList = async () =>{
        this.setState({ loading: true, error: null });        
        const resp = await Routes.isBDNull();   
        console.log(resp.resp.data.success)     
        if(resp.success === true){
            this.setState({ loading: false, error: null });
            if(resp.resp.data.success === true){
                this.setState({
                    isDataBaseNull:true
                })
            }else{
                this.setState({
                    isDataBaseNull:false
                })
            }
        }else{
            this.setState({ loading: false, error: true });
        }
    }
    handleChangeCreate = e =>{
        this.setState({
            formCreate:{
                ...this.state.formCreate,
                [e.target.name]: e.target.value
            }
        })
    }
    //esta funcion permitira crear el nuevo usario
    clikcFormCreate = async e =>{        
        e.preventDefault();        
        const verifyDatas = this.validateDatas();
        
        if(verifyDatas.success === false){
            this.setState({
                msg:{
                    success:true,
                    alert:'warning',
                    msg:verifyDatas.msg
                }
            })
        }else{
            this.setState({
                msg:{
                    success:true,
                    alert:'info',
                    msg:'Cargando.......'
                }
            })
            const resp = await Routes.createMedico(this.state.formCreate)
            if(resp.data.success ===false){
                this.setState({
                    msg:{
                        success:true,
                        alert:'warning',
                        msg:resp.data.msg
                    }
                })        
            }else{
                this.setState({
                    msg:{
                        success:true,
                        alert:'success',
                        msg:resp.data.msg
                    }
                })
                this.fetchGetList();
            }
        }
        this.timeOut();  
    }
    validateDatas = () =>{
        let datas = this.state.formCreate;
        if(!datas.nombres)return {success:false,msg:"Nombre es obligatorio"};
        if(!datas.apellidos)return {success:false,msg:"Apellido es obligatorio"};
        if(!datas.ci)return {success:false,msg:"C.I. es obligatorio"};
        if(!datas.telefono)return {success:false,msg:"Celular es obligatorio"};
        if(!datas.direccion)return {success:false,msg:"Direccion es obligatorio"};
        if(!datas.password)return {success:false,msg:"Contraceña es obligatorio"};
        if(!datas.password1)return {success:false,msg:"Contraceña de confirmacion es obligatorio"};
        if(datas.password !== datas.password1) return{success:false, msg:"Las contraceñas no son iguales"}
        return {success:true,msg:"puedes continuar"}

    }
    handleChange = e =>{  
        //let d = e.target.name          
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }
    clickForm = (e) => {
        e.preventDefault();
        let datas = this.state.form
        if(!datas.ci){
            this.setState({
                msg:{success:true,msg:'C.I es obligatorio'}
            })
        }else if(!datas.password){
            this.setState({
                msg:{success:true,msg:'Contraceña es obligatorio'}
            })
        }else{
            console.log('no hay errores')
        }
        this.timeOut();  
                
    }
    timeOut = () =>{        
        setTimeout(() => {           
            this.setState({
                msg:{success:false,msg:''}
            })
        }, 3000);
    }
    render(){
        if(this.state.loading){
            return (
                <h1>Cargando........</h1>
            );
        }
        if(this.state.error){
            return (
                <h1>error 500</h1>
            );
        }
        return(
            <React.Fragment>                
                <div className='container1'>
                <img src={image} alt="..."/>               
                <div className={this.state.isDataBaseNull ? 'form-container' : 'form-container active'}>
                    <div 
                    className={!this.state.msg.success ? `msg active alert  alert-${this.state.msg.alert}` : `msg alert alert-${this.state.msg.alert}`} 
                    role="alert">
                        {this.state.msg.msg}
                    </div>
                    {/* <div class="alert alert-info" role="alert">
                        This is a info alert—check it out!
                    </div> */}
                    <div className='header d-flex justify-content-center'>
                        <h3>logo</h3>
                    </div>
                    <div className='body '>  
                        {this.state.isDataBaseNull &&(
                            <FormLogin 
                                onchanges={this.handleChange}
                                formValues={this.state.form}
                                onClick={this.clickForm}
                            />
                        )}
                        {!this.state.isDataBaseNull &&(
                            <MedicoUser
                                onchanges={this.handleChangeCreate}
                                formValues={this.state.formCreate}
                                onClick={this.clikcFormCreate}
                            />
                        )}
                        
                    </div>
                    <div className='footer'>
                        <h4 className='d-flex justify-content-end'>clinica tantos</h4>
                    </div>
                </div>                
            </div>
            </React.Fragment>
        );
    }
}
export default Login;