import Url from "./Url";
import axios from 'axios';
import Token from "../token";
class MedicoRoutes {
    static async create (datas){
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} } 
        try {
            const resp = await axios.post(`${Url.urlBackEnd}/api/createMedico/${token.user.id}`,datas,{
                headers: {
                  'c_token': token.t
                }
            })
            if(resp.status === 200) return resp;
            if(resp.status === 500) return {data:{success:false,msg:"error 500"}};
        } catch (error) {
            return {data:{success:false,msg:"error 500"}};
        }
    }
    static async listMedicos(){
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} } 
        try {
            const resp = await axios.get(`${Url.urlBackEnd}/api/medico`,{
                headers: {
                    'c_token': token.t
                }
            })
            if(resp.status === 200) return resp
            if(resp.status === 500) return {data:{success:false,msg:"error 500"}};
        } catch (error) {
            return {data:{success:false,msg:"error 500"}};
        }
    }
    static async medico(id_medico){
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} } 
        try{
            const resp = await axios.get(`${Url.urlBackEnd}/api/medico/${id_medico}`,{
                headers: {
                    'c_token': token.t
                }
            })
            if(resp.status === 200) return resp
            if(resp.status === 500) return {data:{success:false,msg:"error 500"}};
        }catch(error){
            return {data:{success:false,msg:"error 500"}};
        }
    }
    static async updateContact (datas,id_medicoUser){
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} } 
        try {
            const resp = await axios.put(`${Url.urlBackEnd}/api/medico/${id_medicoUser}`,datas,{
                headers: {
                  'c_token': token.t
                }
            })
            if(resp.status === 200) return resp;
            if(resp.status === 500) return {data:{success:false,msg:"error 500"}};
        } catch (error) {
            return {data:{success:false,msg:"error 500"}};
        }
    }
    static async listaPacientesMedico (id_medicoUser,buscador){
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} } 
        let buscar = {
            buscador
        }
        try {
            const resp = await axios.post(`${Url.urlBackEnd}/api/listPasientemedico/${id_medicoUser}`,buscar,{
                headers: {
                  'c_token': token.t
                }
            })
            if(resp.status === 200) return resp;
            if(resp.status === 500) return {data:{success:false,msg:"error 500"}};
        } catch (error) {
            return {data:{success:false,msg:"error 500"}};
        }
    }
    static async pacienteConsultaDoctor (id_medicoUser,buscador){
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} } 
        
        try {
            const resp = await axios.get(`${Url.urlBackEnd}/api/consultasMedico/${id_medicoUser}?buscar=${buscador}`,{
                headers: {
                  'c_token': token.t
                }
            })
            if(resp.status === 200) return resp;
            if(resp.status === 500) return {data:{success:false,msg:"error 500"}};
        } catch (error) {
            return {data:{success:false,msg:"error 500"}};
        }
    }
    static async  listUsers (){
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} } 
        try {
            const resp = await axios.get(`${Url.urlBackEnd}/api/listaUsers`,{
                headers: {
                    'c_token': token.t
                }
            })
            if(resp.status === 200) return resp
            if(resp.status === 500) return {data:{success:false,msg:"error 500"}};
        } catch (error) {
            return {data:{success:false,msg:"error 500"}};
        }
    }
}
export default MedicoRoutes;