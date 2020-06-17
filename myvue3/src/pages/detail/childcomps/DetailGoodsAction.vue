<!--  -->
<template>
  <div>
        <van-goods-action>
          <van-goods-action-icon icon="chat-o" text="客服" @click="onClickIcon" />
          <van-goods-action-icon icon="star-o" text="收藏" @click="addCol"/>
          <van-goods-action-icon icon="cart-o" text="购物车" @click="toCart"/>
          <van-goods-action-button type="warning" text="加入购物车" @click="onClickCart" />
          <van-goods-action-button type="danger" text="立即购买" @click="onClickBuy" />
        </van-goods-action>
  </div>
</template>

<script>
import { eventBus } from "../../../main";
import { Toast, GoodsAction, GoodsActionIcon, GoodsActionButton } from "vant";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  props: {
    goodsInfo: {}
  },
  components: {
    Toast,
    GoodsAction,
    GoodsActionIcon,
    GoodsActionButton
  },

  computed: {
    ...mapState({
      collectionList: state => state.collectionList,
      cid: state => state.Profile.personInfo.cid
    })
  },

  methods: {
    ...mapActions("collectionList", ["addCollection"]),
    addCol() {
      var data = this.goodsInfo;
      var formdata = {
        cid: this.cid,
        name: data.name,
        img: data.img,
        price: data.cprice,
        selected: 0,
        pcode: data.pcode
      };
      this.$axios
        .get("/iscollected", {
          params: {
            name: data.name,
            cid: this.cid
          }
        })
        .then(res => {
          if (res.data[0].count == 0) {
            this.$axios
              .post("/insertcollect", { form: formdata })
              .then(res => {
                if (res.data.status == 200) {
                  Toast(res.data.msg);
                  //请求收藏商品数据
                  this.$axios
                    .get("/get_collect_data", {
                      params: {
                        cid: this.cid
                      }
                    })
                    .then(res => {
                      if (res.data) {
                        this.addCollection(JSON.stringify(res.data));
                      } else {
                        Toast("获取数据失败！");
                      }
                    });
                }
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            Toast("已经收藏啦！");
          }
        });
    },
    onClickIcon() {
      Toast("点击图标");
    },
    onClickCart() {
      // Toast("点击按钮");
      eventBus.$emit("addCart");
    },
    onClickBuy() {
      Toast("点击购买按钮");
    },
    toCart() {
      this.$router.push("/Cart");
    }
  }
};
</script>
<style scoped>
</style>