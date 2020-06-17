<template>
  <div class="register">
    <!-- 标题栏 -->
    <nav-bar class="login-nav">
      <div slot="left">
        <van-icon name="arrow-left" @click="$router.go(-1)" color="white" size="20px" />
      </div>
      <div slot="center">{{$route.meta.title}}</div>
    </nav-bar>
    <div :class="{ error: !formData.name }" class="login-item-other">
      <label for="username">
        用户名
        <span>：</span>
      </label>
      <input
        id="username"
        placeholder="用户名在8个字符之内"
        type="text"
        v-model.trim="formData.name"
        maxlength="8"
      />
    </div>
    <div :class="{ error: !formData.password }" class="login-item">
      <label for="password">
        密码
        <span>：</span>
      </label>
      <input
        id="password"
        placeholder="字母开头、数字；6-18位之间"
        type="password"
        v-model.trim="formData.password"
        @blur="check_password"
        maxlength="18"
      />
    </div>
    <div :class="{ error: !formData.password }" class="login-item">
      <label for="comfirm_password">
        确认密码
        <span>：</span>
      </label>
      <input
        id="comfirm_password"
        placeholder="再次输入密码"
        type="password"
        v-model.trim="comfirm_password"
        @blur="confirm_pwd"
        maxlength="18"
      />
    </div>
    <div :class="{ error: !formData.phone }" class="login-item">
      <label for="phone">
        手机号
        <span>：</span>
      </label>
      <input
        id="phone"
        placeholder="请输入手机号"
        type="text"
        v-model.trim="formData.phone"
        @blur="check_Phone"
        maxlength="11"
      />
    </div>
    <!-- <div :class="{ error: !formData.qq }" class="login-item">
      <label for="qq">
        QQ号
        <span>：</span>
      </label>
      <input id="qq" placeholder="请输入QQ号" type="text" v-model.trim="formData.qq" @blur="check_qq" />
    </div>-->
    <div :class="{ error: !formData.mail }" class="login-item">
      <label for="email">
        邮箱
        <span>：</span>
      </label>
      <input
        id="email"
        placeholder="请输入电子邮箱"
        type="text"
        v-model.trim="formData.email"
        @blur="sendEmail"
      />
    </div>
    <div class="login-btn">
      <div class="login-btn">
        <van-button @click="goRegister" class="login-btn-login" type="info">点击注册</van-button>
        <van-button @click="goLogin" class="login-btn-register" plain type="info">前往登录</van-button>
      </div>
    </div>
    <div class="hidden"></div>
  </div>
</template>

