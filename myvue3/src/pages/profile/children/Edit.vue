<template>
  <div class="Edit">
    <nav-bar class="Edit-nav">
      <div slot="left">
        <van-icon name="arrow-left" @click="$router.back()" color="white" size="20px" />
      </div>
      <div slot="center">{{$route.meta.title}}</div>
    </nav-bar>
    <div class="Edit_Info">
      <van-cell-group>
        <van-field v-model="username" label="用户名" left-icon="contact" clearable maxlength="8" />
        <van-field
          v-model="cur_sex"
          label="性别"
          left-icon="friends"
          clearable
          maxlength="1"
          @blur="check_sex"
        />
        <van-field
          v-model="phone"
          label="手机号码"
          left-icon="phone"
          clearable
          @blur="check_Phone"
          maxlength="11"
        />
        <van-field v-model="email" label="电子邮箱" left-icon="ecard-pay" clearable @blur="sendEmail" />
        <van-field v-model="address" label="所在地址" left-icon="location-o" clearable maxlength="20" />
        <van-field
          v-model="detail_address"
          rows="5"
          autosize
          left-icon="location"
          label="详细地址"
          type="textarea"
          maxlength="80"
          show-word-limit
        />
      </van-cell-group>
    </div>
    <div class="button">
      <van-button type="info" size="large" round @click="update_Info">确定修改</van-button>
    </div>

    <div class="hidden"></div>
  </div>
</template>

<script>
import NavBar from "@/components/navbar/NavBar";
import { Toast } from "vant";
import { mapState, mapActions } from "vuex";
export default {
  name: "Edit",
  created() {
    if (this.$store.state.Profile.personInfo.length == 0) {
      Toast("请先登录");
      this.$router.push("/login");
    } else {
      (this.id = this.Id),
        (this.username = this.Username),
        (this.cur_sex = this.Cur_sex),
        (this.phone = this.Phone),
        (this.email = this.Email),
        (this.address = this.Address),
        (this.detail_address = this.Detail_address);
    }
  },
  data() {
    return {
      id: "",
      username: "",
      cur_sex: "",
      //  upd_sex： 在此只要作用是将当前cur_sex转化为数字0或者
      upd_sex: "",
      phone: "",
      email: "",
      address: "",
      detail_address: "",
      //标识，用于判断男女填入是否正确
      flag: true
    };
  },
  mounted() {
    // 将所有 Toast 的展示时长设置为 2000 毫秒
    Toast.setDefaultOptions({ duration: 1000 });
  },
  methods: {
    //修改信息提交后台管理
    update_Info() {
      if (!this.username) {
        Toast("请填写您的用户名！");
      } else if (!this.cur_sex) {
        Toast("请填写您的性别！");
      } else if (!this.phone) {
        Toast("请填写您的电话号码！");
      } else if (!this.email) {
        Toast("请填写您的电子邮箱！");
      } else if (!this.address) {
        Toast("请填写您的所在地址！");
      } else if (!this.detail_address) {
        Toast("请填写您的详细地址");
      } else {
        //将性别男女转化为数字0或者1
        if (this.cur_sex == "女") {
          this.upd_sex = 0;
        } else {
          this.upd_sex = 1;
        }
        //发送网络请求，讲数据发送后台进行修改
        this.$axios
          .post("/UpdateInfo", {
            id: this.id,
            username: this.username,
            sex: this.upd_sex,
            phone: this.phone,
            email: this.email,
            address: this.address,
            detail_address: this.detail_address
          })
          .then(res => {
            if (res.data[1].status == 200) {
              Toast(res.data[1].msg);
              //先将相别转化为男女
              var update_Info = res.data[0];
              if (update_Info.sex == 0) {
                update_Info.sex = "女";
              } else {
                update_Info.sex = "男";
              }
              //保存到vuex
              this.$store.dispatch(
                "Profile/update_userinfo",
                JSON.stringify(update_Info)
              );
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },

    //校验邮箱是否符合规则
    sendEmail() {
      var regEmail = /^\d{6,15}@\w{2,}\.(com|cn|net|com\.cn)$/;
      if (this.email && !regEmail.test(this.email)) {
        Toast("邮箱格式不正确");
        this.email = "";
      }
    },
    //校验手机号码
    check_Phone() {
      var regPhone = /^1[3456789]\d{9}$/;
      if (this.phone && !regPhone.test(this.phone)) {
        Toast("电话号码格式不正确");
        this.phone = "";
      }
    },
    //校验性别填写是否符合
    check_sex() {
      if (this.cur_sex == "男" || this.cur_sex == "女") {
        this.flag = false;
      }
      if (this.cur_sex != "男" && this.flag) {
        Toast("请输入男或女！");
        this.cur_sex = "";
        this.flag = false;
      }
      if (this.cur_sex != "女" && this.flag) {
        Toast("请输入男或女！");
        this.cur_sex = "";
        this.flag = false;
      }
      if (!this.flag) {
        this.flag = !this.flag;
      }
    }
  },
  components: { NavBar, Toast, mapState, mapActions },
  computed: {
    ...mapState({
      Id: state => state.Profile.personInfo.cid,
      Username: state => state.Profile.personInfo.name,
      Sex: state => state.Profile.personInfo.sex,
      Cur_sex: state => state.Profile.personInfo.sex,
      Email: state => state.Profile.personInfo.email,
      Phone: state => state.Profile.personInfo.phone,
      Address: state => state.Profile.personInfo.address,
      Detail_address: state => state.Profile.personInfo.detail_address
    })
  }
};
</script>

<style>
/* 头部标题部分 */
.Edit {
  width: 100%;
}
.Edit-nav {
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
/* 信息部分 */
.Edit_Info .van-field {
  margin-top: 10px;
}
.Edit_Info .van-field:first-child {
  margin-top: 60px;
}
.Edit_Info .van-field:last-child .van-cell__value {
  font-size: 12px;
  border: 1px solid rgb(184, 181, 181);
}
/* 确定按钮 */
.button .van-button--info {
  margin-top: 20px;
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