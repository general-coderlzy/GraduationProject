<template>
  <div id="app">
    <!-- <keep-alive exclude="Detail"> 
      <router-view/>
      </keep-alive> -->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive ">        
            <!-- 这里是会被缓存的视图组件，比如 Home！ -->
        </router-view>        
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive">
          <!-- 这里是不被缓存的视图组件，比如 detail -->
      </router-view>
      
    <!-- <tab-bar>
      <tab-bar-item path="/Home">        
          <img slot="item-icon" src="./assets/img/24 px/svg/mbri-home.svg" alt="">
          <img slot="item-icon-active" src="./assets/img/24 px/svg/mbri-features.svg" alt="">
          <div slot="item-text">首页</div>
      </tab-bar-item>    
      <tab-bar-item path="/Category">        
          <img slot="item-icon" src="./assets/img/24 px/svg/mbri-home.svg" alt="">
          <img slot="item-icon-active" src="./assets/img/24 px/svg/mbri-features.svg" alt="">
          <div slot="item-text">分类</div>
      </tab-bar-item> 
            <tab-bar-item path="/Cart">        
          <img slot="item-icon" src="./assets/img/24 px/svg/mbri-home.svg" alt="">
          <img slot="item-icon-active" src="./assets/img/24 px/svg/mbri-features.svg" alt="">
          <div slot="item-text">购物车</div>
      </tab-bar-item> 
            <tab-bar-item path="/Profile">        
          <img slot="item-icon" src="./assets/img/24 px/svg/mbri-home.svg" alt="">
          <img slot="item-icon-active" src="./assets/img/24 px/svg/mbri-features.svg" alt="">
          <div slot="item-text">我的</div>
      </tab-bar-item>   
    </tab-bar> -->
      <van-tabbar v-model="active" route>
        <van-tabbar-item icon="home-o"  to="/Home">首页</van-tabbar-item>
        <van-tabbar-item icon="apps-o" to="/Category">分类</van-tabbar-item>
        <van-tabbar-item icon="cart-o"  to="/Cart">购物车</van-tabbar-item>
        <van-tabbar-item icon="user-o"  to="/Profile">我的</van-tabbar-item>
     </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
import TabBar from "./components/tabbar/TabBar";
import TabBarItem from "./components/tabbar/TabBarItem";
export default {
  name: "App",
  data() {
    return {
      active: 0
    };
  },
  components: {
    TabBar,
    TabBarItem
  }
};
</script>

<style>
@import "./assets/css/base.css";
</style>
