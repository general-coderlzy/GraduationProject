<!--  -->
<template>
  <div id="detail">
     <!--导航条-->
    <transition name="fade">
            <div class="nav" v-show="show" >
                <van-nav-bar left-arrow @click-left="$router.go(-1)">
                    <!--<van-icon name="search" slot="title" />-->
                    <van-tabbar style="height:46px" v-model="active" slot="title" :fixed="false" @change="jump(active)">
                        <van-tabbar-item>宝贝</van-tabbar-item>
                        <van-tabbar-item>评价</van-tabbar-item>
                        <van-tabbar-item>详情</van-tabbar-item>
                        <van-tabbar-item>推荐</van-tabbar-item>
                    </van-tabbar>
                    <van-icon name="cart-o" slot="right" @click="$router.push('/Cart')"></van-icon>
                </van-nav-bar>
            </div>
    </transition>
    <transition name="fade">
            <div class="nav" v-show="!show">
                <van-row>
                    <van-col span="11" offset="1" style="height: 46px;line-height: 46px;padding-top: 5px">
                        <span style="height: 30px;
                        width: 30px;line-height: 37px;border-radius: 50%;color: white;
                        display: inline-block;font-size: 20px;background-color: rgba(0,0,0,0.5);
                        text-align: center" @click.stop="$router.go(-1)">
                            <van-icon name="arrow-left"></van-icon>
                        </span>
                    </van-col>
                    <van-col span="11" style="height: 46px;line-height: 46px;text-align: right;padding-top: 5px">
                        <span style="height: 30px;width: 30px;line-height: 37px;border-radius: 50%;color: white;display: inline-block;font-size: 20px;background-color: rgba(0,0,0,0.5);text-align: center">
                            <van-icon name="cart" @click="$router.push('/Cart')"></van-icon>
                        </span>
                    </van-col>
                </van-row>
            </div>
    </transition>

          <!-- 轮播图 -->
          <detail-swipe :swipeImg = "goodsInfo"/>
          <!-- 商品信息 -->
          <detail-goods-info class="goods_detail" :goodsInfo = "goodsInfo"/>
          <!-- 商品评价 -->
          <detail-goods-comment class="goods_detail"  />
          <!-- 商品详情图片 -->
          <detail-goods-images class="goods_detail" :detailImg = "goodsInfo"/>
          <!-- 商品推荐 -->
          <detail-goods-recommend class="goods_detail" :cgoods="goodsInfo"/>
          <!-- 商品导航栏 -->
          <detail-goods-action :goodsInfo = "goodsInfo"/>
          
  </div>
</template>

<script>
import DetailSwipe from "./childcomps/DetailSwipe";
import DetailGoodsInfo from "./childcomps/DetailGoodsInfo";
import DetailGoodsAction from "./childcomps/DetailGoodsAction";
import DetailGoodsImages from "./childcomps/DetailGoodsImages";
import DetailGoodsComment from "./childcomps/DetailGoodsComment";
import DetailGoodsRecommend from "./childcomps/DetailGoodsRecommend";

import { Tag, Col, Icon, Cell, CellGroup, Toast } from "vant";
import localStorage from "../.././localStorage/localStorage.js";
export default {
  data() {
    return {
      show: false,
      active: 0,
      // goodsInfo: localStorage.fetch("choose_goods")
      goodsInfo: {}
    };
  },

  components: {
    Tag,
    Col,
    Icon,
    Cell,
    CellGroup,
    Toast,
    DetailSwipe,
    DetailGoodsInfo,
    DetailGoodsAction,
    DetailGoodsComment,
    DetailGoodsImages,
    DetailGoodsRecommend
  },
  computed: {},
  created() {
    // this.goodsInfo = localStorage.fetch("choose_goods");
    // console.log(this.$route.query.id);

    // this.pid = this.$route.params.id;
    // this.$forceUpdate();
    this.initdata();

    document.scrollingElement.scrollTop = 0;
  },
  watch: {
    $route() {
      this.initdata();
    }
  },
  mounted() {
    window.addEventListener("scroll", this.scroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scroll);
  },

  methods: {
    initdata() {
      this.goodsInfo = localStorage.fetch("choose_goods");
      // console.log("detail的");
      // console.log(this.goodsInfo);
    },
    //窗口滚动事件
    scroll() {
      let top = document.scrollingElement.scrollTop; //触发滚动条，记录数值
      // console.log("鼠标移动的距离" + top);
      if (top >= 46) {
        this.show = true;
      } else {
        this.show = false;
      }
      let goods_detail = document.querySelectorAll(".goods_detail");
      // let detail_one = goods_detail[0].offsetTop - 47; //
      let detail_two = goods_detail[1].offsetTop - 46; //
      let detail_three = goods_detail[2].offsetTop - 46; //
      let detail_four = goods_detail[3].offsetTop - 46; //
      if (top >= 46 && top < detail_two - 10) {
        this.show = true;
        this.active = 0;
      } else if (top >= detail_two && top < detail_three - 10) {
        this.show = true;
        this.active = 1;
      } else if (top >= detail_three && top < detail_four - 10) {
        this.show = true;
        this.active = 2;
      } else if (top >= detail_four - 10) {
        this.show = true;
        this.active = 3;
      } else if (top < 46) {
        //相反...
        this.show = false;
      }
    },
    jump(active) {
      // active 为当前点击的tabbar的索引
      let goods_detail = document.querySelectorAll(".goods_detail");
      let goods_top = goods_detail[active].offsetTop - 46; //获取点击的tabbar对应的元素到顶部的距离
      // console.log("目标元素到顶部的距离" + goods_top);
      let distance =
        document.documentElement.scrollTop || document.body.scrollTop; //滚动条已经滚动的距离
      // console.log('滚动条已经滚动的距离'+distance)
      // 平滑滚动，时长500ms，每10ms一跳，共50跳
      let step = 10;
      //当滚动条已经滚动的高度小于目标元素的到顶部的距离
      if (goods_top > distance) {
        smoothDown();
      } else if (goods_top == distance) {
        document.documentElement.scrollTop = distance;
        // Chrome
        document.body.scrollTop = distance;
      } else {
        smoothUp();
      }
      //递归调用
      function smoothDown() {
        if (goods_top > distance) {
          distance += step;
          // Firefox
          document.documentElement.scrollTop = distance;
          // Chrome
          document.body.scrollTop = distance;
          setTimeout(smoothDown, 1);
        } else {
          return false;
        }
      }
      function smoothUp() {
        if (goods_top < distance) {
          distance -= step;
          // Firefox
          document.documentElement.scrollTop = distance;
          // Chrome
          document.body.scrollTop = distance;
          setTimeout(smoothUp, 2);
        } else {
          return false;
        }
      }
    },
    sorry() {
      Toast("暂无后续逻辑~");
    },
    onClickCart() {
      this.$router.push("cart");
    }
  }
};
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 99;
  background-color: #fff;
}
.nav {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 99;
}
/* .van-tabbar {
  height: 46px;
} */
</style>