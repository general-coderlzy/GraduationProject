<template>
  <div>
    <!-- <van-nav-bar title="Search" left-arrow @click-left="onClickLeft" /> -->
      <nav-bar>
          <div slot="left"><van-icon name="arrow-left" @click="onClickLeft" color="white"/></div>
      <div slot="center">搜索</div>
    </nav-bar>
    <div class="search">
    <van-search
      v-model="keyword"
      placeholder="请输入搜索关键词"
      shape="round"
      @search="onSearch"
      autofocus="true"
    >
    </van-search>
    </div>

    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">搜索结果</van-divider>
    <cslist :goods="showList"></cslist>
  </div>
</template>

<script>
import { Search, Toast, Divider, Field } from "vant";
import { getSwipeImg, getDetailImg, getSku } from "../../network/home";
import NavBar from "../../components/navbar/NavBar";
import cslist from "../../components/cslist/Cslist";
export default {
  data() {
    return {
      keyword: "",
      showList: []
    };
  },
  mounted() {},
  created() {},
  components: { cslist, NavBar },

  computed: {},

  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onSearch(keyword) {
      // console.log(keyword);

      // 判断输入框是否为空;
      if (keyword === "" || keyword == null) {
        Toast("请输入关键字");
        return;
      }
      this.$axios
        .get("/getGoodsByName", {
          params: {
            name: keyword
          }
        })
        .then(res => {
          // console.log(res);
          this.showList = res.data;
          // console.log(this.showList);

          if (this.showList.length == 0) {
            Toast("没有匹配的结果o(╥﹏╥)o");
          }
        });

      this.finished = true;
    }
  }
};
</script>
<style scoped>
.search {
  margin-top: 44px;
}
</style>