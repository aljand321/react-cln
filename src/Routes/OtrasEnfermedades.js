import Url from "./Url";
import axios from 'axios';
import Token from "../token";

class OtrasEnfermedades{
    static async CreateEnf(form){
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} };
        //console.log(token, ' esto es el error')
        try {
            const resp = await axios.post(`${Url.urlBackEnd}/api/otrEnfermedades/${token.user.id}`, form,{                
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
    static async listEnfPaciente(id_paciente,id_medico){
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} };
        try {
            const resp = await axios.get(`${Url.urlBackEnd}/api/pacienteEnfermedades/${id_paciente}/${id_medico}`,{                
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
    static async buscarEnf(data,page,pagesize){        
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} };
        let buscar = {
            buscador:data,
            pagenumber:page ? page : 0,
            pagesize
        }
        try {
            const resp = await axios.post(`${Url.urlBackEnd}/api/buscarEnfermedad`,buscar,{                
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
    static async CreatePacienteOtrEnf(form){
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} };
        //console.log(token, ' esto es el error')
        try {
            const resp = await axios.post(`${Url.urlBackEnd}/api/pacienteEnfermedades/${token.user.id}`, form,{                
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
    static async OneOtrEnf(id_otrEnfermedad){    
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} };
        try {
            const resp = await axios.get(`${Url.urlBackEnd}/api/oneOtraEnfermdad/${id_otrEnfermedad}`,{                
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
    static async updateOtrEnf(id_otrEnfermedad,datas){    
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} };
        try {
            const resp = await axios.put(`${Url.urlBackEnd}/api/updateOtraEnfermedad/${id_otrEnfermedad}`,datas,{                
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
export default OtrasEnfermedades;