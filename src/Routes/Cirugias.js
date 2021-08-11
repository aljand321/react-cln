import Url from "./Url";
import axios from 'axios';
import Token from "../token";

class Cirugias{
    static async CreateCirugia(form){
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} };
        //console.log(token, ' esto es el error')
        try {
            const resp = await axios.post(`${Url.urlBackEnd}/api/cirugias/${token.user.id}`, form,{                
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
    static async listCirugiasPaciente(id_paciente,id_medico){
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} };
        try {
            const resp = await axios.get(`${Url.urlBackEnd}/api/pacienteCirugias/${id_paciente}/${id_medico}`,{                
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
    static async buscarCirugia(data,page,pagesize){        
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} };
        let buscar = {
            buscador:data,
            pagenumber:page ? page : 0,
            pagesize
        }
        try {
            const resp = await axios.post(`${Url.urlBackEnd}/api/buscarCirugia`,buscar,{                
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
    static async CreatePacienteCirugia(form){
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} };
        //console.log(token, ' esto es el error')
        try {
            const resp = await axios.post(`${Url.urlBackEnd}/api/pacienteCirugias/${token.user.id}`, form,{                
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
    static async oneCirugia(id_cirugia){
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} };
        try {
            const resp = await axios.get(`${Url.urlBackEnd}/api/oneCirugia/${id_cirugia}`,{                
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
    static async updateCirugia(select,form){
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} };
        //console.log(token, ' esto es el error')
        try {
            const resp = await axios.put(`${Url.urlBackEnd}/api/updateCirugia/${select}`, form,{                
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
export default Cirugias;