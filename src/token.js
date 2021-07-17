import Url from './Routes/Url';
import axios from 'axios';
class Token {
    static async getToken(){
        const token = await JSON.parse(localStorage.getItem("tok"))
        return token
    }
    static async validateToken(){
        const token = await tokenGet();
        if(!token) return {success:false,msg:"no hay token"}
        try {
            const resp = await axios.get(`${Url.urlBackEnd}/api/verifyToken`,{
                headers: {
                    'c_token': token.t
                }
            });
            console.log(resp);
            return resp.data
        } catch (error) {
            return {success:false,msg:"No hay ceneccion con la BD"}
        }
    }
}
async function tokenGet(){
    const token = await JSON.parse(localStorage.getItem("tok"))
    return token
}
export default Token;