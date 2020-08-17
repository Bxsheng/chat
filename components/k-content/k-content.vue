<template>
	<view>
		<view>A</view>
		<view class="content" >
			<view class="content-image">
				<myp-icon name="https://cdn.img.wenhairu.com/images/2020/05/23/YTnhG.jpg" iconStyle="width: 45px; height: 45px;border-radius:5px;"></myp-icon>
			</view>
			<view class="content-text-view">
				<text class="content-text">阿峰</text>
			</view>
		</view>
		<view class="content">
			
			<view class="content-image">
				<myp-icon name="https://cdn.img.wenhairu.com/images/2020/05/23/YTnhG.jpg" iconStyle="width: 45px; height: 45px;border-radius:5px;"></myp-icon>
			</view>
			<view class="content-text-view">
				<text class="content-text">阿峰</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.content{
		flex-direction: row;
		align-items: center;
		background-color: #FFFFFF;
		height: 45px;
		
	}
	.content:active{
		border-radius: 10px;
		background-color: #FF9090;
	}
	.content-image{
		margin-right: 15px;
		width: 45px;
		flex-grow: 0;
	}
	.content-text{
		font-size: 20px;
		
	}
	.content-text-view{
		width: 705px;
		height: 45px;
		border-bottom-width: 1px;
		border-bottom-color: #E5E5E5;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
	}
</style>
