/**
 *@Author ：Bxsheng
 *@Data：2020-08-04
 */
import {promisic} from "./util";
import Config from "../common/config";

class Http{
    static async request({url,data,method='GET'}){
        //使用promisic 同步数据信息
        const res = await promisic(uni.request)({
            url:`${Config.baseUrl}${url}`,
            data,
            method,
            })
        return res.data;
    }

}

export {
    Http
}
