import Url from "./Url";
import axios from 'axios';
import Token from "../token";

class Transfuciones{
    static async CreateTransfucion(form){
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} };
        //console.log(token, ' esto es el error')
        try {
            const resp = await axios.post(`${Url.urlBackEnd}/api/transfcion/${token.user.id}`, form,{                
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
    static async listTransfucionPaciente(id_paciente,id_medico){
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} };
        try {
            const resp = await axios.get(`${Url.urlBackEnd}/api/pacienteTransfuciones/${id_paciente}/${id_medico}`,{                
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
    static async buscarTransfucion(data,pagesize){        
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} };
        let buscar = {
            buscador:data,
            pagenumber:1,
            pagesize
        }
        try {
            const resp = await axios.post(`${Url.urlBackEnd}/api/buscarTransfucion`,buscar,{                
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
    static async CreatePacienteTransfucion(form){
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} };
        //console.log(token, ' esto es el error')
        try {
            const resp = await axios.post(`${Url.urlBackEnd}/api/pacienteTransfuciones/${token.user.id}`, form,{                
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
export default Transfuciones;