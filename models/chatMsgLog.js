/**
 * 聊天信息记录保存
 */
class ChatMsgLog {
    static chatFriendList = 'chatFriendList'

    /**
     * 获取聊天信息
     * @param sendId
     * @param friendId
     * @returns {[]}
     */
    static getChatMsg(sendId,friendId){
        const chat = "chat"+sendId+friendId;
        // let chatMsgList =plus.Storage.getItem(chat)
        const chatMsgList =uni.getStorageSync(chat)
        if (chatMsgList != null && chatMsgList.length > 0){
            return  JSON.parse(chatMsgList)

        }else{
            return []
        }

    }

    /**
     * 保存聊天信息
     * @param sendId
     * @param friendId
     * @param msg
     */
    static setChatMsg(sendId,friendId,data){
        const chat = "chat"+sendId+friendId;
        let result = []
        result=this.getChatMsg(sendId,friendId)
        result.push(data)
        uni.setStorageSync(chat,JSON.stringify(result))
    }

    // 闲聊界面列表信息获取
    static getChatFriendList(){
        const list = uni.getStorageSync(this.chatFriendList)
        if (list != null && list.length > 0){
            return  JSON.parse(list)

        }else{
            return []
        }
    }

    /**
     * 设置聊天列表信息
     * @param friendId
     * @param friendImage
     * @param msg
     * @param status
     */
    static setChatFriendList(friendId,friendImage,title,msg,status){
        const data ={
            friendId:friendId,
            friendImage:friendImage,
            msg:msg,
            title:title,
            status:status
        }
        console.log(data);

        let result = []
        result = this.getChatFriendList();
        //朋友聊天信息判断是否已经在列表里面了，如果在就删除 然后添加新的消息进去
       const index =  result.findIndex((item)=>item.friendId ===data.friendId)
        if (index === -1){
            //添加数据
            result.push(data)
        }else{
           result.splice(index,1)
           result.push(data)
        }
        uni.setStorageSync(this.chatFriendList,JSON.stringify(result.reverse()))
    }

    /**
     * 根据friendid 修改已读状态
     * @param friendId
     */
    static setChatFriendId(friendId){
        let result = []
        result = this.getChatFriendList();
        const index =  result.findIndex((item)=>item.friendId ===friendId)
        if (index != -1){
            result[index].status = false
            uni.setStorageSync(this.chatFriendList,JSON.stringify(result))
        }

    }

    /**
     * 获取聊天通信连接缓存 避免重复创建
     * @param friendId
     */
    static getChatMsgWebSocket(friendId){
        const ChatKey ="chatonMessageList";

        const list = uni.getStorageSync(ChatKey)

        const data ={
            friendId:friendId
        }
        //有数据 查找是否创建了缓存
        if (list != null && list.length > 0){
            let res = JSON.parse(list)
            const result = res.find(value=>value.friendId === friendId )
              if(result){
                  console.log("已经存在")
                  //存在返回false
                  return false
              }else{
                  //不存在创建
                  console.log("非首次创建不存在")
                  res.push(data)
                  uni.setStorageSync(ChatKey,JSON.stringify(res))
                  return  true
              }
        }else{
            console.log("首次创建")
            //首次创建
            let res = []
            res.push(data)
            uni.setStorageSync(ChatKey,JSON.stringify(res))
            return  true
        }
    }


}
export {
    ChatMsgLog
}