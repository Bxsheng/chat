/**
 *@Author ：Bxsheng
 *@Data：2020-08-05
 */
import {Http} from "../utils/http";
import {UserData} from "./userData";

class User {
    static async modifyName(data) {
        const res = await Http.request({
            url: `user/modifyUserName`,
            data,
            method: "POST"
        })
        return res;
    }

    /**
     * 好友搜索接口
     * @param data {myId:"",friendName:""}
     * @returns {Promise<*>}
     */
    static async searchFriend(myId,friendName){
        const res = await Http.request({
            url: `user/search?myId=${myId}&friendName=${friendName}`,
            method: "POST"
        })
        return res;
    }

    /**
     * 添加好友接口
     * @param data {myId:"",friendName:""}
     * @returns {Promise<*>}
     */
    static async addFriend(myId,friendName){
        const res = await Http.request({
            url: `user/addFriend?myId=${myId}&friendName=${friendName}`,
            method: "POST"
        })
        return res;
    }

    /**
     * 获取所有的好友请求信息
     * @param myId
     * @returns {Promise<*>}
     */
    static async listFriendRe(myId){
        const res = await Http.request({
            url: `user/listFriendRe?myId=${myId}`,
            method: "POST"
        })
        return res;
    }


    /**
     * 忽略或者接受好友请求
     * @param myId
     * @param friendId
     * @param operType
     * @returns {Promise<void>}
     * @constructor
     */
    static async IgnoreAndAcceptFriend(myId,friendId,operType){
        const res = await Http.request({
            url: `user/lAndAFriendReq?myId=${myId}&friendId=${friendId}&operType=${operType}`,
            method: "POST"
        })
        return res;
    }

    /**
     * 获取好友申请数量
     * @param myId
     * @returns {Promise<void>}
     */
    static async friendReauestCount(myId){
        const res = await Http.request({
            url: `user/friendReauestCount?myId=${myId}`,
            method: "POST"
        })
        return res;
    }

    /**
     * 获取好友列表信息
     * @param myId
     * @returns {Promise<any.data>}
     */
    static async getFriendsList(myId){
        const res = await Http.request({
            url: `user/getFriendsList?myId=${myId}`,
            method: "POST"
        })
        return res;
    }

    /**
     * 获取所有的未读消息列表
     * @param myId
     * @returns {Promise<void>}
     */
    static async getUnReadMsgList(){
        const userData  = new UserData;
        const user = userData.getUserData()
        const res = await Http.request({
            url: `user/getUnReadMsgList?myId=${user.id}`,
            method: "POST"
        })
        return res;
    }

}
export {
    User
}
