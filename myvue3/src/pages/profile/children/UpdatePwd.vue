<template>
  <div class="update_pwd">
    <nav-bar class="update-nav">
      <div slot="left">
        <van-icon name="arrow-left" @click="$router.go(-1)" color="white" size="20px" />
      </div>
      <div slot="center">{{$route.meta.title}}</div>
    </nav-bar>
    <div class="update">
      <div class="update-pic">
        <van-image :src="update_image" class="update-pic-img" fit="cover" round />
      </div>
    </div>
    <van-cell-group>
      <van-field
        v-model.trim="original_pwd"
        type="password"
        required
        clearable
        label="原密码"
        right-icon="question-o"
        placeholder="请输入原密码"
        @click-right-icon="tips"
        @blur="check_original_password"
      />

      <van-field
        v-model.trim="new_password"
        type="password"
        label="新密码"
        placeholder="字母开头、数字；6-18位之间"
        required
        clearable
        @blur="check_password"
        maxlength="18"
      />

      <van-field
        v-model.trim="comfirm_password"
        type="password"
        label="确认密码"
        placeholder="请再次输入新密码"
        required
        clearable
        maxlength="18"
        @blur="check_new_password"
      />
    </van-cell-group>
    <div class="button">
      <van-button type="info" size="large" @click="check" round>确定修改</van-button>
    </div>
    <div class="hidden"></div>
  </div>
</template>

<script>
import NavBar from "@/components/navbar/NavBar";
import crypto from "crypto";
import { Toast } from "vant";
export default {
  name: "UpdatePwd",
  data() {
    return {
      id: this.$store.state.Profile.personInfo.cid,
      update_image:
        this.$store.state.Profile.personInfo.length != 0
          ? "http://127.0.0.1:3000/public/uploads/headSculpture/" +
            this.$store.state.Profile.personInfo.photo
          : require("@/assets/img/profile/user.png"),
      //数据库原密码
      password: this.$store.state.Profile.personInfo.password,
      //用户输入的原密码
      original_pwd: "",
      new_password: "",
      comfirm_password: ""
    };
  },
  created() {
    Toast.setDefaultOptions({ duration: 2000 });
  },
  methods: {
    tips() {
      Toast("修改密码需本人进行操作，请勿让旁人看到输入的新密码！！！");
    },
    //检查原密码
    check_original_password() {
      //对密码进行加密
      var md5 = crypto.createHash("md5");
      md5.update(this.original_pwd); //需要加密的密码
      var md5_password = md5.digest("hex"); //password 加密完的密码
      if (md5_password != this.password) {
        Toast("原密码不正确！");
        //防止错误密码还点确定修改按钮操作
        this.original_pwd = "";
      }
    },
    //确认新密码和确认密码是否相同
    check_new_password() {
      if (this.new_password != this.comfirm_password) {
        Toast("两次密码输入不一致！");
        //防止两次密码不相同还点确定修改按钮操作
        this.comfirm_password = "";
      }
    },
    //校验新密码输入的规则是否符合要求
    check_password() {
      var regPassword = /^[a-zA-Z]\w{5,17}$/;
      if (this.new_password && !regPassword.test(this.new_password)) {
        Toast("密码输入格式不正确！");
        this.new_password = "";
      }
    },
    //确认按钮点击事件
    check() {
      if (!this.original_pwd) {
        Toast("原密码不能为空！");
      } else if (!this.new_password) {
        Toast("新密码不能为空！");
      } else if (!this.comfirm_password) {
        Toast("确认密码不能为空！");
      } else {
        //对密码进行加密
        var md5 = crypto.createHash("md5");
        md5.update(this.new_password); //需要加密的密码
        var md5_password = md5.digest("hex"); //password 加密完的密码
        this.$axios
          .post("/UpdatePassword", {
            id: this.id,
            password: md5_password
          })
          .then(res => {
            if (res.data.status == 200) {
              Toast(res.data.msg);
              this.$store.dispatch(
                "Profile/update_password",
                this.new_password
              );
              this.password = md5_password;
              this.original_pwd = "";
              this.new_password = "";
              this.comfirm_password = "";
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  components: { NavBar, Toast }
};
</script>

<style>
.update_pwd {
  width: 100%;
  background-color: #fff;
}
.update-nav {
  color: white;
  background-color: #ff8198;
  /* margin-bottom: 30px; */
  position: relative;
  font-weight: 700;
}
.update-nav .van-icon {
  position: absolute;
  top: 25%;
  left: 5px;
}
.update {
  width: 100%;
  height: 200px;
  background-color: #ffffff;
  position: relative;
}
.update-pic {
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

.update-pic .update-pic-img {
  display: block;
  width: 60px;
  height: 60px;
}

.button .van-button {
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
</style>