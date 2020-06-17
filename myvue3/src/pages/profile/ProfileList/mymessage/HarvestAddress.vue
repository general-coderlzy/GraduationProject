<template>
  <div class="harvestaddress">
    <nav-bar class="harvestaddress-nav">
      <div slot="left">
        <van-icon name="arrow-left" @click="$router.back()" color="white" size="20px" />
      </div>
      <div slot="center">{{$route.meta.title}}</div>
    </nav-bar>
    <div class="body">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认地址"
        @add="go_addAddress"
        @edit="onEdit"
        @select="beselect"
      />
    </div>
    <div class="hidden" v-if="this.list.length == 0">
      <span>亲，赶紧去添加您的收货地址啦！</span>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/navbar/NavBar";
import { mapState, mapActions } from "vuex";
import { AddressList, Toast } from "vant";
export default {
  name: "HarvestAddress",
  data() {
    return {
      chosenAddressId: 1,
      list: localStorage["address"] ? JSON.parse(localStorage["address"]) : []
    };
  },
  created() {},
  methods: {
    ...mapActions("Profile", ["edit_address"]),
    // 添加地址按钮单击事件
    go_addAddress() {
      this.$router.push("/addaddress");
    },
    //修改地址点击事件
    onEdit(item) {
      this.edit_address(JSON.stringify(item));
      this.$router.push("/editaddress");
    },
    //切换
    beselect(item, id) {
      this.chosenAddressId = item.id;
    }
  },
  computed: {
    ...mapState({
      Address: state => state.Profile.Address
    })
  },
  components: { NavBar, mapState, mapActions, AddressList }
};
</script>

<style scoped>
.harvestaddress {
  width: 100%;
}
.harvestaddress .harvestaddress-nav {
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
/* 地址列表 */
.body {
  width: 100%;
  height: 595px;
  background-color: rgb(236, 234, 234);
}
/* hidden 部分 */
.hidden {
  width: 100%;
  height: 50px;
  line-height: 50px;
  position: fixed;
  top: 50px;
  text-align: center;
}
.hidden span {
  font-weight: 700;
  color: #494848;
}
</style>