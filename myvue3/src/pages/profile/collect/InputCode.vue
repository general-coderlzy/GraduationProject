<template>
  <div class="QQCode">
    <nav-bar class="QQcode-nav">
      <div slot="left">
        <van-icon name="arrow-left" @click="$router.back()" color="white" size="20px" />
      </div>
      <div slot="center">{{$route.meta.title}}</div>
    </nav-bar>
    <!-- 密码输入框 -->
    <div class="password">
      <van-password-input
        :value="value"
        info="验证码为 6 位数字"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
      />
    </div>

    <!-- 数字键盘 -->
    <van-number-keyboard
      :show="showKeyboard"
      theme="custom"
      extra-key="."
      close-button-text="完成"
      @blur="showKeyboard = false"
      @input="onInput"
      @delete="onDelete"
      @hide="send_EmailCode"
    />
    <div class="hidden"></div>
  </div>
</template>

<script>
import NavBar from "@/components/navbar/NavBar";
import { mapState, mapActions } from "vuex";
import { PasswordInput, NumberKeyboard, Toast } from "vant";
export default {
  name: "InputCode",
  data() {
    return {
      value: "",
      showKeyboard: true
    };
  },
  created() {
    if (this.$store.state.Profile.personInfo.length == 0) {
      this.showKeyboard = false;
      Toast("请先登录");
      this.$router.push("/login");
    }
  },
  methods: {
    ...mapActions("collectionList", ["save_email_status"]),
    ...mapActions("Profile", ["update_userinfo"]),
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    send_EmailCode() {
      this.$axios
        .post("/postEmail", {
          AuthCode: this.value,
          Email: this.Get_Email
        })
        .then(res => {
          if (res.data.status == 2) {
            Toast(res.data.msg);
            //修改邮箱绑定状态
            this.$axios
              .post("/BindQQ", {
                bindEmail: 1,
                id: this.Get_Cid
              })
              .then(res => {
                if (res.data[1].status == 200) {
                  this.update_userinfo(JSON.stringify(res.data[0]));
                }
              })
              .catch(err => {});
            setTimeout(() => {
              this.$router.push("/Profile");
            }, 1000);
          } else {
            Toast("验证失败！！！");
          }
        })
        .catch(err => {});
    }
  },
  components: {
    PasswordInput,
    NumberKeyboard,
    NavBar,
    mapState,
    mapActions,
    Toast
  },
  computed: {
    ...mapState({
      Get_Email: state => state.Profile.personInfo.email,
      Get_Cid: state => state.Profile.personInfo.cid
    })
  }
};
</script>

<style scoped>
.QQCode {
  width: 100%;
}
.QQCode .QQcode-nav {
  color: white;
  /* background-color: #ff8198; */
  /* margin-bottom: 30px; */
  position: relative;
  font-weight: 700;
}
.van-icon-arrow-left {
  position: absolute;
  top: 25%;
  left: 5px;
}
.password {
  height: 90px;
  width: 100%;
  background-color: #ffffff;
  position: fixed;
  top: 35%;
}
/* 隐藏Tabbar部分 */
.hidden {
  width: 100%;
  height: 55px;
  position: fixed;
  bottom: 0px;
  z-index: 99;
  background-color: #fff;
}
</style>