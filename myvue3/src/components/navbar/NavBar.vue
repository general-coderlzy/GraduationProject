<!--  -->
<template>
    <div class="navbar">          
        <div class="left"><slot name="left"></slot></div>
        <div class="center"><slot name="center"></slot></div>
        <div class="right"><slot name="right"></slot></div>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  computed: {},

  methods: {}
};
</script>
<style scoped>
.navbar {
  display: flex;
  height: 44px;
  width: 100%;
  line-height: 44px;
  text-align: center;
  background-color: #0094ff;
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
  position: fixed;
  top: 0;
  z-index: 99;
  color: #fff;
}
.left,
.right {
  width: 60px;
}
.center {
  flex: 1;
}
</style>