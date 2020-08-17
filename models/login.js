/**
 *@Author ：Bxsheng
 *@Data：2020-08-04
 */
import {Http} from "../utils/http";

class Login {
    static async login(data) {
        return await Http.request({
            url: `user/registOrLogin`,
            data,
            method:`POST`
        })
    }
}
export {
    Login
}
