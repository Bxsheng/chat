<template>
	<view >
		<view class="image" >
			<image class="imageInfo"  v-if="userData.faceImage" :src="userData.faceImage" mode="aspectFill"></image>
		</view>
		<u-toast ref="uToast" />
		<ActionImage  :show="actionCancel" @cancel="cancel" @select="select" ></ActionImage>

		<u-button v-if="saveButton" @click="btnClick" :custom-style="customStyle"  shape="circle"  ripple-bg-color="#909399"  >确认修改图片</u-button>

	</view>
</template>

<script>
	import ActionImage from "./actionImage.vue"
	import Config from "../../../common/config";

	export default {
		components:{ActionImage},
		data() {
			return {
				userData:Object,
			    actionCancel:false,
				saveButton:false,
				customStyle: {
						marginTop:'150rpx', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
						color: '#FF9090'
				},
				requestStatus:false



			}
		},
		mounted(){

		},
		created() {
			uni.$on('uAvatarCropper', path => {
				this.userData.faceImage = path;
				//打开提交按钮
				this.saveButton = true
				//this.updateImage(path);

			})
		},
		mounted(){

			this.userData =JSON.parse(uni.getStorageSync("user"))
		},
		methods: {
			btnClick(){
				this.updateImage(this.userData.faceImage);
			},
			updateImage(path){
				if (this.requestStatus == true){
					return
				}
				this.requestStatus =true
				 // 可以在此上传到服务端
				uni.uploadFile({
					url: Config.baseUrl+'user/upload/'+this.userData.id,
					filePath: path,
					name: 'file',
					success: (res) => {
						const data = JSON.parse(res.data)
						if (data.status ===200){
							//清空缓存 更新图片信息
							uni.removeStorageSync("user")
							uni.setStorageSync("user",JSON.stringify(data.data))
							//设置缓存已更新状态
							uni.setStorageSync("userInfoStatus",2)
							this.$refs.uToast.show({
								title: '更新头像成功',
								type: 'error',
								icon:false
							})
						}
						this.requestStatus = false
						this.saveButton = false
					}
				});
			},
			//设置缓存更新状态 设置为2 头像更新-1 首页更新 -1 为0 就是不需要更新
			setStorageUserInfoStatu(){
				uni.setStorageSync({
					key:"userInfoStatus",
					data:2
				})
			},

			//图片选择器
			chooseAvatar() {
				this.$u.route({
					url: 'uview-ui/components/u-avatar-cropper/u-avatar-cropper',
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: 300,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 200,
						// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
						fileType: 'png',
					}
				})
			 },
			cancel(){
				this.actionCancel = false;
			},
			select(event){
				if(event === 0){
					this.chooseAvatar();
					//关闭弹出层
					this.actionCancel = false;
				}else if(event ===1){
					const _this = this;
					uni.saveImageToPhotosAlbum({
						filePath: this.userData.faceImage,
						success: function () {
							_this.$refs.uToast.show({
								title: '图片保存成功',
								type: 'error',
								icon:false
							})
							_this.actionCancel = false;
						}
					});
				}
			}

		},
		onNavigationBarButtonTap(){
			this.actionCancel = true;
		},



	}
</script>

<style >
.image{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
.imageInfo{
	top: 50rpx;
	width: 600rpx;
	height: 600rpx;
}

</style>
