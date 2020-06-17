<!--  -->
<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      scroll: null
    };
  },
  props: {
    pullUpLoad: true
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      //使scroll内的内容可以被点击
      click: true,
      pullUpLoad: this.pullUpLoad
    });
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
  components: {},

  computed: {},

  methods: {}
};
</script>
<style scoped>
</style>