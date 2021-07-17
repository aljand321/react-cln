import Url from "./Url";
import axios from 'axios';
import Token from "../token";

class RoutesAntNoPtl{
    static async createAntNoPatologicos(form,id_paciente){
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} };
        try {
            const resp = await axios.post(`${Url.urlBackEnd}/api/antecedentesNoPtl/${token.user.id}/${id_paciente}`, form,{               
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
    static async listAntPtl(id_paciente,id_medico){
        const token = await Token.getToken();
        if(!token) return {data:{success:false,msg:"no hay token"} };
        try {
            const resp = await axios.get(`${Url.urlBackEnd}/api/antNoPtlPaciente/${id_paciente}/${id_medico}`,{               
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
export default RoutesAntNoPtl;