<!--  -->
<template>
  <div id="detail-swipe">
    <van-swipe :autoplay="3000" >
      <van-swipe-item v-for="(image, index) in swipeImg.sImg" :key="index" @click.stop="ImagePreviews(index)">
        <van-image :src="imgSrc + swipeImg.pcode+'/'+ image" lazy-load/>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Image, ImagePreview } from "vant";

import Vue from "vue";
import { Lazyload } from "vant";
Vue.use(Lazyload);
import localStorage from "../../.././localStorage/localStorage.js";
export default {
  props: {
    swipeImg: {}
  },
  data() {
    return {
      imgSrc: "http://127.0.0.1:3000/public/uploads/images/",
      goodsInfo: localStorage.fetch("choose_goods"),
      imgs: [] //存放图片预览的路径
    };
  },
  components: {
    Swipe,
    SwipeItem,
    ImagePreview
  },
  created() {
    // 图片预览的路径
    var str = this.imgSrc + this.goodsInfo.pcode + "/";
    this.imgs = this.goodsInfo.sImg;
    for (var i = 0; i < this.imgs.length; i++) {
      this.imgs[i] = str + this.imgs[i];
    }
  },
  computed: {},
  methods: {
    ImagePreviews(id) {
      ImagePreview({
        images: this.imgs,
        startPosition: id,
        onClose() {
          // do something
        }
      });
    }
  }
};
</script>
<style scoped>
</style>