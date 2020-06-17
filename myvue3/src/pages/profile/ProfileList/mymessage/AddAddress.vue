<template>
  <div class="addAddress">
    <nav-bar class="addAddress-nav">
      <div slot="left">
        <van-icon name="arrow-left" @click="$router.back()" color="white" size="20px" />
      </div>
      <div slot="center">{{$route.meta.title}}</div>
      <div slot="right" class="save">
        <span @click="save_Address">保存</span>
      </div>
    </nav-bar>
    <div class="Info">
      <van-field
        v-model="formData.userName"
        required
        clearable
        label="收货人"
        placeholder="请输入用户名"
        right-icon="question-o"
        @click-right-icon="tips"
      />
      <van-field
        v-model="formData.userPhone"
        label="手机号码"
        placeholder="请输入手机号码"
        clearable
        @blur="check_Phone"
      />
      <van-field
        v-model="formData.userAddress"
        rows="4"
        required
        autosize
        label="收货地址："
        type="textarea"
        maxlength="50"
        placeholder="请输入收货地址"
        show-word-limit
      />
      <div class="set">
        <van-field label="设置默认地址" disabled right-icon />
        <van-switch v-model="checked" size="20px" @change="change_status" />
      </div>
    </div>
    <div class="tip_text">
      <span class="left">注意：</span>
      <span class="right">每个用户只能选择一个默认地址，每个用户最好设置一个默认地址</span>
    </div>
    <div class="hidden"></div>
  </div>
</template>

<script>
import NavBar from "@/components/navbar/NavBar";
import { mapState, mapActions } from "vuex";
import { Toast, Field, Switch } from "vant";

export default {
  name: "AddAddress",
  created() {
    this.formData.cid = this.id;
  },
  data() {
    return {
      formData: {
        cid: this.id,
        userName: "",
        userPhone: "",
        userAddress: "",
        isDefault: 0,
        dataFlag: 1
      },
      checked: false
    };
  },
  methods: {
    ...mapActions("Profile", ["save_address"]),
    //封装添加收货地址的方法
    package_addAddress() {
      //createTime
      var time = new Date();
      var CreateTime = this.formatDateTime(time);
      this.formData.createTime = CreateTime;
      //发送网络请求
      this.$axios
        .post("/insert_address", {
          form: this.formData
        })
        .then(res => {
          if (res.data.status == 200) {
            Toast(res.data.msg);
            this.formData.userName = "";
            this.formData.userPhone = "";
            this.formData.userAddress = "";
            this.checked = false;
          } else {
            Toast("添加失败！");
          }
        });
    },
    //封装查询收货地址的网络请求方法
    pack_queryAddressInfo() {
      this.$axios
        .post("/get_address", {
          id: this.id
        })
        .then(res => {
          if (res.data) {
            var arr = res.data;
            arr.forEach(item => {
              if (!item.tel) {
                item.tel = this.phone;
              }
            });
            this.save_address(JSON.stringify(arr));
          } else {
            Toast("获取数据失败！");
          }
        });
    },
    //保存按钮点击事件
    save_Address() {
      if (!this.formData.userName) {
        Toast("用户名不能为空");
      } else if (!this.formData.userAddress) {
        Toast("收货地址不能为空！");
      } else {
        //判断是否已经有被选中默认的地址了
        if (this.formData.isDefault == 1) {
          this.$axios
            .post("/query_isdefaultAddress", {
              id: this.id
            })
            .then(res => {
              if (res.data.status == 200) {
                this.package_addAddress();
                this.pack_queryAddressInfo();
              }
            });
        } else {
          this.package_addAddress();
          this.pack_queryAddressInfo();
        }
      }
    },
    //设置默认地址切换回调函数
    change_status() {
      if (this.checked) {
        this.formData.isDefault = 1;
      } else {
        this.formData.isDefault = 0;
      }
    },
    //校验手机号码
    check_Phone() {
      var regPhone = /^1[3456789]\d{9}$/;
      if (this.formData.userPhone && !regPhone.test(this.formData.userPhone)) {
        Toast("电话号码格式不正确!");
        this.userPhone = "";
      }
    },
    //点击问号触发事件
    tips() {
      Toast("红星为必填项，其余为可选！");
    },
    //设置时间格式
    formatDateTime(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      var second = date.getSeconds();
      second = second < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
    }
  },
  computed: {
    ...mapState({
      phone: state => state.Profile.personInfo.phone,
      id: state => state.Profile.personInfo.cid
    })
  },
  components: { NavBar, Field }
};
</script>

<style scoped>
.addAddress {
  width: 100%;
}
.addAddress .addAddress-nav {
  color: white;
  /* margin-bottom: 30px; */
  position: relative;
  font-weight: 700;
}
.van-icon-arrow-left {
  position: absolute;
  top: 25%;
  left: 5px;
}
.save span {
  color: #fff;
}

/* 填写收获地址详细信息 */
.Info {
  width: 100%;
  height: 290px;
  background-color: rgb(236, 234, 235);
}
.Info .van-field {
  margin-bottom: 5px;
}
/* 设置默认地址部分 */
.set {
  position: relative;
}
.set .van-switch {
  position: absolute;
  right: 10px;
  top: 11px;
}
/* 注意提示文字 */
.tip_text {
  width: 100%;
  height: 50px;
  /* text-align: center; */
  position: relative;
}
.tip_text .left {
  display: block;
  height: 50px;
  line-height: 50px;
  margin-left: 20px;
  color: rgb(170, 168, 168);
  font-size: 14px;
}
.tip_text .right {
  display: block;
  width: 280px;
  height: 50px;
  color: rgb(170, 168, 168);
  font-size: 14px;
  position: absolute;
  top: 17px;
  left: 60px;
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