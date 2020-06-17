<!--  -->
<template>
  <div>
    <van-cell-group>
          <van-cell>
            <div class="goods-title">{{ goodsInfo.name }}</div>
            <div class="goods-price">{{ formatPrice(goodsInfo.cprice) }}</div>
          </van-cell>
          <van-cell class="goods-express">
            <van-col span="10">运费：免运费</van-col>
            <van-col span="14">剩余：{{ goodsInfo.sku.stock_num }}</van-col>
          </van-cell>
    </van-cell-group>

        <!-- 产品规格、参数 -->
          <van-cell-group>
            <van-cell title="规格"  label="请选择尺寸，颜色分类" is-link @click="showsku"/>
            <van-cell title="参数"  label="品牌,图案..." is-link @click="showPopup"/>
          </van-cell-group>
          <!-- 参数弹出层 -->
          <van-popup v-model="showParameter" round position="bottom" :style="{ height: '60%' }" >
            <div class="parameter">
            <div class="parameter_title">产品参数</div>
            <van-row v-for="(x,index) in 5" :key="index" style="border-bottom: 1px solid rgb(253, 253, 253)">
              <van-col span="6">
                  <div class='param_title' style="color: #848080">
                      <p>我是谁</p>
                  </div>
              </van-col>
              <van-col span="18">
                  <div class='param_desc' style="text-align: left">
                      <p>我真帅！！！！！！</p>
                  </div>
              </van-col>
            </van-row>
            </div>

          </van-popup>
          <!-- 规格弹出层 -->
          <van-sku
                  v-model="showSku"
                  :sku="goodsInfo.sku"
                  :goods="goods"
                  :goods-id="goodsInfo.pid"
                  :quota="quota"
                  :quota-used="quotaUsed"                
                  :custom-stepper-config="customStepperConfig"
                   @add-cart="onAddCartClicked"
                />
  </div>
</template>

<script>
import { eventBus } from "../../../main";
import { mapState, mapActions } from "vuex";
import localStorage from "../../.././localStorage/localStorage.js";
import { Row, Col, Cell, CellGroup, Popup, Sku, Toast } from "vant";

export default {
  data() {
    return {
      showParameter: false, //产品参数开关,
      showSku: false, //商品规格开关
      quota: 0,
      quotaUsed: 0,
      goods: {
        // 数据结构见下方文档
        // 商品标题
        title: "测试商品",
        // 默认商品 sku 缩略图
        picture: "http://127.0.0.1:3000/public/uploads/images/a.jpg"
      },
      messageConfig: {
        // 数据结构见下方文档
      },
      customStepperConfig: {
        // 自定义限购文案
        quotaText: "每次限购xxx件",
        // 自定义步进器超过限制时的回调
        handleOverLimit: data => {
          const { action, limitType, quota, quotaUsed } = data;

          if (action === "minus") {
            Toast("至少选择一件商品");
          } else if (action === "plus") {
            const { LIMIT_TYPE } = Sku.skuConstants;
            if (limitType === LIMIT_TYPE.QUOTA_LIMIT) {
              let msg = `单次限购${quota}件`;
              if (quotaUsed > 0) msg += `，你已购买${quotaUsed}`;
              Toast(msg);
            } else {
              Toast("库存不够了");
            }
          }
        },
        // 步进器变化的回调
        handleStepperChange: currentValue => {},
        // 库存
        stockNum: 20,
        // 格式化库存
        stockFormatter: stockNum => {}
      }
    };
  },
  props: {
    goodsInfo: {}
  },
  components: {
    Col,
    Cell,
    CellGroup,
    Popup,
    Sku
  },

  computed: {
    ...mapState({
      cartList: state => state.cartList
    })
  },
  created() {
    eventBus.$on("addCart", () => {
      this.showSku = true;
    });
  },
  methods: {
    ...mapActions("cartList", ["addGoods"]),
    onAddCartClicked(skudata) {
      //先判断用户有没有登录
      if (this.$store.state.Profile.personInfo.length != 0) {
        var data = skudata;
        data.isCheck = 1;
        // console.log(data);
        var form = {
          sid: data.selectedSkuComb.sid,
          cid: this.$store.state.Profile.personInfo.cid,
          buynum: data.selectedNum,
          isCheck: data.isCheck
        };
        // console.log(form);

        this.$axios
          .get("/getCartByCid", {
            params: {
              cid: form.cid
            }
          })
          .then(res => {
            var r = false;
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].sid === form.sid) {
                r = true;
              }
            }
            if (r) {
              Toast("该商品已存在");
              this.showSku = false;
            } else {
              Toast("加入购物车成功！");
              this.$axios.post("/postCartById", { form: form });
              this.showSku = false;
            }
          });
      } else {
        this.$router.push("/login");
      }
    },
    showsku() {
      this.showSku = true;
    },
    showPopup() {
      this.showParameter = true;
    },
    formatPrice() {
      return "¥" + this.goodsInfo.pprice.toFixed(2);
    }
  }
};
</script>
<style scoped>
.goods-price {
  color: red;
  font-size: 20px;
}
.parameter {
  padding: 0 20px;
  font-size: 20px;
}
.parameter_title {
  text-align: center;
}
</style>