<!--  -->
<template>
  <div id="category">
    <nav-bar><div slot="center">分类</div></nav-bar>
      <div class="tree_select">
        <van-tree-select
          :items="items"
          height="100vh"
          :main-active-index.sync="activeIndex"
          @click-nav = "changetitle"
        >
  <template slot="content">
    <div class="right_cont">
      
      <div v-for="(item,index) in items.length" :key="index">
        <div v-if="activeIndex === index">         
        <!-- <list :goods="showlist"></list> -->
        <cslist :goods="showlist"></cslist>
        </div>
      </div>
    </div>

  </template>
</van-tree-select>
      </div>


    </div>
</template>

<script>
import { TreeSelect } from "vant";
import NavBar from "../../components/navbar/NavBar";
import List from "../../components/list/List";
import Cslist from "../../components/cslist/Cslist";
import index from "../../router";
export default {
  name: "Category",
  data() {
    return {
      activeIndex: 0,
      items: [],
      showlist: []
    };
  },
  components: { NavBar, List, Cslist },
  created() {},
  mounted() {
    this.$axios.get("/getCategoryList").then(res => {
      // console.log(res.data);
      var r = res.data.map(item => {
        return {
          text: item.category_name
        };
      });
      this.items = r;
      // console.log(r);
    });

    this.reqItem(1);
  },
  computed: {},

  methods: {
    reqItem(caid) {
      this.$axios
        .get("/getProductByCategory", {
          params: {
            category: [caid]
          }
        })
        .then(res => {
          this.showlist = res.data;
          // console.log(this.showlist);
        });
    },
    changetitle(index) {
      var caid = index + 1;
      this.reqItem(caid);
    }
  }
};
</script>
<style scoped>
.tree_select {
  margin-top: 44px;
  margin-bottom: 50px;
}
</style>