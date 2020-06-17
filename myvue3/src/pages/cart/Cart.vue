<!--  -->
<template>
  <div id="cart">
    <nav-bar>
      <div slot="left">       
        <van-icon name="arrow-left" @click="$router.back()" color="white"/>
      </div>
      <div slot="center">购物车({{cartList.length}})</div>
    </nav-bar>
    <!-- 购物车为空时显示 -->
    <div v-if="cartList.length==0" class="cart_empty">
              <div style="text-align: center;">
                <div class="wrap_cart">
                    <van-icon size="100" name="shopping-cart-o" class="empty_cart"></van-icon>
                </div>
                <p class="text_empty">购物车空空如也~~~</p>
                <p class="buy_text">“再忙，也要买点什么犒赏自己~”</p>
            </div>
    </div>
      <!-- 商品列表 -->
    <div class="card-goods" v-for="(item,index) in cartList" :key="index">
      <van-swipe-cell>     
        <template slot="default">
          <div class="goods">
            <div class="left_checkbox">
              <van-checkbox class="goods_checkbox" v-model="item.isCheck" @click="selected(index)"></van-checkbox>
            </div>
            <div class="right_card">
            <van-card
                :title="item.name"         
                :num="item.buynum"
                :price="formatPrice(item.pprice)"
                :desc="'颜色：'+item.color+', 码数：'+item.size"
                :thumb="imgSrc + item.pcode+'/'+ item.img"
            >
              <div slot="footer">
                <van-stepper :integer="int" 
                :max="item.num" 
                v-model="item.buynum" 
                disable-input
                @plus="addnum(index)"
                @minus="delNumber(index)"/>
              </div>  
            </van-card>
            </div>
          </div>
        </template>
        <template slot="right">
          <van-button class="del_btn" square type="danger" text="删除" @click="onDel(index)"/>
        </template>
      </van-swipe-cell>
  </div>


      <!-- 提交订单栏 -->
        <van-submit-bar 
          class="submit_bar"
          :price=allPrice*100
          button-text= "提交订单"
          @submit="onSubmit"
        >
          <van-checkbox :value="selectAll"  class="all_check" @click="selectedAll()">全选</van-checkbox>
        </van-submit-bar>

  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import {
  Card,
  Checkbox,
  CheckboxGroup,
  Stepper,
  Icon,
  SubmitBar,
  Toast,
  Button,
  SwipeCell,
  Dialog,
  Col,
  Row
} from "vant";
import NavBar from "../../components/navbar/NavBar";
export default {
  data() {
    return {
      imgSrc: "http://127.0.0.1:3000/public/uploads/images/",
      checked: true,
      int: true
    };
  },
  name: "Cart",
  components: {
    NavBar,
    Card,
    Checkbox,
    CheckboxGroup,
    Stepper,
    Icon,
    SubmitBar,
    Toast,
    Button,
    SwipeCell
  },
  created() {
    if (this.$store.state.Profile.personInfo.length == 0) {
      Toast("请先登录");
      this.$router.push("/login");
    } else {
      this.$axios
        .get("/getCartGoodsInfo", {
          params: {
            cid: this.$store.state.Profile.personInfo.cid
          }
        })
        .then(res => {
          // console.log(res.data);
          this.$store.state.cartList.cartList = res.data;
        });
    }
  },
  computed: {
    ...mapState({
      cartList: state => state.cartList.cartList
    }),
    cartList: {
      get() {
        return this.$store.state.cartList.cartList;
      },
      set(val) {
        return (this.$store.state.cartList.cartList = val);
      }
    },
    ...mapGetters("cartList", ["allPrice", "selectAll"])
  },
  methods: {
    ...mapActions("cartList", [
      "addNumber",
      "delNumber",
      "delGoods",
      "selected",
      "selectedAll"
    ]),
    //钱的格式
    formatPrice(price) {
      return price.toFixed(2);
    },
    //数量加
    addnum(index) {
      if (this.cartList[index].buynum == this.cartList[index].num - 1) {
        Dialog.alert({
          message: "没有库存了o(╥﹏╥)o"
        }).then(() => {
          this.addNumber(index);
          this.delNumber(index);
        });
      } else {
        this.addNumber(index);
      }
    },
    //删除商品
    onDel(index) {
      Dialog.confirm({
        message: "确定删除吗？"
      })
        //确定按钮的事件
        .then(() => {
          this.delGoods(index);
          // this.cartList = this.cartList.splice(index, 1);
        })
        //取消按钮的事件
        .catch(() => {
          return;
        });
    },
    onSubmit() {
      // Toast("点击结算");
      var payList = this.cartList.filter(item => item.isCheck == true);
      // console.log(payList);
      localStorage.setItem("payList", JSON.stringify(payList));
      this.$router.push("/Order");
    }
  }
};
</script>
<style scoped>
#cart {
  margin-top: 44px;
  /* height: 100%; */
  /* background-color: #ccc; */
}
#cart:nth-last-child(2) {
  margin-bottom: 110px;
}
.card-goods {
  width: 100%;
  background-color: #fff;
  display: flex;
  /* position: relative; */
  margin: 10px 0;
}
.submit_bar {
  margin-bottom: 49px;
}
.all_check {
  width: 30%;
}
.goods {
  display: flex;
}
.left_checkbox {
  width: 10%;
}
.right_card {
  flex: 1;
}
.del_btn {
  height: 100%;
  font-size: 20px;
  border: none;
}
.goods_checkbox {
  height: 100%;
  padding-left: 20%;
}
.cart_empty {
  margin: 50% auto;
  text-align: center;
}
.wrap_cart {
  display: inline-block;
  border-radius: 50%;
  color: white;
  background-color: #0094ff;
}
.text_empty {
  color: grey;
  line-height: 28px;
}
.buy_text {
  font-size: 14px;
  color: #b5b4b4;
}
</style>