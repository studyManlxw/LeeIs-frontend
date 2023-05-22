<template>
    <van-swipe class="swipe_body" autoplay>
        <van-swipe-item v-for="item in swiperList" :key="item.id">
            <img class="swiper_img" :src="`${url}${item.imagePath}`"/>
        </van-swipe-item>
    </van-swipe>
</template>
<script>
import reques from "../utils/request";
import backend_url from "../utils/const";

export default {
    name: "HomeSwiper",
    data() {
        return {
            swiperList: [], //轮播图数据
            url: backend_url,
        };
    },
    created() {
        //请求轮播图数据
        reques.get("/swiper/find").then((res) => {
            this.swiperList = res.data.data;
            // console.log(this.swiperList);
        });
    },
};
</script>


<style scoped lang="less">
.swipe_body {
  .swiper_img {
    width: 100%;
  }
}
</style>
