<template>
  <div class="login">
    <van-uploader :after-read="afterRead" :before-read="islogin">
      <div class="login_user_pic">
        <van-image :src="defaultPic" class="user-pic-img" fit="cover" round />
      </div>
    </van-uploader>
    <div @click="curLogin ? '' : goLogin()" class="user-info">
      <p v-if="curLogin">{{username}}</p>
      <p v-else>登录/注册</p>
      <div class="phone-num">
        <img alt class="icon-phone" src="@/assets/img/profile/phone.png" />
        <p v-if="curLogin">{{ phone }}</p>
        <p v-else>暂未绑定手机号</p>
      </div>
    </div>
    <div class="profile-arrow-right">
      <img alt src="@/assets/img/profile/arrow_right.png" />
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { mapState, mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      defaultPic:
        this.$store.state.Profile.personInfo.length != 0
          ? "http://127.0.0.1:3000/public/uploads/headSculpture/" +
            this.$store.state.Profile.personInfo.photo
          : require("@/assets/img/profile/user.png")
    };
  },
  props: {
    curLogin: {
      type: Boolean,
      default() {
        return false;
      }
    },
    username: {
      type: String,
      default() {
        return "";
      }
    },
    phone: {
      type: String,
      default() {
        return "";
      }
    }
  },
  username: {
    type: String,
    default() {
      return "";
    }
  },
  methods: {
    goLogin() {
      this.$emit("goLogin");
    },
    islogin(file) {
      if (this.$store.state.Profile.personInfo.length == 0) {
        Toast("请您先登录账号！");
        return false;
      } else {
        //上传图片之前判断图片是否符合条件
        //只能上传jpg和png的图片类型
        if (file.type !== "image/jpeg" && file.type !== "image/png") {
          Toast("请上传 jpg/png 格式图片");
          return false;
        }
        let isLt1M = file.size / 1024 / 1024 <= 1;
        if (!isLt1M) {
          Toast("图片大小1M以内");
          return false;
        }
        return true;
      }
    },
    // 更换头像
    afterRead(file) {
      this.$axios
        .post("/postUploadHeadImage", {
          name: file.file.name,
          cid: this.cid,
          file: file
        })
        .then(res => {
          if (res.data.status == 200) {
            let path =
              "http://127.0.0.1:3000/public/uploads/headSculpture/" +
              file.file.name +
              ".jpg_1.jpeg";
            this.defaultPic = path;
            this.$axios.get("/QueryPersonInfo").then(res => {
              if (res.data) {
                this.$store.dispatch(
                  "Profile/update_userinfo",
                  JSON.stringify(res.data[0])
                );
              } else {
                Toast("获取用户信息失败！");
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    ...mapState({
      cid: state => state.Profile.personInfo.cid
    })
  }
};
</script>

<style scoped>
.login {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 90px;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: #ff8198;
}

.login_user_pic {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login_user_pic .user-pic-img {
  display: block;
  width: 60px;
  height: 60px;
}

.user-info {
  color: white;
  font-size: 16px;
  margin-left: 20px;
}

.user-info p:last-child {
  margin-left: 3px;
}

.user-info .phone-num {
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-top: 8px;
}

.icon-phone {
  display: inline-block;
  width: 16px;
  height: 16px;
}

.profile-arrow-right {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 10px;
}

.profile-arrow-right img {
  display: inline-block;
  width: 20px;
  height: 20px;
}
</style>