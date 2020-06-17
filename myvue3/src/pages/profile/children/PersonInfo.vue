<template>
  <div class="Info">
    <nav-bar class="Info-nav">
      <div slot="left">
        <van-icon name="arrow-left" @click="$router.back()" color="white" size="20px" />
      </div>
      <div slot="center">{{$route.meta.title}}</div>
      <div slot="right" class="Edit">
        <van-icon name="edit" size="25px" @click="goEdit"></van-icon>
      </div>
    </nav-bar>
    <div class="Info_image">
      <div class="Info-pic">
        <van-image :src="user_image" class="Info-pic-img" fit="cover" round />
      </div>
    </div>
    <div class="user_Info">
      <van-row>
        <van-col offset="8" span="8">{{ username ? username : state}}</van-col>
      </van-row>
      <van-row>
        <van-col span="8">
          性别
          <span class="colon">:</span>
        </van-col>
        <van-col offset="2" span="8">{{sex}}</van-col>
      </van-row>
      <van-row>
        <van-col span="8">
          联系方式
          <span class="colon">:</span>
        </van-col>
        <van-col offset="2" span="8">{{phone}}</van-col>
      </van-row>
      <van-row>
        <van-col span="8">
          电子邮箱
          <span class="colon">:</span>
        </van-col>
        <van-col offset="2" span="8">{{email}}</van-col>
      </van-row>
      <van-row>
        <van-col span="8">
          所在地址
          <span class="colon">:</span>
        </van-col>
        <van-col offset="2" span="8">{{address}}</van-col>
      </van-row>
      <van-cell-group>
        <van-field
          v-model="detail_address"
          rows="6"
          autosize
          label="详细地址："
          type="textarea"
          maxlength="80"
          show-word-limit
          readonly
        />
      </van-cell-group>
    </div>
    <div class="hidden"></div>
  </div>
</template>

<script>
import NavBar from "@/components/navbar/NavBar";
import { Toast } from "vant";
export default {
  name: "PersonInfo",
  created() {
    if (this.$store.state.Profile.personInfo.length == 0) {
      Toast("请先登录");
      this.$router.push("/login");
    }
    //如果有传照片，把照片放上去
    let user_pic = localStorage.getItem("user_pic");
    if (user_pic) {
      this.user_image = JSON.parse(user_pic);
    }
  },
  data() {
    return {
      user_image:
        this.$store.state.Profile.personInfo.length != 0
          ? "http://127.0.0.1:3000/public/uploads/headSculpture/" +
            this.$store.state.Profile.personInfo.photo
          : require("@/assets/img/profile/user.png"),
      state: "未登录",
      username: this.$store.state.Profile.personInfo.name,
      sex: this.$store.state.Profile.personInfo.sex,
      phone: this.$store.state.Profile.personInfo.phone,
      email: this.$store.state.Profile.personInfo.email,
      address: this.$store.state.Profile.personInfo.address,
      detail_address: this.$store.state.Profile.personInfo.detail_address
        ? this.$store.state.Profile.personInfo.detail_address
        : ""
    };
  },
  methods: {
    //去编辑
    goEdit() {
      this.$router.push("/editInfo");
    }
  },
  components: { NavBar, Toast }
};
</script>

<style>
/* 头部标题部分 */
.Info {
  width: 100%;
  background-color: pink;
}
.Info-nav {
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
/* 图片 */
.Info_image {
  width: 100%;
  height: 150px;
  background-color: #ffffff;
  position: relative;
}
.Info-pic {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 42%;
  top: 50%;
}
.Info-pic .Info-pic-img {
  display: block;
  width: 60px;
  height: 60px;
}
/* 个人信息 */
.user_Info {
  width: 100%;
  height: 250px;
  background-color: #ffffff;
}
.user_Info .van-cell__value {
  border: 1px solid rgb(184, 181, 181);
}
.van-col {
  height: 40px;
  line-height: 40px;
  margin-bottom: 10px;
  position: relative;
}
.van-col--8 {
  text-align: center;
  font-size: 14px;
}
.van-row:first-child {
  color: #ada9aa;
}
/* 冒号处理 */
.colon {
  position: absolute;
  right: 10px;
}
/* 编辑按钮 */
.Edit .van-icon-edit {
  position: fixed;
  top: 9px;
  right: 17px;
}
/* 详细地址部分 */
.van-field__label {
  text-align: center;
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