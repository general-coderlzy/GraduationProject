<template>
  <div class="integral">
    <nav-bar class="integral-nav">
      <div slot="left">
        <van-icon name="arrow-left" @click="$router.back()" color="white" size="20px" />
      </div>
      <div slot="center">{{$route.meta.title}}</div>
    </nav-bar>
    <div class="show_integral">
      <div class="left">
        <span>您当前的积分为：</span>
      </div>
      <div class="right">
        <span>{{Get_integral}}</span>分
      </div>
    </div>
    <div class="hidden"></div>
  </div>
</template>

<script>
import NavBar from "@/components/navbar/NavBar";
import { mapState, mapActions } from "vuex";
export default {
  name: "Integral",
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapState({
      Get_integral: state => state.Profile.personInfo.integral
    })
  },
  components: { NavBar, mapState, mapActions }
};
</script>

<style scoped>
.integral {
  width: 100%;
}
.integral .integral-nav {
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
/* 显示我的积分部分 */
.show_integral {
  width: 100%;
  height: 80px;
  background-color: pink;
}
.show_integral .left {
  width: 200px;
  height: 100%;
  line-height: 80px;
}
.show_integral .left span {
  color: #333131;
  font-weight: 600;
  margin-left: 50px;
}
/* 隐藏Tabbar部分 */
.hidden {
  width: 100%;
  height: 55px;
  position: fixed;
  bottom: 0px;
  z-index: 99;
  background-color: #ffffff;
}
</style>