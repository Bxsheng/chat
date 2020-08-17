<template>
	<view class="message" @click="onMessage" @touchstart="onTouchstart" @touchend="onTouchend">
		<view class="message-image">
				<myp-icon :name=image iconStyle="width: 85rpx; height: 85rpx;border-radius:10rpx;"></myp-icon>
		</view>
	
		<view class="message-info">
			<view class="message-info-main">
				<text class="main-name">{{title}}</text>
				<text class="main-message">{{message}}</text>
			</view>
			<view>
				<text class="main-time"> </text>
				<view v-if="notice">
					<myp-icon name="eye" type="error"  ></myp-icon>
				</view>
				
			</view>
		</view>
	</view>
		
</template>

<script>
	export default {
		props:{
			title: {
				type: String,
				default: ""
			},
			message: {
				type: String,
				default: ""
			},
			notice: {
				type: Boolean,
				default: false
			},
			image:{
				type: String,
				default: ""
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			onMessage(){
				this.$emit('onSelect')
			},
			onTouchstart(){
				this.$emit('onTouchstart')
			},
			onTouchend(){
				this.$emit('onTouchend')
			}
		}
	}
</script>

<style lang="scss">
	.message{
		flex-direction: row;
		height: 100rpx;
		width: 750rpx;
		
	}
	.message:active{
		background-color: #E5E5E5;
	}
	.message-image{
		width: 100rpx;
		height: 100rpx;
		justify-content: center;
		
	}
	.message-info{
		margin-left: 2rpx;
		width: 650rpx;
		flex-direction: row;
		justify-content: space-between;
		padding: 10rpx 15rpx 10rpx 3rpx;
	}
	.message-info-main{
		flex-direction: column;
		justify-content: space-between;
	}
	
	/* 用户名 消息 时间 */
	.main-name{
		font-weight: bold;
		font-style: italic;
		font-size: 30rpx;
	}
	.main-message{
		color: #6E6E6E;
		font-style: italic;
		font-size: 20rpx;
		padding-bottom: 10rpx;
	}
	.main-time{
		color: #6E6E6E;
		font-style: italic;
		font-size: 20rpx;
	}
</style>
