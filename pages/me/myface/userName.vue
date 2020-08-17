<template>
    <view>
        <u-field
                v-model="nickName"
                label="闲聊名："
                placeholder="请填写闲聊名称"
                type="text"
        >
        </u-field>
        <u-toast ref="uToast" />
    </view>

</template>

<script>
    import {User} from "../../../models/user";

    export default {
        data(){
            return {
                nickName:String,
                userData:Object
            }
        },
        mounted(){
            this.userData =JSON.parse(uni.getStorageSync("user"))
            this.nickName = this.userData.nickname
        },
        async onNavigationBarButtonTap() {
            if (this.nickName.length <= 0 || this.nickName == null) {
                this.$refs.uToast.show({
                    title: '名称必填',
                    type: 'error',
                    icon: false
                })
            }
            if (this.nickName.length > 12) {
                this.$refs.uToast.show({
                    title: '名称过长',
                    type: 'error',
                    icon: false
                })
            }
            //更新数据信息
            const res = await User.modifyName({
                userId: this.userData.id,
                nickname: this.nickName
            })
            if (res.status === 200){
                uni.removeStorageSync("user")
                uni.setStorageSync("user",JSON.stringify(res.data))
                uni.setStorageSync("userInfoStatus",2)
                this.$refs.uToast.show({
                    title: '更新名称成功',
                    type: 'error',
                    icon:false
                })
            }
            console.log(res)

        }
    }
</script>

<style>
</style>