<script>
import NavBar from "@/components/navbar/NavBar";
import { Toast } from "vant";
import crypto from "crypto";
export default {
  name: "Register",
  data() {
    return {
      formData: {
        cid: null,
        name: "",
        password: "",
        phone: "",
        email: "",
        sex: 0,
        address: "广东",
        detail_address: "揭阳市榕城区梅云镇潮下村",
        balance: 0
      },
      comfirm_password: ""
      //  qq: ""
    };
  },
  methods: {
    // 注册
    goRegister() {
      if (!this.formData.name) {
        this.$notify({
          type: "danger",
          message: "用户名不能为空"
        });
      } else if (!this.formData.password) {
        this.$notify({
          type: "danger",
          message: "密码不能为空"
        });
      } else if (!this.comfirm_password) {
        this.$notify({
          type: "danger",
          message: "确认密码不能为空"
        });
      } else if (!this.formData.phone) {
        this.$notify({
          type: "danger",
          message: "手机号不能为空"
        });
      } else if (!this.formData.email) {
        this.$notify({
          type: "danger",
          message: "邮箱不能为空"
        });
      } else {
        //对密码进行加密
        var md5 = crypto.createHash("md5");
        md5.update(this.formData.password); //需要加密的密码
        this.formData.password = md5.digest("hex"); //password 加密完的密码
        //进行注册，将用户添加到数据库操作
        this.$axios
          .post("/registerUser", { form: this.formData })
          .then(res => {
            if (res.data.status == 200) {
              Toast(res.data.msg);
              this.formData.name ="";
              this.formData.email ="";
              this.formData.password ="";
              this.comfirm_password = "";
              this.formData.phone = "";
              setTimeout(() => {
                this.$router.push("/login");
              }, 3000);
            } else {
              Toast("注册失败！");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 前往登录
    goLogin() {
      this.$router.push("/login");
    },
    //校验邮箱是否符合规则
    sendEmail() {
      var regEmail = /^\d{6,15}@\w{2,}\.(com|cn|net|com\.cn)$/;
      if (this.formData.email && !regEmail.test(this.formData.email)) {
        this.$notify({
          type: "danger",
          message: "邮箱格式不正确"
        });
        this.formData.email = "";
      }
    },
    //校验手机号码
    check_Phone() {
      var regPhone = /^1[3456789]\d{9}$/;
      if (this.formData.phone && !regPhone.test(this.formData.phone)) {
        this.$notify({
          type: "danger",
          message: "电话号码格式不正确"
        });
        this.formData.phone = "";
      }
    },
    //校验qq
    // check_qq() {
    //   var regQQ = /^[0-9][0-9]{4,14}$/;
    //   if (this.formData.qq && !regQQ.test(this.formData.qq)) {
    //     this.$notify({
    //       type: "danger",
    //       message: "QQ格式不正确"
    //     });
    //     this.formData.qq = "";
    //   }
    // },

    //校验两次密码是否相同
    confirm_pwd() {
      if (this.comfirm_password != this.formData.password) {
        this.$notify({
          type: "danger",
          message: "两次密码输入不相同"
        });
        this.comfirm_password = "";
      }
    },
    //校验密码
    check_password() {
      var regPassword = /^[a-zA-Z]\w{5,17}$/;
      if (this.formData.password && !regPassword.test(this.formData.password)) {
        this.$notify({
          type: "danger",
          message: "密码输入格式不正确"
        });
        this.formData.password = "";
      }
    }
  },
  components: { NavBar, Toast }
};
</script>

<style scoped>
.register {
  width: 100%;
  color: #333333;
}

.login-nav {
  color: white;
  background-color: #ff8198;
  margin-bottom: 30px;
  position: relative;
  font-weight: 700;
}
.van-icon {
  position: absolute;
  top: 25%;
  left: 5px;
}
.login-item-other {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 340px;
  margin: 80px auto 30px;
}

.login-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 340px;
  margin: 30px auto;
}

.login-item label,
.login-item-other label {
  display: block;
  font-size: 16px;
  width: 100px;
  text-align: center;
  position: relative;
}
.login-item label span,
.login-item-other label span {
  width: 10px;
  height: 100%;
  position: absolute;
  right: 5px;
  text-align: right;
}
.login-item input,
.login-item-other input {
  display: block;
  width: 240px;
  height: 36px;
  line-height: 36px;
  outline: none;
  background: none;
  border: 1px solid #cccccc;
  border-radius: 5px;
  padding-left: 10px;
  font-size: 14px;
}

.login-item input:focus,
.login-item-other input:focus {
  border: 1px solid #4098ef;
}

.login-item.error input:focus,
.login-item-other.error input:focus {
  border: 1px solid red;
}

.login-item input::placeholder {
  color: #999999;
}

.login-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 340px;
  margin: 0 auto;
}
.hidden {
  width: 100%;
  height: 55px;
  position: fixed;
  bottom: 0px;
  z-index: 99;
  background-color: #fff;
}
.code {
  width: 60%;
}
.code .left label {
  font-size: 16px;
  width: 70px;
}
.code .left input {
  width: 270px;
  height: 36px;
  line-height: 36px;
  outline: none;
  background: none;
  border: 1px solid #cccccc;
  border-radius: 5px;
  padding-left: 10px;
  font-size: 14px;
}
</style>
