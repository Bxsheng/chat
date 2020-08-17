<template>
	<myp-popup :show="show" pos="bottom" width="600rpx" height="350rpx" bottomOffset="x" @overlayClicked="toCancel" :overlay="overlay" >
		<view class="ac">
			<myp-button text="添加好友" bgType="error" textType="text" border="none" radius="ll" boxStyle="width:600rpx;height:50px;" @buttonClicked="toSelect(0)"></myp-button>
			<view style="height: 8px;"></view>
			<myp-button text="扫一扫" bgType="error" textType="text" border="none" radius="ll" boxStyle="width:600rpx;height:50px;" @buttonClicked="toSelect(1)"></myp-button>
			<view style="height: 8px;"></view>
			<myp-button text="取消" bgType="inverse" textType="text" border="none" radius="ll" boxStyle="width:600rpx;height:50px;" @buttonClicked="Cancel"></myp-button>
			<view style="height: 8px;"></view>
		</view>
	</myp-popup>

</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			overlay: {
				type: Object,
				default: () => ({
					hasAnimation: true,
					timingFunction: ['ease-in', 'ease-out'],
					duration: 300,
					bg: '',
					bgType: 'mask'
				})
			}
		},
		methods: {
			toCancel() {
				//this.$emit("cancel")
				return
			},
			Cancel() {
				this.$emit("cancel")
			},
			toSelect(i) {
				this.$emit("select", i)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/mypUI/mypui.scss';

	.ac {
		width: 600rpx;
		height: 500rpx;
		z-index: 99999999;

	}
</style>
