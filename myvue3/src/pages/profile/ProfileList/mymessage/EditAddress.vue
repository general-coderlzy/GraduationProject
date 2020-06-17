<template>
  <div class="Edit_Address">
    <nav-bar class="Edit_Address-nav">
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
  name: "EditAddress",
  data() {
    return {
      formData: {
        cid: "",
        addressId: "",
        userName: "",
        userPhone: "",
        userAddress: "",
        isDefault: 0
      },
      checked: false
    };
  },
  created() {
    if (this.edtiItem) {
      if (this.edtiItem.isDefault == 1) {
        this.checked = true;
      }
      this.formData.addressId = this.edtiItem.addressId;
      this.formData.userName = this.edtiItem.name;
      this.formData.userPhone = this.edtiItem.tel;
      this.formData.userAddress = this.edtiItem.address;
      this.formData.cid = this.edtiItem.cid;
    }
  },
  methods: {
    ...mapActions("Profile", ["save_address"]),
    //封装查询收货地址的网络请求方法
    package_queryAddressInfo() {
      this.$axios
        .post("/get_address", {
          id: this.formData.cid
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
    //封装修改地址的网络请求方法
    package_edtiAddress() {
      //发送网络请求
      this.$axios
        .post("/update_addressInfo", {
          form: this.formData
        })
        .then(res => {
          if (res.data.status == 200) {
            this.package_queryAddressInfo();
            Toast("修改成功！");
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
              id: this.formData.cid
            })
            .then(res => {
              if (res.data.status == 200) {
                this.package_edtiAddress();
              }
            });
        } else {
          this.package_edtiAddress();
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
    }
  },
  computed: {
    ...mapState({
      edtiItem: state => state.Profile.EditItem,
      phone: state => state.Profile.personInfo.phone
    })
  },
  components: { NavBar, Field }
};
</script>

<style scoped>
.Edit_Address {
  width: 100%;
}
.Edit_Address .Edit_Address-nav {
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
.set .van-field__label {
  width: 101px;
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