<template>
  <div id="home">
    <nav-bar>
      <div slot="center">首页</div>
    </nav-bar>

    <search></search>
    <swipe></swipe>
    <grid></grid>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">今日推荐</van-divider>
    <list :goods="ProductList"></list>
  </div>
</template>

<script>
import Search from "./childrencomponents/Search";
import Swipe from "./childrencomponents/Swipe";
import Grid from "./childrencomponents/Grid";
import List from "../../components/list/List";
import NavBar from "../../components/navbar/NavBar";

import { getGoods } from "../../network/home";
export default {
  name: "Home",
  components: {
    Search,
    Swipe,
    Grid,
    List,
    NavBar
  },
  data() {
    return {
      ProductList: []
    };
  },
  created() {
    getGoods().then(res => {
      // console.log(res);
      //2.保存数据
      this.ProductList = res;
    });
  },
  computed: {},
  methods: {}
};
</script>
<style scoped>
#home {
  height: 100vh;
  position: relative;
  padding-top: 44px;
}
.content {
  /* height: calc(100% - 93px); */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>