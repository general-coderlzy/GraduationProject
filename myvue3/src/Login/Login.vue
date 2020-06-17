<template>
  <div class="user_login">
    <nav-bar class="login-nav">
      <div slot="left">
        <van-icon name="arrow-left" @click="$router.go(-1)" color="white" size="20px" />
      </div>
      <div slot="center">{{$route.meta.title}}</div>
    </nav-bar>
    <div class="user">
      <div class="user-pic">
        <van-image :src="login_image" class="user-pic-img" fit="cover" round />
      </div>
    </div>
    <van-cell-group>
      <van-field
        v-model.trim="username"
        required
        clearable
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        ref="username"
        @click-right-icon="tips"
      />

      <van-field
        v-model.trim="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        clearable
        ref="password"
      />
      <div class="code">
        <div class="left">
          <van-field
            v-model.trim="code"
            size="large"
            center
            clearable
            label="验证码"
            placeholder="请输入验证码"
            required
            maxlength="4"
          ></van-field>
        </div>
        <div class="right">
          <van-image :src="code_image" @click="change_code()" class="code_image" />
        </div>
      </div>
    </van-cell-group>
    <div class="button">
      <van-button type="info" size="large" @click="check" round>登录</van-button>
      <van-button type="info" size="large" round @click="go_register">注册</van-button>
    </div>
    <div class="hidden"></div>
  </div>
</template>
<script>
import NavBar from "@/components/navbar/NavBar";
import { Field, CellGroup, Image, Button, Toast } from "vant";
import { check_user } from "../network/profile";
import { mapActions, mapState } from "vuex";
//crytp：加密
import crypto from "crypto";
export default {
  name: "Login",
  data() {
    return {
      value: "",
      username: "",
      password: "",
      code: "",
      login_image: require("@/assets/img/profile/user.png"),
      code_image: "/api/getCode"
    };
  },
  mounted() {
    // 将所有 Toast 的展示时长设置为 2000 毫秒
    Toast.setDefaultOptions({ duration: 2000 });
  },
  components: { Field, CellGroup, Button },
  methods: {
    ...mapActions("collectionList", ["addCollection"]),
    tips() {
      Toast("用户名和密码是必填项，如果没有用户名，请先注册后再进行登录！");
    },
    change_code() {
      this.code_image = this.code_image + "?" + Math.random();
    },
    check() {
      if (!this.username) {
        Toast("用户名不能为空！");
      } else if (!this.password) {
        Toast("密码不能为空！");
      } else if (!this.code) {
        Toast("验证码不能为空！");
      } else {
        //对密码进行加密
        var md5 = crypto.createHash("md5");
        md5.update(this.password); //需要加密的密码
        var md5_password = md5.digest("hex"); //password 加密完的密码
        //检查用户名和密码
        this.$axios
          .post("/checkUserLogin", {
            name: this.username,
            password: md5_password,
            code: this.code
          })
          .then(res => {
            //判断验证码是否错误
            if (res.data.status == 0) {
              Toast(res.data.msg);
            } else {
              if (res.data[0]) {
                var save_peronInfo = res.data[0];
                //在这里将sex中的值转化男或女
                if (save_peronInfo.sex == 0) {
                  save_peronInfo.sex = "女";
                } else {
                  save_peronInfo.sex = "男";
                }
                //异步提交给mutations处理保存到state中
                this.$store.dispatch(
                  "Profile/save_peronInfo",
                  JSON.stringify(save_peronInfo)
                );
                //查询用户的收藏商品
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
                //提示信息
                Toast("登录成功！");
                //两秒后跳转到前一个页面
                setTimeout(() => {
                  this.$router.back();
                }, 2000);
              } else {
                Toast("用户名或密码错误！");
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //跳转注册页面
    go_register() {
      this.$router.push("/register");
    }
  },
  components: { NavBar },
  computed: {
    ...mapState({
      cid: state => state.Profile.personInfo.cid
    })
  }
};
</script>


<style scoped>
.user_login {
  width: 100%;
  height: 44px;
  background-color: #fff;
}
.login-nav {
  color: white;
  /* background-color: #ff8198; */
  /* margin-bottom: 30px; */
  position: relative;
  font-weight: 700;
}
.login-nav .van-icon {
  position: absolute;
  top: 25%;
  left: 5px;
}
.user {
  width: 100%;
  height: 200px;
  background-color: #ffffff;
  position: relative;
}
.user-pic {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 40%;
  top: 60%;
}

.user-pic .user-pic-img {
  display: block;
  width: 60px;
  height: 60px;
}

.van-button {
  margin-top: 10px;
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
  width: 100%;
  height: 48px;
  position: relative;
}
.code .left {
  width: 70%;
}
.code .right {
  width: 30%;
  height: 49px;
  background-color: #fff;
  position: absolute;
  right: 0;
  top: 0;
}
.code_image {
  position: fixed;
  right: 4px;
  /* top: 342px; */
}
</style>