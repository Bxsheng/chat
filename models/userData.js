/**
 *@Author ：Bxsheng
 *@Data：2020-08-07
 */
import {Nickname} from "../common/nickname";
import {User} from "./user";

    //保存用户登录时候需要获取的数据信息
class UserData {

    /**
     * 获取用户所有的好友数据信息
     */

    /**
     * 获取缓存中的用户数据信息
     */
    getUserData(){
        const data = JSON.parse(uni.getStorageSync("user"));
        return data;
    }


    /**
     * 获取好友列表信息数据
     */ async getFriendsListInfo() {
        const res = await this._getFriendsList();
        //获取数据数组
        let DataList  = this._getArrayListData();
        res.forEach(function(val, index, arr){
            //中文获取拼音
            let pingying = Nickname.convertPinyin(val.friendNickname);
            //获取拼音首字母
            let fristChar = pingying.substr(0,1).toUpperCase();
            //获取字母在二维数组的位置
            let order = DataList.findIndex((value)=>value.letter == fristChar)
            //没有获取到数据就放在#
            if (order === -1) order = DataList.length -1;
            console.log(fristChar)
            //添加数据到列表数据中
            DataList[order].data.push(val);
        });
        //清除空数组 渲染数据
       const result =   DataList.filter((value)=>{
            if (value.data.length != 0){
                return true;
            }
            else return false ;
        });
       //保存数据到缓存中
        uni.setStorageSync("userFriendList",JSON.stringify(result))

    }
    // 获取所有好与列表数据信息
    async _getFriendsList(){
        const res = await User.getFriendsList(this.getUserData().id);
        if (res.status == 200){
            //this.listData.compact(res.data)
            // console.log(res.data)
            return res.data;
        }else if(res.status === 500){
            return [];
        }
    }
    //根据字母创建数组
    _getArrayListData(){
        const englishg = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,W,X,Y,Z,#";
        let englistArray = englishg.split(',')
        let result = englistArray.map((x)=>{
            return  {
                letter:x,
                data:[]
            };
        })
        return result;
    }
    //获取字母在二维数组中的数组信息
    _getChAtListDataPosition(ch){
        const englishg = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,W,X,Y,Z,#";
        let englistArray = englishg.split(',')

    }
}
export {
    UserData
}
