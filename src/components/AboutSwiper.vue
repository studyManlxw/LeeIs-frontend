<template>
  <van-swipe class="about-swiper-body" indicator-color="white">
    <van-swipe-item  class="about-swiper-item" v-for="item in clerkInfo.imageList" :key="item">
        <img class="about-swiper-img" :src="`${url}${item}`" />
      </van-swipe-item>
  </van-swipe>
</template>
<script>
import request from "../utils/request";
import backend_url from "../utils/const";

export default {
  name: "AboutSwiper",
  props:["clerkInfo"],
  data() {
    return {
      url: backend_url,
      // clerkMessage: [], //店员相信信息列表
    };
  },
  created() {
    // this.reqClerkMsg(); //请求店员信息
  },
  methods: {
    reqClerkMsg() {
      var id = this.$route.query.id;
      console.log("接收到传递id:" + id);
      request.get("/sysClerk/find/" + id).then((res) => {
        this.clerkMessage = res.data.data;
        console.log(this.clerkMessage);
      });
    },
  },
};
</script>
<style lang="less">
.about-swiper-body {
  .about-swiper-item {
    width: 100%;
    .about-swiper-img {
      width: 100%;
      max-height: 100%;
    }
  }
}
</style>
