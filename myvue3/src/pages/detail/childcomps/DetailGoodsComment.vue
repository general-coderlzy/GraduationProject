<!--  -->
<template>
  <div class="goods_detail goods_describe">
            <van-row>
                <van-col span="18"><div class="sell_massage express" style="padding-left: 0px">宝贝评价(2370)</div></van-col>
                <van-col span="6"><div class="sell_massage address" style="color: orange">查看更多 <van-icon name="arrow" class="icon_coupon"></van-icon></div></van-col>
            </van-row>
            <van-row>
                <van-col span="24">
                    <div>
                        <span class="rate_detail">很舒服(95)</span>
                        <span class="rate_detail">质量很好(78)</span>
                        <span class="rate_detail">版型好(70)</span>
                    </div>
                </van-col>
            </van-row>
            <van-row>
                <van-col span="24">
                    <div class="user_rate">
                        <img src="" alt="">
                        <span>Q********P</span>
                    </div>
                    <div class="rate_text">
                        裤子摸上去蛮舒服的，还送了一双短袜，很满意
                    </div>
                </van-col>
            </van-row>
                        <van-row>
                <van-col span="18"><div class="sell_massage express" style="padding-left: 0px">问大家(49)</div></van-col>
                <van-col span="6"><div class="sell_massage address" style="color: orange">查看全部 <van-icon name="arrow" class="icon_coupon"></van-icon></div></van-col>
                <van-col span="24">
                    <van-row>
                        <van-col span="12"> <div class="question"><span>问</span> 薄还是厚</div></van-col>
                        <van-col span="12"> <div class="question" style="text-align: right;padding-right: 5px;color: lightgray">1个回答</div></van-col>
                        <van-col span="12"> <div class="question"><span>问</span> 夏天合适吗</div></van-col>
                        <van-col span="12"> <div class="question" style="text-align: right;padding-right: 5px;color: lightgray;padding-bottom: 15px">6个回答</div></van-col>
                    </van-row>
                </van-col>
            </van-row>
            <van-row>
                <van-col span="24"><div style="height: 10px;background-color: #f4f4f4"></div></van-col>
            </van-row>

  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  computed: {},

  methods: {}
};
</script>
<style scoped>
.goods-swipe img {
  width: 100%;
  display: block;
  height: 350px;
}
.goods_describe .price {
  color: orangered;
  padding: 15px 0 0 9px;
}
.goods_describe .old_price {
  color: grey;
  padding: 0 0 5px 10px;
}
.goods_describe .old_price span {
  text-decoration: line-through;
}
.goods_describe .price .new_price {
  font-size: 26px;
}
.goods_describe .price .sell {
  font-size: 12px;
  padding: 0 2px;
  background-color: #fdebe5;
}
.goods_describe .goods_title {
  font-size: 12px;
  font-weight: bold;
  line-height: 15px;
  padding-left: 10px;
}
.goods_describe .goods-share {
  text-align: right;
  line-height: 30px;
}
.goods_describe .goods-share span {
  padding: 5px 8px;
  background-color: #f4f4f4;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  color: grey;
}
.goods_describe .sell_massage {
  height: 32px;
  line-height: 32px;
  text-align: center;
  color: #111;
  font-size: 12px;
  -webkit-transform: scale(0.9);
}
.goods_describe .coupon_massage {
  height: 28px;
  line-height: 28px;
  text-align: center;
  color: #111;
  font-size: 12px;
  -webkit-transform: scale(0.9);
}
.goods_describe .express {
  text-align: left;
  padding-left: 10px;
}
.goods_describe .address {
  text-align: right;
  padding-right: 28px;
  position: relative;
}
.goods_describe .pro_address {
  padding-right: 8px;
}
.goods_describe .address .icon_coupon {
  position: absolute;
  top: 10px;
  right: 10px;
}
.goods_describe .coupon {
  text-align: left;
}
.goods_detail .rate_detail {
  padding: 4px 12px;
  background-color: #fdebe5;
  border-radius: 14px;
  text-decoration: underline;
  display: inline-block;
  -webkit-transform: scale(0.8);
}
.goods_describe .user_rate * {
  display: inline-block;
  vertical-align: middle;
  line-height: 20px;
  margin-top: 10px;
}
.goods_describe .user_rate img {
  width: 15px;
  height: 15px;
  border-radius: 50%;
}
.goods_describe .rate_text {
  font-size: 12px;
  -webkit-transform: scale(0.9);
  padding-bottom: 20px;
  border-bottom: 1px solid #f5f5f5;
}
.goods_describe .user_rate {
  font-size: 12px;
  -webkit-transform: scale(0.9);
}
.goods_describe .question {
  font-size: 12px;
  /* -webkit-transform: scale(0.9); */
  padding-left: 5px;
}
.goods_describe .question span {
  color: orange;
}
</style>