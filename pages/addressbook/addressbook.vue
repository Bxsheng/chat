<template>
	<view>
		<view>
			<view class="content-head" @click="onNewFriend">
					<view class="content-main">
						<view class="content-head-image">
							<u-avatar src="../../static/friend.png"  size="mini" mode="square"></u-avatar>
						</view>
						<view class="content-head-title">
							<text>新的闲友</text>
						</view>
					</view>
					<view class="content-head-show" >
						<u-badge type="error"  :offset='offset'  :count="friendCount"/>
					</view>
			</view>
		</view>

		<u-index-list :scrollTop="scrollTop" :index-list="indexList">
			<view v-for="(item, index) in list" :key="index">
				<u-index-anchor :index="item.letter" />
				<view v-for="(item1, index) in item.data" :key="index">
<!--					{{item1.friendNickname}}-->
					<view class="friend-main" @click="onSelectFriend(item1)" >
						<!-- 头像 -->
						<view class="friend-image">
							<u-avatar :src=item1.friendFaceImage  size="80" mode="square"></u-avatar>
						</view>
						<view class="friend-info">
								<text class="friend-user-title">{{item1.friendNickname}}</text>
						</view>
					</view>
				</view>
			</view>
		</u-index-list>
		<ActionFriend  :show="actionCancel" @cancel="cancel" @select="select" ></ActionFriend>
	</view>

</template>

<script>
	import indexList from "@/common/index.list.js";
	import ActionFriend from "./actionFriend"
    import {User} from "../../models/user";
	import {Nickname} from "../../common/nickname";
	import {UserData} from "../../models/userData";

	const letterArr = indexList.list.map(val => {
		return val.letter;
	})
	export default {
		components:{ActionFriend},
		data() {
			return {
				actionCancel:false,
				scrollTop: 0,
				indexList: letterArr,
				list: Object,
				offset:[45,15],
                userData:Object,
				friendCount:0,
				listData:Array
			}
		},

		onUnload(){
			console.log("销毁");
		},
		 created() {
			const _this = this
			 uni.$on("getFriendsListInfo",()=>{
				 this.getFeirndInfoNew()
			})
		},
		async mounted() {
			this.userData = JSON.parse(uni.getStorageSync("user"));
			//查询是有好友申请信息
			this.getFrinedRequestInfo();
			//获取好友列表数据
			await this.getFriendsListInfo();
		},
		async onShow(){
			//更新数据
			if (uni.getStorageSync("userlistStatus") !=0){
				const userData = new UserData();
			 	await  userData.getFriendsListInfo();
				console.log("重新获取数据信息")
				uni.setStorageSync("userlistStatus",0)
				//重新更新列表
				await this.getFriendsListInfo()
			}
			// if(uni.getStorageSync("loginOut") ==1){
			// 	await this.getFriendsListInfo()
			// 	 uni.removeStorage("loginOut")
			// 	console.log("退出登录后重新回去数据")
			// }
		  //查询是否有好友申请信息
            this.getFrinedRequestInfo();
        },
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onNavigationBarButtonTap(){
			this.actionCancel = true;
			// console.log(2555)

		},
		methods:{

			async getFeirndInfoNew() {
				const userData = new UserData();
				await userData.getFriendsListInfo();
				console.log("重新获取数据信息")
				//重新更新列表
				await this.getFriendsListInfo()

			},

			// 点击朋友获取信息
			onSelectFriend(value){
				//转跳聊天页面
				console.log(value)
				uni.navigateTo({
					url:'../chat/chat?data='+JSON.stringify(value)
				})

			},
			/**
			 * 点击新的闲友
			 */
			onNewFriend(){

				if (this.friendCount === 0){
					return;
				}
				uni.navigateTo({
					url:'newFriend/newFriend'
				})
			},
			cancel(){
				this.actionCancel = false;
			},
			select(event){
				if(event === 0){
					//this.chooseAvatar();
					uni.navigateTo({
						url:"addFriend/addFriend"
					})
					//关闭弹出层
					this.actionCancel = false;
				}else if(event ===1){
					const _this =this
					uni.scanCode({
						success: function (res) {
							if (res.scanType === "QR_CODE"){
								uni.navigateTo({
									url:"addFriend/addFriend?qr_result="+res.result,
									success(res) {
										_this.actionCancel = false;
									}
								})
							}
						}
					});
				}
			},
            async getFrinedRequestInfo() {
                const res = await User.friendReauestCount(this.userData.id);
                if (res.status === 200){
                	this.friendCount = res.data
				}
            },
			getFriendsListInfo(){
				const userList = JSON.parse(uni.getStorageSync("userFriendList"))
				console.log(userList)
				this.list = userList;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list-cell {
		display: flex;
		box-sizing: border-box;
		width: 100%;
		padding: 10px 24rpx;
		overflow: hidden;
		color: $u-content-color;
		font-size: 14px;
		line-height: 24px;
		background-color: #fff;
	}
	.content-head{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.content-main{
		display: flex;
		flex-direction: row;
		width: 100%;
		padding: 10px 24rpx;
		align-items: center;
	}

	.content-head-title{
		height: 100%;
		margin-left: 10px;
		font-size: 18px;
	}
	.content-head-show{
		padding: 10px 24rpx;

	}
	.friend-main{
		display: flex;
		flex-direction: row;
		background-color: rgb(255, 255, 255);
		width: 100%;
		height: 100rpx;
		justify-content: center;
		border-radius: 10px;
		/*margin-top: 10rpx;*/

	}
	.friend-image{
		margin-left: 10rpx;
		margin-right: 20rpx;
		width: 130rpx;
		height: 110rpx;
		/*background-color: #01A9F0;*/
		align-self: center;
		display: flex;
		align-items: center;
		justify-content: center;

	}
	.friend-info{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		border-bottom: #d0d0d0 1px solid;

	}
	.friend-user{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 10rpx 0 10rpx 0;
	}
	.friend-user-title{
		font-size: 20px;

	}
	.friend-user-name{
		color: #d5dee9;
		font-size: 13px;
		font-family: 隶书;
	}
	.friend-onSelect{
		width: 200rpx;
		/*background-color: #c7001a;*/
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
</style>
