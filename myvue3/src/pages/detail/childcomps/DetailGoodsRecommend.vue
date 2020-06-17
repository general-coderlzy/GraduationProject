<!--  -->
<template>
  <div class="recommend">
     <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">今日推荐</van-divider>
 <list :goods="showList"></list>
  </div>
</template>

<script>
import list from "../../../components/list/List";
import { getGoods } from "../../../network/home";
export default {
  data() {
    return {
      showList: []
    };
  },

  components: {
    list
  },
  mounted() {
    getGoods().then(res => {
      // this.showList = res.filter(item => item.pid != this.cgoods.pid);
      // var index = this.cgoods.pid;
      // console.log(index);

      this.showList = res;
      // console.log("这是推荐的");
      // console.log(this.showList);
    });
  },
  created() {
    // this.$forceUpdate();
    // console.log(this.showList);
  },
  props: {
    cgoods: {
      type: Object
    }
  },
  computed: {},
  methods: {}
};
</script>
<style scoped>
.recommend {
  margin-bottom: 49px;
}
</style>