<template>
    <div>
        <aboutClerkInfo/>
        <div style="margin-top: 20px;margin-bottom: 20px; width: 100%"></div>
        <aboutBar/>
        <div style="padding-bottom: 15%;"></div>
    </div>
</template>
<script>
import request from "../utils/request";
import backend_url from "../utils/const";
import aboutSwiper from "../components/AboutSwiper.vue"
import aboutClerkInfo from "@/components/AboutClerkInfo.vue";
import aboutBar from "@/components/AboutBar.vue"

export default {
    name: 'aboutView',
    component: {
        aboutSwiper,
        aboutClerkInfo,
        aboutBar,
    },
    data() {
        return {
            url: backend_url,
            // clerkInfo: [], //店员相信信息列表
        };
    },
    created() {
        // this.reqClerkMsg(); //请求店员信息
    },
    methods: {
        reqClerkMsg() {
            var id = this.$route.query.id;
            // console.log("接收到传递id:" + id);
            request.get("/sysClerk/find/" + id).then((res) => {
                this.clerkInfo = res.data.data;
                // console.log(this.clerkInfo);
            });
        },
    },
};
</script>
<style lang="less">
</style>
