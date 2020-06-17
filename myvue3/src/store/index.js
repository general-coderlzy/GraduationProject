import Vue from 'vue'
import Vuex from 'vuex'
//1、安装插件
Vue.use(Vuex)

import cartList from './modules/cartList'
import collectionList from './modules/collectionList'
import Profile from './modules/Profile'
//2、创建store对象
const store = new Vuex.Store({
    modules: {
        cartList,
        collectionList,
        Profile
    }
})
//3、挂载到Vue实例上
export default store
