<!--  -->
<template>
  <div id="grid">
      <van-grid square>
           <van-grid-item v-for="(value,index) in this.textList" :key="index"   :text=value.text  :icon=value.img />
       </van-grid>
  </div>
</template>

<script>
import { Grid, GridItem } from "vant";
export default {
  data() {
    return {
      textList: [
        {
          text: "天猫爆款",
          img:
            "https://gw.alicdn.com/tfs/TB1qwMMObrpK1RjSZTEXXcWAVXa-183-144.png?getAvatar=1"
        },
        {
          text: "今日爆款",
          img:
            "https://gw.alicdn.com/tfs/TB1LvIxVAvoK1RjSZFDXXXY3pXa-183-144.png?getAvatar=1"
        },
        {
          text: "国际爆款",
          img:
            "https://gw.alicdn.com/tfs/TB19uWKXkCy2eVjSZPfXXbdgpXa-183-144.png?getAvatar=1"
        },
        {
          text: "分类爆款",
          img:
            "https://gw.alicdn.com/tfs/TB1nBktVxTpK1RjSZR0XXbEwXXa-183-144.png?getAvatar=1"
        },
        {
          text: "红的爆款",
          img:
            "https://gw.alicdn.com/tfs/TB1fcOKXkCy2eVjSZSyXXXukVXa-183-144.png?getAvatar=1"
        },
        {
          text: "满意爆款",
          img:
            "https://gw.alicdn.com/tfs/TB1h1MnVCrqK1RjSZK9XXXyypXa-183-144.png?getAvatar=1"
        },
        {
          text: "闲鱼爆款",
          img:
            "https://gw.alicdn.com/tfs/TB1CoEwVrvpK1RjSZFqXXcXUVXa-185-144.png?getAvatar=1"
        },
        {
          text: "绿色爆款",
          img:
            "https://gw.alicdn.com/tfs/TB11tFkr7L0gK0jSZFxXXXWHVXa-183-144.png?getAvatar=1"
        }
      ]
    };
  },

  components: {},

  computed: {},

  methods: {}
};
</script>
<style scoped>
</style>
