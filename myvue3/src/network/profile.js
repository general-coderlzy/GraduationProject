// 处理home页面所有的请求
import { request } from "./request";
export function check_user(name, password) {
    return request({
        url: "/api/checkUserLogin",
        params: {
            name,
            password
        }
    }).then(res => {
        return res
    }).catch(err => {
        console.log(err);
    })
}