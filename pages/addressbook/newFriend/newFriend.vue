<template>
	<view>
			<u-navbar  back-icon-color="#ffffff" title="新的朋友" title-color="#ffffff" :background="background">
				<view class="navbar-right" slot="right" @click="onNavbarRight">
						<u-icon name="more-dot-fill" size="38" color="#ffffff"></u-icon>
				</view>
			</u-navbar>
			<ActionFriend  :show="actionCancel" @cancel="cancel" @select="select" ></ActionFriend>
			<!-- 具体好友信息 -->
			<view class="f-main" v-if="friendRequestData" v-for="iteam in friendRequestData">
				<view class="friend-main">
					<!-- 头像 -->
					<view class="friend-image">
                        <u-avatar :src=iteam.sendUserFaceImage  size="100" mode="square"></u-avatar>
					</view>
					<view class="friend-info">
							<!-- 名字 信息 -->
						<view class="friend-user">
							<text class="friend-user-title">{{iteam.sendUserNick}}</text>
							<text class="friend-user-name">闲聊号：{{iteam.sendUserNick}}</text>
						</view>
						<!-- 通过 忽略 -->
						<view class="friend-onSelect">
							<u-button size="mini" @click="onSelectLgnore(iteam.sendUserId)">忽略</u-button>
							<u-button size="mini" type="error" @click="onSelectAccep(iteam.sendUserId)">同意</u-button>
						</view>
					</view>
				</view>
			</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import ActionFriend from "../actionFriend";
	import {User} from "../../../models/user";
	export default {
		components:{ActionFriend},
		data() {
			return {
				actionCancel:false,
				background: {
						backgroundColor: '#FF9090',
						// 导航栏背景图
						// background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
						// 还可以设置背景图size属性
						// backgroundSize: 'cover',

						// 渐变色
						// backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
					},
				friendRequestData:[],
				userData:Object,
			}
		},
		mounted(){
			this.userData = JSON.parse(uni.getStorageSync("user"));
			//获取还有列表数据信息
			this.getListFriendRe();
		},
		methods: {
			/**
			 * 忽略申请
			 * @param res
			 */ async onSelectLgnore(friendId) {
				const res = await User.IgnoreAndAcceptFriend(this.userData.id, friendId, 0)
				if (res.status === 200) {
					this.$refs.uToast.show({
						title: res.data,
						type: 'error',
						icon: false
					})
				} else {
					this.$refs.uToast.show({
						title: '服务器异常',
						type: 'primary',
						icon: false
					})
				}
				this.getListFriendRe();
			},
			/**
			 * 接受申请
			 * @param res
			 */ async onSelectAccep(friendId) {
				const res = await User.IgnoreAndAcceptFriend(this.userData.id, friendId, 1)
				if (res.status === 200){
					this.$refs.uToast.show({
						title: res.data,
						type: 'error',
						icon: false
					})
				}else{
					this.$refs.uToast.show({
						title: '服务器异常',
						type: 'primary',
						icon: false
					})
				}
				//通知列表页 更新数据
				uni.setStorageSync("userlistStatus",1)
				uni.removeStorageSync("userFriendList")
				this.getListFriendRe();
			},
			onNavbarRight(){
				this.actionCancel = true;
			}
			,
			cancel(){
				this.actionCancel = false;
			},
			select(event){
				if(event === 0){
					this.chooseAvatar();
					//关闭弹出层
					this.actionCancel = false;
				}else if(event ===1){

				}
			},
			//获取请求列表信息
			async getListFriendRe() {
				const user = JSON.parse(uni.getStorageSync("user"));
				const res = await User.listFriendRe(user.id)
				if(res.status === 200){
					this.friendRequestData = res.data;
				}else if(res.status === 500){
					this.friendRequestData = res.data;
				}
			}

		}
	}
</script>

<style>
	page{
		background-color: #E5E5E5;

	}
	.navbar-right{
		margin-right: 20rpx;
	}
	.f-main{
		padding: 10rpx;
	}
	.friend-main{
		display: flex;
		flex-direction: row;
		background-color: rgb(255, 255, 255);
		width: 100%;
		height: 120rpx;
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
