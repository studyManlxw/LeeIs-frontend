<template>
    <div class="home">
        <homeSearch :clerkInfoList="clerkInfoList"/>
        <homeSwiper/>
        <!-- <dropdownMenu ref="dropdownMenu" :clerkInfoList="clerkInfoList" /> -->
        <notice-bar/>
        <van-dropdown-menu>
            <van-dropdown-item
                    v-model="valueSex"
                    :options="option1"
                    @change="changeByValue(valueSex)"
            />
            <van-dropdown-item
                    v-model="valueSort"
                    :options="option2"
                    @change="changeByValue(valueSort)"
            />
        </van-dropdown-menu>
        <homeBody :clerkInfoList="clerkInfoList"/>
        <tab-bar/>
        <div style="padding-bottom: 25%;"></div>
    </div>
</template>

<script>
import request from "../utils/request";
import homeBody from "../components/HomeBody.vue";
import homeSwiper from "../components/HomeSwiper.vue";
import homeSearch from "../components/HomeSearch.vue";
import dropdownMenu from "../components/DropdownMenu.vue";
import noticeBar from "@/components/NoticeBar.vue";
import NoticeBar from "@/components/NoticeBar.vue";
import tabBar from "@/components/TabBar.vue";
import TabBar from "@/components/TabBar.vue";
import {Toast} from "vant";
import bus from "@/utils/bus"
export default {
    name: "HomeView",
    components: {TabBar, NoticeBar},
    component: {
        homeBody,
        homeSwiper,
        homeSearch,
        dropdownMenu,
        noticeBar,
        tabBar
    },
    data() {
        return {
            clerkInfoList: [],
            valueSex: 2,
            valueSort: 5,
            userInfo:{},//存放个人中数据
            option1: [
                {text: "全部店员", value: 2},
                {text: "只看男生", value: 1},
                {text: "只看女生", value: 0},
            ],
            option2: [
                {text: "默认排序", value: 5},
                {text: "按等级排序", value: 4},
                {text: "按受欢迎程度", value: 3},
            ],
        };
    },
    created() {
        // this.getClerkInfo();
        this.judgmentShow();
    },
    mounted() {
    },
    methods: {
        getClerkInfo() {
            //请求后端店员数据
            request.get("/sysClerk/show").then((res) => {
                this.clerkInfoList = res.data.data;
                // console.log(this.clerkInfoList);
            });
        },
        //判断展示什么条件的数据
        judgmentShow() {
            if (this.clerkInfoList == null) {
                this.getClerkInfo();
            }
            this.clerkInfoList = this.changeByValue(2)

        },
        changeByValue(valueSort) {
            this.getByValue(valueSort)
        },
        changeByValue(valueSex) {
            this.getByValue(valueSex)
        },
        getByValue(value) {
            console.log(value)
            request.get("/sysClerk/getByValue/" + value).then((res) => {
                this.clerkInfoList = res.data.data
                // console.log(this.clerkInfoList)
            })
        }
    },
};
</script>

<style lang="less">
.home {
  display: flex;
  flex-direction: column;
}
</style>
