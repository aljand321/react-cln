import React from 'react';
import '../components/login/formLogin.css';
import image from '../images/image.jpg';
import FormLogin from '../components/login/formLogin';
import MedicoUser from '../components/Forms/MedicoUser';
//routes
import Routes from '../Routes/index'; 
class Login extends React.Component{
    _isMounted = false;
    state = {
        isDataBaseNull:false,
        msg:{
          success:false,
          alert:'info',
          msg:''  
        },
        loading: false,
        error:null,  
        bdConet:null,      
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
            edad:'',
            especialidad:'',
            password:'',
            password1:'',
            role:'admin'
        }
    }
    componentDidMount(){
        this._isMounted = true;
        this.fetchGetList();
    }
    //funcion que ve si la bd esta null se procede a crear el primer usario
    //que tendra el rol de admin
    fetchGetList = async () =>{
        
        this.setState({ loading: true, error: null });     
        
        const resp = await Routes.isBDNull(); 
        if(this._isMounted){
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
                this.setState({ loading: false, error: null,bdConet:false });
            }
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
            const resp = await Routes.createMedico(this.state.formCreate);
            if(this._isMounted){
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
        if(!datas.edad)return {success:false,msg:"Fecha de nacimineto es obligatorio"};
        if(!datas.especialidad)return {success:false,msg:"Esoecialidad es obligatorio"};
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
    clickForm = async (e) => {
        e.preventDefault();
        let datas = this.state.form
        if(!datas.ci){
            this.setState({
                msg:{success:true,alert:'warning', msg:'C.I es obligatorio'}
            })
        }else if(!datas.password){
            this.setState({
                msg:{success:true,alert:'warning', msg:'Contraceña es obligatorio'}
            })
        }else{
            this.setState({
                msg:{
                    success:true,
                    alert:'info',
                    msg:'Cargando.......'
                }
            })
            
            if(this._isMounted){
                const resp = await Routes.login(this.state.form); 
                console.log(resp, ' ssasdjahsdkjahskd')
                if(resp.data.success === false){
                    this.setState({
                        msg:{
                            success:true,
                            alert:'warning',
                            msg:resp.data.msg
                        }
                    });
                }else{
                    const parsed = JSON.stringify({
                        loged:true,
                        user:resp.data.data,
                        t: resp.data.token
                    });
                    localStorage.setItem('tok',parsed);
                    this.props.parentCallback()
                }
            }
            
        }
        this.timeOut();  
                
    }
    timeOut = () =>{      
        if(this._isMounted){
            setTimeout(() => {           
                this.setState({
                    msg:{success:false,msg:''}
                })
            }, 3000);
        }
        
    }
    componentWillUnmount() {
        this._isMounted = false;
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
        if(this.state.bdConet === false){
            return (
                <h1>No hay coneccion con la base de datos</h1>
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