<template>
	<view class="login">

		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<myp-icon name="../../static/logo/logo.png" iconStyle="width: 300rpx; height: 200rpx;"></myp-icon>

			</view>
			<!-- 主体表单 -->
			<view class="main">
				<wInput
					v-model="userName"
					type="text"
					maxlength="11"
					placeholder="闲聊号"

				></wInput>
				<wInput
					v-model="passData"
					type="password"
					maxlength="11"
					placeholder="密码"
				></wInput>
			</view>
			<wButton
				class="wbutton"
				text="登 录"
				bgColor="#FF9090"
				:rotate="isRotate"
				@click.native="startLogin()"
			></wButton>
			<u-toast ref="uToast" />
			<!-- 其他登录 -->
			<view class="other_login cuIcon">
				<view class="login_icon">
					<view class="cuIcon-weixin" @tap="login_weixin"></view>
				</view>
				<view class="login_icon">
					<view class="cuIcon-weibo" @tap="login_weibo"></view>
				</view>
				<view class="login_icon">
					<view class="cuIcon-github" @tap="login_github"></view>
				</view>
			</view>

			<!-- 底部信息 -->
<!--			<view class="footer">-->
<!--				<navigator url="forget" open-type="navigate">找回密码</navigator>-->
<!--				<text>|</text>-->
<!--				<navigator url="register" open-type="navigate">注册账号</navigator>-->
<!--			</view>-->
		</view>

	</view>
</template>

<script>
	import {Http} from "../../utils/http";

	var _this;
	import wInput from '@/components/watch-login/watch-input.vue' //input
	import wButton from '@/components/watch-login/watch-button.vue'
	import {Login} from "../../models/login";
	import {UserData} from "../../models/userData";
	export default {
		data() {
			return {
				//logo图片 base64
				userName:'', //用户/电话
				passData:'', //密码
				isRotate: false, //是否加载旋转
			};
		},
		components:{
			wInput,
			wButton,
		},
		created(){
			//this.isLogin();
		},
		mounted() {
			_this= this;

		},
		methods: {
			isLogin(key, data){
				//判断缓存中是否登录过，直接登录
				try {
					const value = uni.getStorageSync('user');
					if (value) {
						//有登录信息
						//全局保存数据信息
						uni.setStorage({
							key:'userState',
							data:{userState:true}
						})
						uni.switchTab({
							url:'../index/index'
						})

					}
				} catch (e) {
					// error
				}
			},
		    async startLogin() {
				//登录
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.userName.length == "") {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '用户名不能为空'
					});
					return;
				}
				if (this.passData.length < 5) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '密码不正确'
					});
					return;
				}
				_this.isRotate = true

				//登录
				this.login_chat();


			},
			async login_chat() {
				const res = await Login.login({
					username: this.userName,
					password: this.passData,
					//cid:plus.push.getClientInfo().clientid
				})
				if (res.status === 200) {
					//保存登录状态  和 用户信息
					const loginInfo = JSON.stringify(res.data);
					uni.setStorageSync("user",loginInfo)
					//获取用户列表
					const userData = new UserData();
					userData.getFriendsListInfo();
					//获取手机信息
					this.getSystemInfo();
					// 获取用户列表到缓存
					uni.setStorage({
						key:'userState',
						data:1
					})
					_this.isRotate = false
					uni.switchTab({
						url:'../index/index'
					})
				}else{
					this.$refs.uToast.show({
						title: '用户名或密码错误',
						type: 'error',
					})
					setTimeout(function () {
						_this.isRotate = false
					}, 3000)
				}
			},
			login_weixin() {
				//微信登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
			login_weibo() {
				//微博登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
			login_github() {
				//github登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
			getSystemInfo(){
				uni.getSystemInfo({
					success(res) {
						uni.setStorageSync("systemInfo",res)
					}
				})

			}
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
</style>
