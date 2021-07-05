import Url from "./Url";
import axios from 'axios';
import Token from "../token";

class RoutesInmunizacion{
    static async createInmunizacion(form){
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} };
        try {
            const resp = await axios.post(`${Url.urlBackEnd}/api/createVacuna/${token.user.id}`, form,{         
                headers: {
                    'c_token': token.t
                }
            });
            if(resp.status === 200) return resp;
            if(resp.status === 500) return {data:{success:false, error:'500'}};
        } catch (error) {       
            console.log(error)  
            return {data:{success:false,msg:"error 500",error:'500'}};
        }
    }
    static async buscarVacuna(form){
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} };
        const data = {
            buscador:form
        }
        try {
            const resp = await axios.post(`${Url.urlBackEnd}/api/buscarVacuna`, data,{         
                headers: {
                    'c_token': token.t
                }
            });
            if(resp.status === 200) return resp;
            if(resp.status === 500) return {data:{success:false, error:'500'}};
        } catch (error) {       
            console.log(error)  
            return {data:{success:false,msg:"error 500",error:'500'}};
        }
    }
    static async CreatePacienteVacunas(form){
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} };
        try {
            const resp = await axios.post(`${Url.urlBackEnd}/api/vacunaPaciente/${token.user.id}`, form,{                
                headers: {
                    'c_token': token.t
                }
            });
            if(resp.status === 200) return resp;
            if(resp.status === 500) return {data:{success:false,msg:'error 500', error:'500'}};
        } catch (error) {
            return {data:{success:false,msg:"error 500",error:'500'}};
        }
    }
    static async listVacunasPaciente(id_paciente){
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} };
        try {
            const resp = await axios.get(`${Url.urlBackEnd}/api/vacunaPaciente/${id_paciente}`,{                
                headers: {
                    'c_token': token.t
                }
            });
            if(resp.status === 200) return resp;
            if(resp.status === 500) return {data:{success:false,msg:'error 500', error:'500'}};
        } catch (error) {
            return {data:{success:false,msg:"error 500",error:'500'}};
        }
    }
}
export default RoutesInmunizacion;