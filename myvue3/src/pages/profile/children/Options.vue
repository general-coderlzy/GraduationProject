<template>
  <div v-if="show" class="show_selected">
    <ul>
      <li @click="logout">
        <van-icon name="clear" color="black" size="20px" />
        <span>退出账号</span>
      </li>
      <li @click="see_personInfo">
        <van-icon name="friends" color="black" size="20px" />
        <span>个人信息</span>
      </li>
      <li @click="update_password">
        <van-icon name="edit" color="black" size="20px" />
        <span>修改密码</span>
      </li>
      <li @click="Unbind">
        <van-icon name="pause-circle" color="black" size="20px" />
        <span>解除绑定</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast, Dialog } from "vant";
import { mapActions, mapState } from "vuex";
export default {
  name: "Options",
  data() {
    return {};
  },
  props: {
    show: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  computed: {
    ...mapState({
      Get_Cid: state => state.Profile.personInfo.cid,
      Get_personInfo: state => state.Profile.personInfo,
      Get_bindEmail: state => state.Profile.personInfo.bindEmail
    })
  },
  methods: {
    ...mapActions("Profile", ["update_userinfo"]),
    //退出账号
    logout() {
      this.$emit("logout");
    },
    //查看个人信息
    see_personInfo() {
      if (this.Get_personInfo.length == 0) {
        Toast("请您先登录账号！");
      } else {
        this.$router.push("/personInfo");
      }
    },
    //修改密码
    update_password() {
      if (this.Get_personInfo.length == 0) {
        Toast("请您先登录账号！");
      } else {
        Dialog.confirm({
          title: "标题",
          message: "修改密码还需三思，继续前往？"
        })
          .then(() => {
            this.$router.push("/update_pwd");
          })
          .catch(() => {
            // on cancel
          });
      }
    },
    //解除邮箱绑定
    Unbind() {
      if (this.Get_bindEmail == 1) {
        //修改邮箱绑定状态
        this.$axios
          .post("/UnBindQQ", {
            bindEmail: 0,
            id: this.Get_Cid
          })
          .then(res => {
            if (res.data[1].status == 200) {
              Toast(res.data[1].msg);
              this.update_userinfo(JSON.stringify(res.data[0]));
            }
          })
          .catch(err => {});
      } else {
        Toast("请先在我的余额绑定邮箱！");
      }
    }
  },
  components: { Toast, Dialog }
};
</script>

<style>
.show_selected {
  /* height: 110px; */
  width: 120px;
  background-color: rgb(248, 245, 245);
  position: fixed;
  right: 12px;
  top: 44px;
}
.show_selected li {
  width: 100%;
  background-color: #f7f3f3;
  height: 30px;
  line-height: 30px;
  display: flex;
  text-align: center;
  align-items: center;
  border-bottom: 1px solid #cecdcd;
}
.show_selected li:last-child {
  border-bottom: none;
}
span {
  color: #000;
  font-size: 16px;
  margin-left: 5px;
}
.van-icon {
  margin-left: 5px;
}
</style>