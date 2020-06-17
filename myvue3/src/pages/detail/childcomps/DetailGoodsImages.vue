<!--  -->
<template>
  <div>
     <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">详情</van-divider>
     <div class="images" v-for="(image, index) in detailImg.dImg" :key="index">
        <van-image fit="cover" width="100%"  :src="imgSrc + detailImg.pcode+'/'+ image" lazy-load/>
     </div>
  </div>
</template>

<script>
import { Image, Lazyload } from "vant";
export default {
  props: {
    detailImg: {}
  },
  data() {
    return {
      imgSrc: "http://127.0.0.1:3000/public/uploads/images/"
    };
  },

  components: { Lazyload },

  computed: {},

  methods: {}
};
</script>
<style scoped>
</style>