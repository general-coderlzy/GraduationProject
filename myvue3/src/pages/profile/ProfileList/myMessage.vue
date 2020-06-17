<template>
  <div class="myMessage">
    <nav-bar class="myMessage-nav">
      <div slot="left">
        <van-icon name="arrow-left" @click="$router.back()" color="white" size="20px" />
      </div>
      <div slot="center">{{$route.meta.title}}</div>
    </nav-bar>
    <div class="person_info">
      <div class="left">
        <van-image :src="defaultPic" class="user-pic-img" fit="cover" round />
      </div>
      <div class="right">
        <span class="login" v-if="username">{{username}}</span>
        <span class="unlogin" v-else @click="goLogin">{{statu}}</span>
      </div>
    </div>
    <div class="cell">
      <van-cell title="我的收货地址" is-link @click="get_address_data" />
      <van-cell title="待付款" is-link />
      <van-cell title="待发货" is-link />
      <van-cell title="待收货" is-link />
    </div>
    <div class="hidden"></div>
  </div>
</template>

<script>
import NavBar from "@/components/navbar/NavBar";
import { mapState, mapActions } from "vuex";
import { Toast, Cell, CellGroup } from "vant";
export default {
  name: "myMessage",
  data() {
    return {
      defaultPic:
        this.$store.state.Profile.personInfo.length != 0
          ? "http://127.0.0.1:3000/public/uploads/headSculpture/" +
            this.$store.state.Profile.personInfo.photo
          : require("@/assets/img/profile/user.png"),
      statu: "未登录"
    };
  },
  methods: {
    ...mapActions("Profile", ["save_address"]),
    //点击未登录触发事件
    goLogin() {
      this.$router.push("/login");
    },
    //获取地址表中的数据
    get_address_data() {
      if (this.person.length == 0) {
        Toast("亲，您还没有登录呢！");
      } else {
        this.$axios
          .post("/get_address", {
            id: this.cid
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
              this.$router.push("/harvestaddress");
            } else {
              Toast("获取数据失败！");
            }
          });
      }
    }
  },
  computed: {
    ...mapState({
      username: state => state.Profile.personInfo.name,
      cid: state => state.Profile.personInfo.cid,
      phone: state => state.Profile.personInfo.phone,
      person: state => state.Profile.personInfo
    })
  },
  components: {
    NavBar,
    mapState,
    mapActions,
    Toast,
    Cell,
    CellGroup
  }
};
</script>

<style scoped>
.myMessage {
  width: 100%;
}
.myMessage .myMessage-nav {
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
/* 头部个人信息 */
.myMessage .person_info {
  /* width: 100%; */
  height: 100px;
}
.myMessage .person_info .left {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 64px;
  left: 20px;
}
.myMessage .person_info .left .user-pic-img {
  display: block;
  width: 60px;
  height: 60px;
}
.myMessage .person_info .right {
  width: 60px;
  height: 100px;
  line-height: 100px;
  margin-left: 80px;
  text-align: center;
}
.myMessage .person_info .right .login {
  color: #686464;
}
.myMessage .person_info .right .unlogin {
  color: #adaaaa;
}

/* 单元格 */
.cell {
  width: 100%;
  height: 1000px;
  background-color: rgb(236, 234, 235);
}
.cell .van-cell {
  margin-bottom: 10px;
}
/* 隐藏Tabbar部分 */
.hidden {
  width: 100%;
  height: 55px;
  position: fixed;
  bottom: 0px;
  z-index: 99;
  background-color: rgb(236, 234, 235);
}
</style>