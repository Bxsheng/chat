<template>
	<view>
		<view class="content" :style="contentStyle">
			<view v-for="item in message">
				<view class="left-mian" v-if="item.who === 0">
					<view class="left-image">
						<u-avatar :src=friendData.friendFaceImage  size="90" mode="circle"></u-avatar>
					</view>
					<view class="left-info">
						<view class="left-title">
							<text>{{friendData.friendNickname}}</text>
						</view>
						<view class="left-message" >
							<text>{{item.message}}</text>
						</view>
					</view>
				</view>
				<view class="right-mian" v-if="item.who === 1">
					<view class="right-image">
						<u-avatar :src=userData.faceImage  size="90" mode="circle"></u-avatar>
					</view>
					<view class="right-info">
						<view class="right-title">
							<text>{{userData.nickname}}</text>
						</view>
						<view class="right-message" :style="leftStyle">
							<text>{{item.message}}</text>
						</view>
					</view>
				</view>
			</view>


			<view style="width: 20rpx;height: 90rpx;"></view>
		</view>

		<view class="send-message">
			<view class="send-voice">
				<u-icon  size="60" name="mic"></u-icon>
			</view>
			<view class="input-message">
				<view class="send-input" >
					<u-input v-model="value" cursor-spacing="10" type="text" border="border" @blur="sendBlur" @focus="sendFocus" @input="sendInput"  />
				</view>
				<view class="send">
					<u-button  :disabled="sendStatus" :custom-style="customStyle" @click="onSend" >发送</u-button>
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import Config from "../../common/config";
	import {UniWebSocket} from "../../models/uniwebsocket";
	import {UserData} from "../../models/userData";
	import {ChatMsg} from "../../models/chatMsg";
	import {DataContent} from "../../models/datacontent";
	import {DataContentAction} from "../../models/dataContentAction";
	import {ChatMsgLog} from "../../models/chatMsgLog";
	export default {

		data() {
			return {
				value:'',
				customStyle: {
					height:'70rpx',
					backgroundColor:'#FF9090'
				},
				sendStatus:true,
				leftStyle:"",
				contentStyle:"",
				message:[],
				friendData:null,
				userData:Object
			}
		},
		created() {
			const	_this = this
			uni.$on('chatMsgData', value => {
				console.log(value)
				const result  =JSON.parse(value.data)
				const msg ={
					who:0,
					image:_this.friendData.friendFaceImage,
					title:_this.friendData.friendNickname,
					message:result.chatMsg.msg,
					time:" "
				}
				console.log(result)
				console.log(result.chatMsg.senderId);
				console.log(_this.friendData.friendUserId);
			    console.log(result.chatMsg.senderId === _this.friendData.friendUserId);
				if (result.chatMsg.senderId === _this.friendData.friendUserId){
					console.log("成功")
					this.message.push(msg)
					ChatMsgLog.setChatFriendList(this.friendData.friendUserId,this.friendData.friendFaceImage,this.friendData.friendNickname,result.chatMsg.msg,false)
					this.setContentHeight()
				}
			})

		},
		onLoad(value) {
			//绑定朋友数据
			const data =JSON.parse(value.data)
			console.log(data);
			this.friendData = data
			uni.setNavigationBarTitle({
				title: data.friendNickname
			});

			//设置所有快照信息状态为已读
			ChatMsgLog.setChatFriendId(data.friendUserId)

		},
		async mounted() {
			const userData  = new UserData;
			const user = userData.getUserData()
			this.userData = user

			this.setContentHeight()
		},
		onShow:function(){
			console.log("显示")
			//this.setContentHeight();
			//初始化显示数据
			this.message = this.setShowDataMessage();
			//}
		},
		onUnload:function(){
			console.log("隐藏")
			uni.$off('chatMsgData')
			
		},
		methods: {
			setShowDataMessage(){
				const userData  = new UserData;
				const user = userData.getUserData()
				//获取信息记录
				const chatLog = ChatMsgLog.getChatMsg(user.id,this.friendData.friendUserId)
				return chatLog;
			},
			//设置聊天内容的大小信息和屏幕信息大小
			//获取屏幕高度
			getSystemInfo(){
				uni.getSystemInfo({
					success(res) {
						uni.setStorageSync("systemInfo",res)
					}
				})
			},
			//键盘事件
			/**
			 * @param {Object} event获取输入值
			 */
			sendInput(value){
				this.value =value;

			},
			/**
			 * @param {Object} value 点击触发事件
			 */
			sendFocus(){
				this.sendStatus = false
				this.setContentHeight();
				
			},
			/**
			 * 失去焦点
			 */
			sendBlur(){
				this.sendStatus = false
			},
			onSend(){
				const sendValue = this.value
				const _this = this
				if( sendValue!= null && sendValue.length >0){
					const userData  = new UserData;
					const user = userData.getUserData()
					const chatMsg = new ChatMsg(user.id,this.friendData.friendUserId,sendValue,null)
					const dataContent = new DataContent(DataContentAction.CHAT,chatMsg,null)
					const param = {
						 	data:JSON.stringify(dataContent),
					}

					uni.$on("sendSuccess",()=>{
						const msg ={
							who:1,
							image:user.faceImage,
							title:user.nickname,
							message:sendValue,
							time:""
						}
						console.log(sendValue)
						_this.message.push(msg)
						console.log(msg)
						//保存信息记录
						ChatMsgLog.setChatMsg(user.id,_this.friendData.friendUserId,msg)
						ChatMsgLog.setChatFriendList(_this.friendData.friendUserId,
								_this.friendData.friendFaceImage,_this.friendData.friendNickname,sendValue,false)
					})
					uni.$emit("sendMessage",param)

					//最底部显示
					_this.setContentHeight()
					_this.value =""
				
				}

			},
			/**
			 * 聊天窗口滚动到最底部
			 */
			setContentHeight(){
				uni.createSelectorQuery().select(".content").boundingClientRect(data=>{//目标节点
					if (data.height>uni.getStorageSync("systemInfo").screenHeight){
						uni.pageScrollTo({
							duration:0,//过渡时间必须为0，uniapp bug，否则运行到手机会报错
							scrollTop:data.height,//滚动到实际距离是元素距离顶部的距离减去最外层盒子的滚动距离
						})
					}
				}).exec();
			}

		}
	}
