<template>
	<view >
		<u-navbar  title="" back-text="返回" :border-bottom="borderBottom" :background="background" >
			<view class="slot-wrap">
				<view class="search-wrap">
					<!-- 如果使用u-search组件，必须要给v-model绑定一个变量 -->
					<u-search v-model="keyword" placeholder="请输入闲聊号"  @custom="custom"  :clearabled="true" height="56"  :action-style="{color: '#fff'}"></u-search>
				</view>
			</view>
		</u-navbar>
		<view class="content" v-if="friend">
			<view class="friend-main">
				<!-- 头像 -->
				<view class="friend-image">
					<u-avatar :src=friendData.faceImage  size="100" mode="square"></u-avatar>
				</view>
				<view class="friend-info">
					<!-- 名字 信息 -->
					<view class="friend-user">
						<text class="friend-user-title">{{friendData.nickname}}</text>
						<text class="friend-user-name">闲聊号：{{friendData.username}}</text>
					</view>
				</view>
			</view>
			<u-button shape="square" :plain="true" type="error" @click="addFriend" >添加好友</u-button>

		</view>
		<u-toast ref="uToast" />
		<view class="loading">
				<u-loading mode="circle"  size="60" color="red" :show="loading"></u-loading>
		</view>
	</view>
</template>

<script>
	import {User} from "../../../models/user";

	export default {
		data() {
			return {
				keyword:"",
				borderBottom:false,
				friendData:Object,
				loading:false,
				background: {
					backgroundColor: '#FF9090',
					// 导航栏背景图
					// background: 'url(https://cdn.uviewui.com/uview/swiper/1.jpg) no-repeat',
					// 还可以设置背景图size属性
					// backgroundSize: 'cover',

					// 渐变色
					// backgroundImage: 'linear-gradient(45deg, rgb(28, 187, 180), rgb(141, 198, 63))'
				},
				friend:false
			}
		},
		onLoad(value) {
			const userName =value.qr_result
			if (userName != null && userName.length >=1){
				//获取根据二维码里面的信息查找朋友
				this.getFriendInfo(userName)
			}

		},
		methods: {
			 async custom(value) {
			 	if (this.loading == true) return
				 if (value.length <= 0 || value == null) {
					 this.$refs.uToast.show({
						 title: '名称不能为空',
						 type: 'primary',
						 icon: false
					 })
					 return;
				 }
				 let pattern = new RegExp("[\u4E00-\u9FA5]+");
				 if (pattern.test(value)) {
					 this.$refs.uToast.show({
						 title: '名称不能中文',
						 type: 'primary',
						 icon: false
					 })
					 return
				 }
				  this.getFriendInfo(value)
			 },
			async getFriendInfo(value) {
			 	this.loading = true
				this.friend = false
				const user = JSON.parse(uni.getStorageSync("user"));
				const res = await User.searchFriend(user.id, value)
				if (res.status === 500) {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'primary',
						icon: false
					})
				} else if (res.status === 200) {
					this.friend = true;
					this.friendData = res.data;
				} else {
					this.$refs.uToast.show({
						title: '服务器错误',
						type: 'primary',
						icon: false
					})
				}
				//关闭加载动画
				this.loading = false
			},
			async addFriend() {
				const user = JSON.parse(uni.getStorageSync("user"));
				const  res =await User.addFriend(user.id, this.friendData.username)
				console.log(res)
				if (res.status === 200  ){
					this.$refs.uToast.show({
						title: res.data,
						type: 'error',
						icon: false
					})
				}else if(res.status === 500) {
					this.$refs.uToast.show({
						title: res.msg,
						type: 'primary',
						icon: false
					})
					this.friend = false
				}else{
					this.$refs.uToast.show({
						title: '服务器错误',
						type: 'primary',
						icon: false
					})
				}
			 }
		}


	}
</script>

<style>
	.slot-wrap {
		display: flex;
		align-items: center;
		width: 100%;
	}
	.search-wrap {
		margin: 0 20rpx;
		flex: 1;
	}
	.content{
		padding: 20rpx 10rpx 0 10rpx;
	}
	.friend-main{
		display: flex;
		flex-direction: row;
		background-color: #FF9090;
		width: 100%;
		height: 120rpx;
		justify-content: center;
		border-radius: 10px;
		margin-bottom: 20rpx;
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
	.loading{
		margin-top: 200rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;

	}
</style>
