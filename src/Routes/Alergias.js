import Url from "./Url";
import axios from 'axios';
import Token from "../token";

class Alergias{
    static async CreateAlergias(form){
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} };
        //console.log(token, ' esto es el error')
        try {
            const resp = await axios.post(`${Url.urlBackEnd}/api/alergias/${token.user.id}`, form,{
                
                headers: {
                    'c_token': token.t
                }
            });
            if(resp.status === 200) return resp;
            if(resp.status === 400) return {data:{success:false,error:'400'}};
            if(resp.status === 500) return {data:{success:false, error:'500'}};
        } catch (error) {
            return {data:{success:false,msg:"error 500",error:'500'}};
        }
    }
    static async listAlergiasPaciente(id_paciente,id_medico){       
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} };
        try {
            const resp = await axios.get(`${Url.urlBackEnd}/api/pacienteAlergias/${id_paciente}/${id_medico}`,{                
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

    static async buscarAlergia(data,pagesize){   
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} };
        let buscar = {
            buscador:data,
            pagenumber:1,
            pagesize
        }
        try {
            const resp = await axios.post(`${Url.urlBackEnd}/api/buscarAlergia`,buscar,{                
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
    static async CreatePacienteAlergias(form){
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} };
        //console.log(token, ' esto es el error')
        try {
            const resp = await axios.post(`${Url.urlBackEnd}/api/pacienteAlergias/${token.user.id}`, form,{                
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

export default Alergias