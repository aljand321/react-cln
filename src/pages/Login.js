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
        isDataBaseNull:null,
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
        erroLogin:{
            ci:'',
            password:''
        },
        formCreate:{
            nombres:'',
            apellidos:'',
            ci:'',
            password:'',
            password1:''
        },
        errorCreate:{
            nombres:'',
            apellidos:'',
            ci:'',
            password:'',
            password1:''
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
                this.setState({ loading: false, error: true });
            }
        }    
        
    }
    handleChangeCreate = e =>{
        const {name,value} = e.target;
        this.setState({
            formCreate:{
                ...this.state.formCreate,
                [name]:value
            },
            errorCreate:{
                ...this.state.errorCreate,
                [name]:value.length === 0 ? 'obligado' : ''
            }
        })
    }
    //esta funcion permitira crear el nuevo usario
    clikcFormCreate = async e =>{        
        e.preventDefault();   
        let arr = {};   
        for(const name in this.state.formCreate) {
            if(!this.state.formCreate[name]){
                arr[name] = 'obligado';
            }
        }
        this.setState({
            errorCreate:arr
        })
        const verifyDatas = this.validateDatas();
        console.log(verifyDatas, ' estp essssss')
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
            try {
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
                
            } catch (error) {
                console.error(error);
                this.setState({ loading: false, error: true });
            }
            
            
        }
        this.timeOut();  
    }
    validateDatas = () =>{        
        let datas = this.state.formCreate;        
        if(datas.password !== datas.password1) {
            this.setState({
                errorCreate:{
                    nombres:'',
                    apellidos:'',
                    ci:'',
                    password:'',
                    password1:'obligado'
                }
            })
        }
        let arr = {};
        for(const name in datas){
            if(!datas[name]){
                arr[name] = 'false'
            }
        }
        console.log(arr);
        if(Object.keys(arr).length !== 0) return {success:false, msg:'Todos los campos son obligatorios '}
        return {success:true,msg:"puedes continuar"}

    }
    handleChange = e =>{  
        //let d = e.target.name    
        const {name,value} = e.target      
        this.setState({
            form:{
                ...this.state.form,
                [name]:value
            }
        })
        this.setState({
            erroLogin:{
                ...this.state.erroLogin,
                [name]:value.length === 0 ? "obligado" : value
            }
        })
    }
    clickForm = async (e) => {
        e.preventDefault();
        let datas = this.state.form
        if(!datas.ci){
            this.setState({
                msg:{success:true,alert:'warning', msg:'C.I es obligatorio'},
                erroLogin:{
                    ci:'obligado',
                    password: ''
                }
            })
        }else if(!datas.password){
            this.setState({
                msg:{success:true,alert:'warning', msg:'Contraceña es obligatorio'},
                erroLogin:{
                    ci:'',
                    password: 'obligado'
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
            
            if(this._isMounted){
                const resp = await Routes.login(this.state.form); 
                console.log(resp, ' ssasdjahsdkjahskd')
                if(resp.data.success === false){
                    this.setState({
                        msg:{
                            success:true,
                            alert:'warning',
                            msg:resp.data.msg
                        },
                        erroLogin:{
                            ci:resp.data.name === 'ci' ? 'obligado' : '',
                            password: resp.data.name === 'password' ? 'obligado' : '',
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
        }else{
            console.log('desmontado desde el login')
        }
        
    }
    componentWillUnmount() {
        this._isMounted = false;
        this.setState = (state,callback)=>{
            return;
        };
    }
    render(){        
        
        return(
            <React.Fragment>       
                <div className="overlay-wrapper"> 
                    {this.state.loading && 
                        <div className="overlay"><i className="fas fa-3x fa-sync-alt fa-spin" /><div className="text-bold pt-2">Loading...</div></div>
                    }

                    <div class="hold-transition login-page">   

                        <img className="imgLogo" src={image} alt="..."/>                         
                        {this.state.error &&
                            <section id="not-found">
                                
                                <div className="circles">
                                    <p>404<br />
                                        <small>Pagina no Encontrada</small>
                                    </p>
                                    <span className="circle big" />
                                    <span className="circle med" />
                                    <span className="circle small" />
                                </div>
                            </section>
                        }
                     
                        <div 
                            className={!this.state.msg.success ? `msg active alert  alert-${this.state.msg.alert}` : `msg alert alert-${this.state.msg.alert}`} 
                            role="alert">
                                {this.state.msg.msg}
                        </div>
                        
                        {this.state.isDataBaseNull === true &&(
                            <div className="login-box">
                                <FormLogin 
                                    onchanges={this.handleChange}
                                    formValues={this.state.form}
                                    onClick={this.clickForm}    
                                    msg={this.state.erroLogin}                                  
                                />
                            </div>
                        )}
                        {this.state.isDataBaseNull === false &&(
                            <div class="card">
                                <div class="card-body register-card-body">
                                    <MedicoUser
                                        onchanges={this.handleChangeCreate}
                                        formValues={this.state.formCreate}
                                        onClick={this.clikcFormCreate}
                                        msg={this.state.errorCreate}    
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>      
            </React.Fragment>
        );
    }
}
export default Login;