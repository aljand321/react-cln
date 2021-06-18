import Url from "./Url";
import axios from 'axios';
import Token from "../token";
class MedicoRoutes {
    static async create (datas){
        const token = await Token.getToken();
        console.log(token, '  asdkajsdkajshdiuabsdkg')
        if(!token) return {success:false,msg:"no hay token"} 
        try {
            const resp = await axios.post(`${Url.urlBackEnd}/api/createMedico`,datas,{
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