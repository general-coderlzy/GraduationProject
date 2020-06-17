<template>
  <div>
    <nav-bar>
      <div slot="left">       
        <van-icon name="arrow-left" @click="$router.back()" color="white"/>
      </div>
      <div slot="center">提交订单</div>
    </nav-bar>
    <!-- 收货人信息 -->
    <div class="ContactCard">     
      <van-row>
        <van-col span="6">收货人信息:</van-col>        
      </van-row>
      <div class="contact_info">
        <div class="left_icon"><van-icon name="contact" size="40" /></div>
        <div class="right_info">
          <van-row>
            <van-col span="3">姓名:</van-col>
            <van-col span="4">{{addressInfo.userName}}</van-col>
            <van-col span="17"><van-tag  type="danger">默认</van-tag></van-col>
          </van-row>
          <van-row>
            <van-col span="3">电话:</van-col>
            <van-col span="21">{{addressInfo.userPhone}}</van-col>
          </van-row>
          <van-row>
            <van-col span="3">地址:</van-col>
            <van-col span="21" class="address_text">{{addressInfo.userAddress}}</van-col>
          </van-row>
        </div>
      </div>
    </div>
    
    <!-- 商品信息 -->
    <div class="list" v-for="(item,index) in this.payList" :key="index">
        <van-card
          :num=item.buynum
          :price=formatPrice(item.pprice)
          :desc="'颜色：'+item.color+', 码数：'+item.size"
          :title=item.name
          :thumb="imgSrc + item.pcode+'/'+ item.img"
        />
    </div>
    <van-cell title="配送方式" is-link value="顺丰快递" />
    <van-cell title="支付方式" is-link value="微信支付" />
    <van-submit-bar
    :price=allPrice*100
    button-text="付款"
    @submit="onSubmit"
    />

    <van-popup
      v-model="showPopup"
      position="bottom"
      :style="{ height: '50%' }"
    >
  <!-- 密码输入框 -->
<van-password-input
  :value="value"
  info="密码为 6 位数字"
  :focused="showKeyboard"
  @focus="showKeyboard"
/>
<!-- 数字键盘 -->
<van-number-keyboard
  :show="showKeyboard"
  theme="custom"
  extra-key="."
  close-button-text="完成"
  @close="submit"
  @input="onInput"
  @delete="onDelete"
/>
</van-popup>

  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import {
  SubmitBar,
  Col,
  Row,
  Toast,
  Card,
  Cell,
  PasswordInput,
  NumberKeyboard,
  Popup,
  Tag
} from "vant";
import NavBar from "../../components/navbar/NavBar";
export default {
  data() {
    return {
      value: "",
      payList: JSON.parse(localStorage.getItem("payList")),
      showPopup: false,
      showKeyboard: false,
      imgSrc: "http://127.0.0.1:3000/public/uploads/images/",
      addressInfo: {}
    };
  },
  mounted() {
    // var aform = {
    //   cid: this.personInfo.cid,
    //   isDefault: 1
    // };
    // console.log(aform);
    this.$axios
      .get("/getAddressByCId", {
        params: {
          cid: this.personInfo.cid,
          isDefault: 1
        }
      })
      .then(res => {
        // console.log(res.data);
        this.addressInfo = res.data[0];
      });
  },

  components: { NavBar },

  computed: {
    ...mapState({
      personInfo: state => state.Profile.personInfo
    }),
    allPrice: () => {
      var total = 0;
      var payList = JSON.parse(localStorage.getItem("payList"));
      // console.log(this.payList);
      payList.forEach(item => {
        total += item.pprice * item.buynum;
      });
      return total;
    }
  },

  methods: {
    ...mapActions("Profile", ["save_peronInfo"]),
    onSubmit() {
      this.showKeyboard = true;
      this.showPopup = true;
    },
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    formatPrice(price) {
      return price.toFixed(2);
    },
    //修改时间格式
    getdate() {
      var now = new Date(),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
      return (
        y +
        "-" +
        (m < 10 ? "0" + m : m) +
        "-" +
        (d < 10 ? "0" + d : d) +
        " " +
        now.toTimeString().substr(0, 8)
      );
    },
    //数据库操作
    pay(state) {
      var form = {
        createTime: this.getdate(),
        state: state,
        cid: this.personInfo.cid,
        addressId: this.addressInfo.addressId
      };
      console.log(form);
      //插入order表
      this.$axios.post("/placeOrder", { form: form }).then(res => {
        console.log(res.data.insertId); //oid
        console.log(this.payList);
        for (let i = 0; i < this.payList.length; i++) {
          var iform = {
            buynum: this.payList[i].buynum,
            total: this.payList[i].pprice * this.payList[i].buynum,
            sid: this.payList[i].sid,
            oid: res.data.insertId,
            pid: this.payList[i].pid
          };
          // console.log(iform);
          //插入orderitem表
          this.$axios.post("/placeOrderItem", { form: iform });
        }
      });
      //删除cart表选中商品的数据
      for (let i = 0; i < this.payList.length; i++) {
        this.$axios.post("/delCartGoods", { ccid: this.payList[i].ccid });
      }
      //删除本地存储paylist
      localStorage.removeItem("paylist");
      //返回购物车页面
      var t = setTimeout(() => {
        this.$router.back();
      }, 1000);
    },
    submit() {
      // console.log(this.personInfo.cid);

      this.showKeyboard = false;
      this.showPopup = false;
      console.log(this.value);
      if (this.value == "123456") {
        Toast("密码正确！");
        if (this.personInfo.balance <= this.allPrice) {
          Toast("余额不足,付款失败！请及时充值！！！");
          this.pay(0);
        } else {
          Toast("付款成功！");
          //修改数据库余额
          var mform = {
            cid: this.personInfo.cid,
            balance: this.personInfo.balance - this.allPrice
          };
          this.$axios.post("/updateMoney", { form: mform }).then(res => {
            this.save_peronInfo(JSON.stringify(res.data[0]));
          });
          //修改积分
          var jfform = {
            cid: this.personInfo.cid,
            integral: this.personInfo.integral + 5
          };
          this.$axios.post("/updateIntegral", { form: jfform }).then(res => {
            this.save_peronInfo(JSON.stringify(res.data[0]));
          });
          this.pay(1);
        }
      } else {
        Toast("密码错误！");
      }
      this.value = "";
    }
  }
};
</script>
<style scoped>
.ContactCard {
  margin-top: 44px;
  width: 100%;
  position: relative;
}
.ContactCard::before {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 2px;
  background: repeating-linear-gradient(
    -45deg,
    #ff6c6c 0,
    #ff6c6c 20%,
    transparent 0,
    transparent 25%,
    #1989fa 0,
    #1989fa 45%,
    transparent 0,
    transparent 50%
  );
  background-size: 80px;
  content: "";
}
.contact_info {
  display: flex;
}
.left_icon {
  width: 20%;
  text-align: center;
  line-height: 80px;
}
.right_info {
  flex: 1;
  padding-bottom: 2%;
}
.address_text {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 14px;
  /* width: 60%; */
}
</style>