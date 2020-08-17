<template>
	<myp-popup :show="show" pos="bottom" width="600rpx" height="200rpx" bottomOffset="x" @overlayClicked="toCancel">
		<view class="ac">
			<myp-button text="退出登录" bgType="error" textType="text" border="none" radius="ll" boxStyle="width:600rpx;height:50px;" @buttonClicked="toSelect(0)"></myp-button>
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
			}
		},
		methods: {
			toCancel() {
				//this.$emit("cancel")
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
		height: 272px;
	}
</style>
