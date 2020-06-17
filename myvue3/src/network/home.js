// 处理home页面所有的请求
import { request } from "./request";

export function getGoods() {
    return request({
        // 接口
        url: "/api/getGoods"
    })
}
export function getSwipeImg() {
    return request({
        // 接口
        url: "/api/getSwipeImg"
    })
}
export function getSku() {
    return request({
        // 接口
        url: "/api/getSku"
    })
}
export function getDetailImg() {
    return request({
        // 接口
        url: "/api/getDetailImg"
    })
}