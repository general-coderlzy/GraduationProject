<!--  -->
<template>
    <div id="tab-bar">
      <slot></slot>
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
#tab-bar {
  display: flex;
  background-color: #0094ff;
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -3px 1px rgba(0, 0, 255, 0.1);
}
</style>