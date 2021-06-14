import Url from "./Url";
import axios from 'axios';
class Routes {
    static async isBDNull (){
        try {
            const resp = await axios.get(Url.urlBackEnd+'/api/getList')            
            if(resp.status === 500) return {success:false}
            if (resp.status === 200) return {success:true, resp}
        } catch (error) {
            console.error(error)
            return {success:false,msg:"error 500", error}
        }
    }
    static async createMedico(forms){
        try {
            const resp = await axios.post(Url.urlBackEnd+'/api/medico',forms);
            if(resp.status === 500) return{success:false,msg:"error 500"};
            if(resp.status === 200) return resp
        } catch (error) {
            return {success:false,msg:"error 500"}
        }
    }
}
export default Routes;