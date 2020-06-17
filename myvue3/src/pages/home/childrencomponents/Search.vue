<!--  -->
<template>
  <div id="search">
      <van-search
  v-model="value"
  placeholder="请输入搜索关键词"
 
  shape="round"
  @focus="onSearch"
>
  <!-- <div slot="action" @click="onSearch">搜索</div> -->
</van-search>
  </div>
</template>

<script>
import { Search, Toast } from "vant";
export default {
  data() {
    return {
      value: ""
    };
  },
  props: {},
  components: {},

  computed: {},

  methods: {
    onSearch(value) {
      // Toast("点击搜索按钮");
      // console.log(value);
      this.$router.push("/SearchResult");
    }
  }
};
</script>
<style scoped>
</style>