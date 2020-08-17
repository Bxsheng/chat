import {pinyin} from "./const";

class Nickname {

	// 26个字母外加 # 号
	static enWords = [
		'A', 'B', 'C', 'D', 'E', 'F', 'G',
		'H', 'I', 'J', 'K', 'L', 'M', 'N',
		'O', 'P', 'Q', 'R', 'S', 'T',
		'W', 'X', 'Y', 'Z','#'
	]
	static Englishg = "ABCDEFGHIJKLMNOPQRSTWXYZ#";
    // 汉字转拼音
	static convertPinyin(l1){
		var l2 = l1.length;
		var I1 = "";
		var reg = new RegExp('[a-zA-Z0-9\- ]');
			for(var i = 0; i < l2; i++) {
				var val = l1.substr(i, 1);
				var name = this.arraySearch(val, pinyin);
					if(reg.test(val)) {
						I1 += val;
					} else if(name !== false) {
						I1 += name;
					}

			}
		I1 = I1.replace(/ /g, '-');
		while(I1.indexOf('--') > 0) {
			I1 = I1.replace('--', '-');
		}
		return I1;
	}

	// 在对象中搜索
	static arraySearch(l1, l2) {
		for(var name in pinyin) {
			if(pinyin[name].indexOf(l1) != -1) {
				return this.ucfirst(name);
				break;
			}
		}
		return false;
	}

// 首字母大写
	static ucfirst(l1) {
	if(l1.length > 0) {
		var first = l1.substr(0, 1).toLowerCase();
		var spare = l1.substr(1, l1.length);
		return first + spare;
	}
}

// 判断是否数字
	static isNumber(val){
		var regPos = /^\d+(\.\d+)?$/; //非负浮点数
		var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
		if(regPos.test(val) || regNeg.test(val)){
			return true;
		}else{
			return false;
		}
	}

	}

export {
	Nickname
}
