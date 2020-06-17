<!--  -->
<template>
  <div id="swipe">
          <van-swipe :autoplay="3000" >
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <van-image :src="image" lazy-load/>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Image } from "vant";

import Vue from "vue";
import { Lazyload } from "vant";
Vue.use(Lazyload);
export default {
  data() {
    return {
      images: [
        "https://img.zcool.cn/community/01a78857fafa30a84a0d304fe56d39.jpg@1280w_1l_2o_100sh.jpg",
        "https://img.zcool.cn/community/013e6b57fafa30a84a0e282b9526dc.jpg@1280w_1l_2o_100sh.jpg",
        "https://img.zcool.cn/community/01ed4557fafa35a84a0e282b49ef0a.jpg@1280w_1l_2o_100sh.jpg"
      ]
    };
  },

  components: {},

  computed: {},

  methods: {}
};
</script>
<style scoped>
</style>