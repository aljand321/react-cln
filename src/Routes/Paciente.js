import Url from "./Url";
import axios from 'axios';
import Token from "../token";

class Pacientes {
    static async create (form){
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} };
        //console.log(token, ' esto es el error')
        try {
            const resp = await axios.post(`${Url.urlBackEnd}/api/paciente/${token.user.id}`, form,{
                headers: {
                    'c_token': token.t
                }
            });
            if(resp.status === 200) return resp;
            if(resp.status === 500) return {data:{success:false,msg:"error 500", error:'500'}};
        } catch (error) {
            return {data:{success:false,msg:"error 500",error:'500'}};
        }
    }
    static async pacientes (){
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} };
        try {
            const resp = await axios.get(`${Url.urlBackEnd}/api/pacientes`,{
                headers: {
                    'c_token': token.t
                }
            });
            if(resp.status === 200) return resp;
            if(resp.status === 500) return {data:{success:false,error:'500'}};
        } catch (error) {
            return {data:{success:false,error:'500'}};
        }
    }
    static async buscarPaciente (data,p,l){
        //console.log(data, 'esto lo que quiero ver');
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} };
        let buscar = {
            buscar:data,
            pagina: p || 0,
            limite: l || 8
        }
        try {
            const resp = await axios.post(`${Url.urlBackEnd}/api/buscarPaciente`,buscar,{
                headers: {
                    'c_token': token.t
                }
            });
            if(resp.status === 200) return resp;
            if(resp.status === 500) return {data:{success:false,error:'500'}};
        } catch (error) {
            return {data:{success:false,error:'500'}};
        }
    }
    static async onePaciente(id_paciente){
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} };
        try {
            const resp = await axios.get(`${Url.urlBackEnd}/api/onePaciente/${id_paciente}`,{
                headers: {
                    'c_token': token.t
                }
            });
            if(resp.status === 200) return resp;
            if(resp.status === 400) return {data:{success:false,error:'400'}};
            if(resp.status === 500) return {data:{success:false,error:'500'}};
        } catch (error) {
            return {data:{success:false,error:'500'}};
        }
    }
}
export default Pacientes;