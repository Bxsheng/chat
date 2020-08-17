class ChatMsg{
	senderId
	receiverId
	msg
	msgId
	constructor(senderId,receiverId,msg,msgId) {
	    this.senderId  = senderId
		this.receiverId  = receiverId
		this.msg  = msg
		this.msgId  = msgId
	}
	
}
export{
	ChatMsg
}