<template>
  <div class="charge_money">
    <nav-bar class="charge_money-nav">
      <div slot="left">
        <van-icon name="arrow-left" @click="$router.back()" color="white" size="20px" />
      </div>
      <div slot="center">{{$route.meta.title}}</div>
    </nav-bar>
    <div class="person">
      <van-row>
        <van-col span="16">
          欢迎
          <span class="name">{{name}}</span>，请选择您充值的额度
        </van-col>
        <van-col span="8" class="image">
          <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" size="25px" />
        </van-col>
      </van-row>
    </div>
    <div class="content">
      <van-grid :border="true" :column-num="3" :gutter="10">
        <van-grid-item v-for="(item,index) in array" :key="index" @click="selected(index)">
          <div class="top">{{item.Price}}</div>
          <div class="bottom">{{item.text}}</div>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="hidden"></div>
  </div>
</template>

<script>
import NavBar from "@/components/navbar/NavBar";
import { Button, Dialog, Toast } from "vant";
import { mapState, mapActions } from "vuex";
export default {
  name: "ChargeMoney",
  data() {
    return {
      array: [
        { Price: 30, text: "售价29.97元" },
        { Price: 50, text: "售价49.95元" },
        { Price: 100, text: "售价99.90元" },
        { Price: 200, text: "售价199.80元" },
        { Price: 300, text: "售价299.70元" },
        { Price: 500, text: "售价499.50元" }
      ]
    };
  },
  methods: {
    ...mapActions("Profile", ["update_userinfo"]),
    selected(index) {
      Dialog.confirm({
        title: "充值提醒",
        message:
          "确定给用户" + this.name + "充值" + this.array[index].Price + "吗?"
      })
        .then(() => {
          this.$axios
            .post("/Recharge", {
              balance: this.array[index].Price + this.balance,
              id: this.id
            })
            .then(res => {
              if (res.data[1].status == 200) {
                Toast(res.data[1].msg);
                //更新vuex中值
                //先将相别转化为男女
                var update_Info = res.data[0];
                if (update_Info.sex == 0) {
                  update_Info.sex = "女";
                } else {
                  update_Info.sex = "男";
                }
                //修改个人信息有相同操作，调用它的方法
                this.update_userinfo(JSON.stringify(update_Info));
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    }
  },
  components: { NavBar, Button, mapState, mapActions, Toast },
  computed: {
    ...mapState({
      name: state => state.Profile.personInfo.name,
      id: state => state.Profile.personInfo.cid,
      balance: state => state.Profile.personInfo.balance
    })
  }
};
</script>

<style scoped>
.charge_money {
  width: 100%;
}
.charge_money .charge_money-nav {
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
.person {
  margin-top: 20px;
  font-size: 14px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: #ffffff;
  text-align: center;
}
.person .name {
  color: red;
}
.person .image {
  margin-top: 8px;
}
/* 内容 */
.content {
  margin-top: 20px;
  width: 100%;
  height: 200px;
  background-color: #ffffff;
}
.top {
  width: 100%;
  text-align: center;
  height: 30px;
  line-height: 30px;
  background-color: #ffffff;
  font-size: 20px;
  color: rgb(12, 207, 12);
}
.bottom {
  width: 100%;
  height: 30px;
  text-align: center;
  background-color: #ffffff;
  font-size: 12px;
  color: rgb(10, 204, 10);
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