</script>

<style>
	page{
		background-color: #F0F0F0;
	}
	.send-message{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0rpx;
	}
	.send-voice{
		/* margin-left: 10rpx;
		margin-right: 10rpx; */
	}
	.send-input{
		width: 100%;
		padding: 10rpx;

	}
	.input-message{
		/* background-color: #0273F1; */
		width: 100%;
		display: flex;
		flex-direction: row;

	}
	.send{
		width: 120rpx;
		padding-right: 10rpx;

		/* background-color: #007AFF; */
		display: flex;
		align-items: center;
	}
/* .custom-style {
		color: #606266;
		width: 30rpx;
	} */
	/**
	消息主体样式
	 */
	.left-mian{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;
		padding: 30rpx;
	}
	.left-image{
		width: 100rpx;
	}
	.left-info{
		/*width: 450rpx;*/
		margin-left: 20rpx;
		padding-right: 100rpx;

	}
	.left-title{
		margin-bottom: 10rpx;
		color: #ffffff;
	}
	.left-message{
		background-color: #ffffff;
		padding: 15rpx;
		border-top-right-radius: 40rpx;
		border-bottom-left-radius: 40rpx;
		border-bottom-right-radius: 40rpx;
	}

	.right-mian{
		display: flex;
		flex-direction: row-reverse;
		justify-content: flex-start;
		align-items: flex-start;
		width: 100%;
		padding: 30rpx;

	}
	.right-image{
		width: 100rpx;
	}
	.right-info{
		margin-right: 20rpx;
		padding-left: 100rpx;
	}
	.right-title{
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		margin-bottom: 10rpx;
		color: #ffffff;
	}
	.right-message{
		width: 100%;
		background-color: #ffffff;
		padding: 15rpx;
		border-top-left-radius: 40rpx;
		border-bottom-left-radius: 40rpx;
		border-bottom-right-radius: 40rpx;
	}
</style>
