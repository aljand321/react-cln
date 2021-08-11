import Url from "./Url";
import axios from 'axios';
import Token from "../token";

class RoutesConsultas{
    static async CreateConsulta(form,id_paciente){
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} };
        //console.log(token, ' esto es el error')
        try {
            const resp = await axios.post(`${Url.urlBackEnd}/api/consulta/${id_paciente}/${token.user.id}`, form,{                
                headers: {
                    'c_token': token.t
                }
            });
            if(resp.status === 200) return resp;
            if(resp.status === 500) return {data:{success:false, error:'500'}};
        } catch (error) {
            return {data:{success:false,msg:"error 500",error:'500'}};
        }
    }
    static async ListConsultasPaciente(id_paciente,id_medico){
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} };
        //console.log(token, ' esto es el error')
        try {
            const resp = await axios.get(`${Url.urlBackEnd}/api/consulta/${id_paciente}/${id_medico}`,{                
                headers: {
                    'c_token': token.t
                }
            });
            if(resp.status === 200) return resp;
            if(resp.status === 500) return {data:{success:false, error:'500'}};
        } catch (error) {
            return {data:{success:false,msg:"error 500",error:'500'}};
        }
    }
    static async oneConsulta(id_consulta){
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} };
        //console.log(token, ' esto es el error')
        try {
            const resp = await axios.get(`${Url.urlBackEnd}/api/oneConsulta/${id_consulta}`,{                
                headers: {
                    'c_token': token.t
                }
            });
            if(resp.status === 200) return resp;
            if(resp.status === 500) return {data:{success:false, error:'500'}};
        } catch (error) {
            return {data:{success:false,msg:"error 500",error:'500'}};
        }
    }
    static async createRetorno(id_consulta,form){
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} };
        //console.log(token, ' esto es el error')
        try {
            const resp = await axios.post(`${Url.urlBackEnd}/api/retorno/${token.user.id}/${id_consulta}`, form,{                
                headers: {
                    'c_token': token.t
                }
            });
            if(resp.status === 200) return resp;
            if(resp.status === 500) return {data:{success:false, error:'500'}};
        } catch (error) {
            return {data:{success:false,msg:"error 500",error:'500'}};
        }
    }
    static async listRetorno(id_consulta){
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} };
        try {
            const resp = await axios.get(`${Url.urlBackEnd}/api/retorno/${id_consulta}`,{                
                headers: {
                    'c_token': token.t
                }
            });
            if(resp.status === 200) return resp;
            if(resp.status === 500) return {data:{success:false, error:'500'}};
        } catch (error) {
            return {data:{success:false,msg:"error 500",error:'500'}};
        }
    }
}
export default RoutesConsultas;
