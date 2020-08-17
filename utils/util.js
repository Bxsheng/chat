/**
 * @作者 Bxsheng
 * @博客地址 www.kdream.cn
 * @创建时间 2020-01-25
 */
/**
 * 把异步请求封装成 promisic 返回格式
 * @param func
 * @returns {function(*=): Promise<any>}
 */
const promisic = function (func) {
    return function (params = {}) {
        return new Promise((resolve, reject) => {
            const args = Object.assign(params, {
                success: (res) => {
                    resolve(res);
                },
                fail: (error) => {
                    reject(error);
                }
            });
            func(args);
        });
    };
};
//排序组合
const combination = function (arr, size) {
    var r = [];
    function _(t, a, n) {
        if (n === 0) {
            r[r.length] = t;
            return;
        }
        for (var i = 0, l = a.length - n; i <= l; i++) {
            var b = t.slice();
            b.push(a[i]);
            _(b, a.slice(i + 1), n - 1);
        }
    }
    _([], arr, size);
    return r;
}
export {
    promisic, //代理模式
    combination
}