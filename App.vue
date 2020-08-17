<script>
import {UniWebSocket} from "./models/uniwebsocket";
import {UserData} from "./models/userData";
import {ChatMsgLog} from "./models/chatMsgLog";
import {ChatMsg} from "./models/chatMsg";
import {DataContent} from "./models/datacontent";
import {DataContentAction} from "./models/dataContentAction";

export default {
	onLaunch: function() {
		console.log('App Launch');
		// uni.removeStorage({
        //     key:"chatonMessageList"
        // })
        // //#ifdef APP-PLUS
        // plus.removeStorage("chatonMessageList");
        // //#endif


	},
    created() {


		   //设置重连回调
		   // uni.$on("setUniWebSocket",(event)=>{
		   //     this.setUniWebSocket();
		    // })

       
    },
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
    methods:{


    }
};
</script>

<style>
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */

	.block-color{
		background-color: #FF9090;
	}

</style>
<style lang="scss">
	@import 'uview-ui/index.scss';
	@import '@/mypUI/base.scss';

</style>
