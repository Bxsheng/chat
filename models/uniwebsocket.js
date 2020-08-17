/***
 * Uni的websocket
 *
 */
import Config from "../common/config";
import {UserData} from "./userData";
import {ChatMsg} from "./chatMsg";
import {DataContent} from "./datacontent";
import {DataContentAction} from "./dataContentAction";
import {User} from "./user";
import {ChatMsgLog} from "./chatMsgLog";

class UniWebSocket {
    SocketTask
    setIntervalId
    constructor() {
        // console.log(UniWebSocket.instance)
        // if (typeof  UniWebSocket.instance === 'object'){
        //     console.log("已经初始化");
        //     return UniWebSocket.instance
        // }
        this._init();
       // UniWebSocket.instance = this;

    }
    _init(){
		 this.SocketTask =  uni.connectSocket({
			  url:Config.baseNetty,
			  success (value){
				  console.log(value);
			  },
			  fail(res){
				  console.log(res);
			  }
		  })
        //第一次连接数据
        this.SocketTask.onOpen((res)=>{
            console.log(res)
            const userData  = new UserData;
            const user = userData.getUserData()
            const chatMsg = new ChatMsg(user.id)
            const dataContent = new DataContent(DataContentAction.CONNECT,chatMsg,null)
            const param ={
                data:JSON.stringify(dataContent),
                result(res) {
                }
            }
            this.send(param)
            //获取为签收消息
            this.getUnReadMsgList();
            //心跳设置
            this.setHeartbeat();
        })

    }

    /**
     * 设置心跳包发送时间
     */
    setHeartbeat(){
        const _this = this
        this.setIntervalId =   setInterval(()=>{
            console.log("发送心跳消息");
            const dataContent = new DataContent(DataContentAction.KEEPALIVE,null,null)
            const param ={
                data:JSON.stringify(dataContent),
                result:(res)=>{
                    console.log(res);
                },
                fail:(res)=>{
                    _this.stopSetHeartbeat()
                    console.log(res);
                }
            }
            this.send(param)
        },57000)

    }
    stopSetHeartbeat(){
        clearInterval(this.setIntervalId);
        console.log("停止心跳");
    }

    /**
     * 获取所有未读消息
     * @returns {Promise<void>}
     */
    async getUnReadMsgList() {

        const userData  = new UserData;
        const user = userData.getUserData()
        const res = await User.getUnReadMsgList()
        console.log("所有未读的消息");
        //1.保存在聊天界面
        const data = res.data
        if (data !=null && data.length > 0){
            data.forEach((value)=>{
                const msg ={
                    who:0,
                    message:value.msg,
                    time:" "
                }
                ChatMsgLog.setChatMsg(user.id,value.sendUserId,msg)
            })
            //2.保存在聊天快照

            data.forEach((value)=>{
                const result = this.getUserListFindFriend(value.sendUserId)
                if (result){
                    ChatMsgLog.setChatFriendList(result.friendUserId,result.friendFaceImage,result.friendNickname,value.msg,true)
                    //消息传送到聊天快照页面 进行数据的显示
                    // 状态为 true 提醒页面更新消息

                }
            })
            // 3. 批量签收信息
                let Ids =''
                data.forEach((value)=>{
                    Ids = Ids+value.id+','
                })
                const dataContent = new DataContent(DataContentAction.SIGNED,null,Ids)
                const param ={
                    data:JSON.stringify(dataContent),
                }
                this.send(param)
            uni.$emit("chatFriendList",{status:true})
        }
    }

    send(param){

        this.SocketTask.send({
            data:param.data,
            success(res){
                console.log(res);
                return param.result && param.result(true)
            },
            fail(res){
                console.log(res);
               // return param.fail && param.fail(false)
                //return param.result && param.result(false)
            }
        })
    }

    /**
     * 关闭连接
     */
    closeSocket(){
        this.SocketTask.close({
            code:1000,
            success(){
                console.log("链接关闭")
            }
        })
    }
    /**
     * 在本地列表中获取用户所
     * @param friend
     */
    getUserListFindFriend(friend){

        const friendList =JSON.parse(uni.getStorageSync("userFriendList"))
        let result
        for (let i =0; i< friendList.length ;i++){
            result = friendList[i].data.find((res)=> res.friendUserId == friend)
            console.log(result)
            if (result){
                break
            }
        }
        return result
        //  console.log(result)
    }
}
export {
    UniWebSocket
}