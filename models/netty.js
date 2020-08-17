/***
 * 封装通信信息
 *
 */
import Config from "../common/config";

class Netty {
    socket
    init(result){
        if (this.socket == null){
            this.socket = new WebSocket(Config.baseNetty)
            this.socket.onopen = function (res) {
                return  result.success && result.success(res)
            }
            this.socket.onerror= function (res) {
               return  result.error && result.error(res)
            }
            this.socket.onmessage=function (res) {
                return  result.msg && result.msg(res)
            }
            this.socket.onclose = function(res){
                return  result.close  && result.close(res)
            }
        }

    }
}
export {
     Netty
}